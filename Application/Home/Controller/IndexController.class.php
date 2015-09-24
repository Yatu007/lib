<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller {
	public function index(){
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
	 * 获取新闻列表
	 * @param int $page
	 */
	public function news($page = 1){
		$page = (int)$page;
		$news = D('News');
		$data = $news->getNewsByPage($page);

		$this->ajaxReturn($data);
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
