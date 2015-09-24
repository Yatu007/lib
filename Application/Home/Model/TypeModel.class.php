<?php
namespace Home\Model;

use Think\Model;

class TypeModel extends Model {
	protected $fields = array(
		'id',
		'isAvailable',
		'name',
		'time',
	);

	/*
	 * 从数据库中读取所有可用分类
	 * @return array $data array(id => name)
	 */
	public function getCategories(){
		$res = $this->where(array('isAvailable' => 1))->select();
		if(empty($res)){
			return array();
		}
		foreach($res as $value){
			$id = $value['id'];
			$data[$id] = $value['name'];
		}
		return $data;
	}
}
