<?php
namespace Home\Controller;

use Think\Controller;

class BookController extends Controller {
	public function index(){
	}

	/*
	 * 书籍详情
	 */
	public function detail(){
		$this->display();
	}

	/*
	 * 获取分类列表
	 */
	public function categories(){
		$type = D('Type');
		$result = $type->getCategories();

		$this->ajaxReturn($result);
	}

	/*
	 * 获取某一分类下的内容
	 * @param int $id 分类id
	 */
	public function category($id = 1){
		$id = (int)$id;
		$book = D('Book');
		$data = $book->getBookByCat($id);

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 新书推荐
	 */
	public function newbook(){
		$book = D('Book');
		$data = $book->getNewBook();

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 热门图书
	 */
	public function hotbook(){
		$book = D('Book');
		$data = $book->getHotBook();

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 某本书的详细信息
	 */
	public function info($id = 1){
		$id = (int)$id;
		$book = D('Book');
		$where = array('isAvailable' => 1,'id'=>$id);
		$book->where($where)->setInc('count');
		$data = $book->where($where)->relation(true)->find();

		unset($data['isavailable']);
		if(empty($data)){
			$data = array();
		}

		$this->ajaxReturn($data);
	}

	/*
	 * 书籍分页数
	 */
	public function pages(){
		$book = M('Book');
		$count = $book->where(array('isAvailable' => 1))->count();
		$pages = ceil($count / 10);

		$this->ajaxReturn(array('pages' => $pages));
	}

	/*
	 * 其他书推荐，点击量最低的书
	 */
	public function others(){
		$book = M('Book');
		$data = $book->where(array('isAvailable'=>1))->order('count')->page(rand(1,10),4)->getField('id,title,cover');

		$this->ajaxReturn(array_values($data));
	}
}
