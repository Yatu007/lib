<?php
namespace Home\Controller;

use Think\Controller;

class NewsController extends Controller {
	public function index(){
		$this->display();
	}

	/*
	 * 新闻详情页
	 */
	public function detail(){
		$this->display();
	}

	/*
	 * 获取最新新闻
	 */
	public function recent(){
		$news = D('News');
		$data = $news->getRecent();

		$this->ajaxReturn($data);
	}

	/*
	 * 计算新闻页数
	 */
	public function pages(){
		$news = M('News');
		$count = $news->where(array('isAvailable' => 1))->count();
		$pages = ceil($count / 10);
		$this->ajaxReturn(array('pages' => $pages));
	}

	/*
	 * 获取某页新闻
	 * @param int $page
	 */
	public function page($start = 1){
		$page = (int)$page;
		$news = D('News');
		$data = $news->getNewsByPage($start);

		$this->ajaxReturn($data);
	}

	/*
	 * 获取某条新闻的具体内容
	 * @param int $id
	 */
	public function info($id = 1){
		$id = (int)$id;
		$news = D('News');
		$data = $news->read($id);

		$this->ajaxReturn($data);
	}
}
