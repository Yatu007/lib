<?php
namespace Admin\Controller;

use Think\Controller;

class BookController extends Controller {
	public function _initialize(){
		if(session('user_type')!= 'admin'){
			$this->ajaxReturn(array('status'=>'error'));
		}
	}

	/*
	 * 书籍列表
	 * @param int $page
	 */
	public function index($page = 1){
		$page = (int)$page;
		$book = M('Book');
		$data = $book->where(array('isAvailable'=>1))->page($page,10)->getField('id,title,author');

		$this->ajaxReturn(array_values($data));
	}

	/*
	 * 增加书籍
	 */
	public function add(){
		$publisher = M('Publisher');
		$status = $publisher->find($_POST['publisher_id']);
		if(empty($staus)){
			$this->ajaxReturn(array('status' => 'error'));
		}

		$type = M('Type');
		$status = $type->find($_POST['type_id']);
		if(empty($status)){
			$this->ajaxReturn(array('status' => 'error'));
		}

		$book = M('Book');
		$book->create();
		$res = $book->add();
		$data['status'] = empty($res) ? 'error' : 'success';

		$this->ajaxReturn($data);
	}

	/*
	 * 删除书籍
	 * @param int $id
	 */
	public function delete($id = ''){
		$book = M('Book');
		$res = $book->where(array('id'=>$id))->save(array('isAvailable'=>0));
		$data['status'] = 'success';
		if(empty($res)){
			$data['status'] = 'error';
		}

		$this->ajaxReturn($data);
	}

	/*
	 * 修改书籍
	 */
	public function alter(){
		$publisher = M('Publisher');
		$status = true;
		if(!empty($_POST['publisher_id'])){
			$status = $publisher->find($_POST['publisher_id']);
		}
		if(empty($status)){
			$this->ajaxReturn(array('status' => 'error'));
		}

		$type = M('Type');
		$status = true;
		if(!empty($_POST['type_id'])){
			$status = $type->find($_POST['type_id']);
		}
		if(empty($status)){
			$this->ajaxReturn(array('status' => 'error'));
		}

		$book = M('Book');
		if($book->where(array('isAvailable' => 1,'id'=>$_POST['id']))->find()){
			$book->create();
			$res = $book->save();
		}
		$data['status'] = empty($res) ? 'error' : 'success';

		$this->ajaxReturn($data);
	}
}
