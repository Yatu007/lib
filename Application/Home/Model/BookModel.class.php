<?php
namespace Home\Model;

use Think\Model\RelationModel;

class BookModel extends RelationModel {
	protected $fields = array(
		'id',
		'isAvailable',
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

	protected $_link = array(
		'publisher' => array(
			'mapping_type' => self::BELONGS_TO,
			'class_name' => 'Publisher',
			'as_fields' => 'name:publisher',
		),
		'type' => array(
			'mapping_type' => self::BELONGS_TO,
			'class_name' => 'Type',
			'as_fields' => 'name:type',
		),
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
