<?php
namespace Home\Controller;

use Think\Controller;

class BookController extends Controller {
	public function index(){

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
}
