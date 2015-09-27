<?php
namespace Admin\Controller;

use Think\Controller;

class NewsController extends Controller {
	public function _initialize(){
		if(session('user_type') != 'admin'){
			$this->ajaxReturn(array('status'=>'error'));
		}
	}

	public function index(){

	}

	/*
	 * 添加新闻
	 * @param string title
	 * @param string content
	 */
	public function add($title = '',$content = ''){
		if(empty($title) || empty($content)){
			$this->ajaxReturn(array('status' => 'error'));
		}
		$news = M('News');
		$news->create();
		$res = $news->add();
		$data['status'] = empty($res) ? 'error':'success';

		$this->ajaxReturn($data);
	}

	/*
	 * 删除新闻
	 * @param int $id
	 */
	public function delete($id = ''){
		if(empty($id)){
			$this->ajaxReturn(array('status'=>'error'));
		}

		$news = M('News');
		if($news->find($id)){
			$res = $news->where(array('id'=>$id))->save(array('isAvailable'=>0));
		}
		$data['status'] = empty($res) ? 'error' : 'success';

		$this->ajaxReturn($data);
	}

	/*
	 * 修改新闻
	 * @param int $id
	 * @param string $title
	 * @param string $content
	 */
	public function alter($id = '', $title = '',$content = ''){
		if(empty($id) || empty($title) || empty($content)){
			$this->ajaxReturn(array('status'=> 'error'));
		}

		$news = M('News');
		$where = array(
			'id' => $id,
			'isAvailable' => 1,
		);
		if($news->where($where)->find()){
			$res = $news->where($where)->save(
				array('title'=>$title,'content'=>$content));
		}
		$data['status'] = empty($res) ? 'error' : 'success';

		$this->ajaxReturn($data);
	}
}
