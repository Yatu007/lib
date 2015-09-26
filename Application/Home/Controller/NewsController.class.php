<?php
namespace Home\Controller;

use Think\Controller;

class NewsController extends Controller {
	public function index(){
		$this->show('新闻列表');
	}

	/*
	 * 获取最新新闻
	 * @param int
	 */
	public function recent(){
		$news = D('News');
		$data = $news->getRecent();

		$this->ajaxReturn($data);
	}

	/*
	 * 计算新闻页数
	 * @return int
	 */
	public function pages(){
		$this->ajaxReturn();
	}

}
