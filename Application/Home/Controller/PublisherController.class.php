<?php
namespace Home\Controller;

use Think\Controller;

class PublisherController extends Controller {
	/*
	 * 所有出版社
	 */
	public function index(){
		$publisher = D('Publisher');
		$data = $publisher->getAllPub();

		$this->ajaxReturn($data);
	}
	/*
	 * 出版社分页数
	 */
	public function pages(){
		$publisher = M('Publisher');
		$count = $publisher->where(array('isAvailable' => 1))->count();
		$pages = ceil($count / 10);

		$this->ajaxReturn(array('pages' => $pages));
	}

	/*
	 * 出版社分页列表
	 */
	public function page($page = 1){
		$page = (int)$page;
		$publisher = D('Publisher');
		$data = $publisher->getPubByPage($page,10);

		$this->ajaxReturn($data);
	}
}
