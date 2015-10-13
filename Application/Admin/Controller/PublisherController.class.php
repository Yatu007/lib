<?php
namespace Admin\Controller;

use Think\Controller;

class PublisherController extends Controller {
	public function _initialize(){
		if(session('user_type') != 'admin'){
			$this->ajaxReturn(array('status'=>'error'));
		}
	}

	public function index(){

	}

	/*
	 * 添加出版社
	 * @param string $name
	 */
	public function add($name = ''){
		if(empty($name)){
			$this->ajaxReturn(array('status'=>'error'));
		}

		$publisher = M('Publisher');
		$res = $publisher->add(array('name'=>$name));
		$data['status'] = empty($res) ? 'error' : 'success';

		$this->ajaxReturn($data);
	}

	/*
	 * 删除出版社
	 * @param int $id
	 */
	public function delete($id = ''){
		if(empty($id)){
			$this->ajaxReturn(array('status'=>'error'));
		}

		$where = array(
			'id' => $id,
			'isAvailable' => 1
		);
		$publisher = M('Publisher');
		if($publisher->where($where)->find()){
			$book = M('Book');
			$flag = $book->where(array('isAvailable'=>1,'publisher_id'=>$id))->find();
			if(empty($flag)){
				$res = $publisher->where($where)->save(array('isAvailable'=>0));
			}
		}
		$data['status'] = empty($res) ? 'error' : 'success';
		$this->ajaxReturn($data);
	}

	/*
	 * 修改出版社
	 * @param int $id
	 * @param string $name
	 */
	public function alter($id = '', $name = ''){
		if(empty($id) || empty($name)){
			$this->ajaxReturn(array('status'=>'error'));
		}

		$where = array(
			'id' => $id,
			'isAvailable' => 1
		);
		$publisher = M('Publisher');
		if($publisher->where($where)->find()){
			$res = $publisher->where($where)->save(array('name'=>$name));
		}
		$data['status'] = empty($res) ? 'error' : 'success';
		$this->ajaxReturn($data);

	}
}
