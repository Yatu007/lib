<?php
namespace Home\Controller;

use Think\Controller;

class SearchController extends Controller {
	/*
	 * 搜索结果
	 */
	public function index(){
		$this->display();
	}

	/*
	 * 搜索结果页数
	 */
	public function pages(){
		$this->ajaxReturn();
	}

	/*
	 * 普通搜索
	 * @param int $page
	 */
	public function normal($keyword = '', $page = 1){
		$keyword = (string)$keyword;
		$page = (int)$page;
		$book = D('Book');
		$where = array(
			'_logic' => 'OR',
			'title' => array('LIKE','%'.$keyword.'%'),
			'author' => array('LIKE','%'.$keyword.'%'),
			'isbn' => array('LIKE','%'.$keyword.'%'),
		);
		$map = array(
			'isAvailable' => 1,
			'_complex' => $where,
		);
		$data = $book->where($map)->page(1,10)->getField('id,title,cover,author,description');

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 高级搜索
	 */
	public function advanced(){
		
	}
}
