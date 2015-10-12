<?php
namespace Admin\Controller;

use Think\Controller;

class UploadController extends Controller {
	public function _initialize(){
		if(session('user_type') != 'admin'){
			$this->ajaxReturn(array('status'=>'error'));
		}
	}

	public function index(){

	}

	/*
	 * 上传图片
	 */
	public function image(){
		$upload = new \Think\Upload();
		$upload->key = 'pic';
		$upload->exts = array('jpg','jpeg','gif','png');
		$upload->rootPath = './Public/upload/img/';
		$upload->savePath = '';

		$info = $upload->upload();
		if(!$info){
			dump($upload->getError());
			$this->ajaxReturn(array('ststus'=>'error'));
		}else{
			$path = $info['pic']['savepath'] . $info['pic']['savename'];
			$this->ajaxReturn(array('status'=>'success','pic'=>$path));
		}
	}
}
