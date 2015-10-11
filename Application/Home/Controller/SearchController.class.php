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
		if(isset($_GET['keyword'])){
			$keyword = I('get.keyword');
			$book = M('Book');
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
			$count = $book->where($map)->count();
			$pages = ceil($count / 10);
			if($pages > 0){
				$this->logKeyword();
			}

			$this->ajaxReturn(array('pages' => $pages));
		}

		$params = I('get.');
		$where = array('isAvailable' => 1);
		foreach($params as $key => $value){
			if($key == 'pricefrom' || $key == 'priceto'){
				continue;
			}
			if(!empty($value)){
				$where[$key] = array('LIKE','%'.$value.'%');
			}
		}
		if(!empty($params['priceto'])){
			$where['price'] = array('BETWEEN',array((int)$params['pricefrom'], (int)$params['priceto']));
		}elseif (!empty($params['pricefrom'])) {
			$where['price'] = array('GT', $params['pricefrom']);
		}

		$book = D('Book');
		$count = $book->where($where)->relation(true)->fetchSql()->count();
		$pages = ceil($count / 10);

		$this->ajaxReturn(array('pages' => $pages));
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
		$data = $book->where($map)->page($page,10)->getField('id,title,cover,author,description');

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 高级搜索
	 */
	public function advanced(){
		$page = (int)I('get.page') <=0 ? 1 : (int)I('get.page');

		$params = I('get.');
		$where = array('isAvailable' => 1);
		foreach($params as $key => $value){
			if($key == 'pricefrom' || $key == 'priceto'){
				continue;
			}
			if(!empty($value)){
				$where[$key] = array('LIKE','%'.$value.'%');
			}
		}
		if(!empty($params['priceto'])){
			$where['price'] = array('BETWEEN',array((int)$params['pricefrom'], (int)$params['priceto']));
		}elseif (!empty($params['pricefrom'])) {
			$where['price'] = array('GT', $params['pricefrom']);
		}

		$book = D('Book');
		$data = $book->where($where)->relation(true)->page($page,10)->getField('id,title,cover,author,description');

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 热门搜索
	 */
	public function hotSearch(){
		$search = M('Search');
		$data = $search->field('keyword')->group('keyword')->order('count(*) desc')->limit(0,8)->select();
		$this->ajaxReturn($data);
	}

	/*
	 * 记录关键字
	 */
	protected function logKeyword(){
		$keyword = I('get.keyword');
		if(empty($keyword)){
			return;
		}
		$search = M('Search');
		$res = $search->add(array('keyword' => $keyword));
	}
}
