<?php
namespace Home\Model;

use Think\Model;

class BookModel extends Model {
	protected $fields = array(
		'id',
		'idAvailable',
		'title',
		'cover',
		'author',
		'isbn',
		'publisher_id',
		'type_id',
		'pubdate',
		'description',
		'price',
		'count',
		'time',
	);

	/*
	 * 根据分类获取书籍
	 * @param int $id
	 * @return array(array(
	 * 		'id'=>id,
	 * 		'title'=>title,
	 * 		'cover'=>cover
	 * 		)...)
	 */
	public function getBookByCat($id){
		$id = (int)$id;
		if(empty($id)){
			return array();
		}

		$where = array(
			'isAvailable' => 1,
			'type_id' => $id,
		);

		$res = $this->where($where)->order('time desc')->limit(0,8)
			->getField('id,title,cover');

		if(empty($res)){
			return array();
		}
		return $res;
	}

	/*
	 * 新书推荐
	 * @return array
	 */
	public function getNewBook(){
		$where = array('isAvailable' => 1);
		$res = $this->where($where)->order('time desc')->limit(0,8)
			->getField('id,title,author');

		if(empty($res)){
			return array();
		}
		return $res;
	}

	/*
	 * 热门图书
	 * @return array
	 */
	public function getHotBook(){
		$where = array('isAvailable' => 1);
		$res = $this->where($where)->order('count desc')->limit(0,8)
			->getField('id,title,author');

		if(empty($res)){
			return array();
		}
		return $res;
	}
}
