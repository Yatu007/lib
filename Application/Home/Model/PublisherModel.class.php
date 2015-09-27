<?php
namespace Home\Model;

use Think\Model;

class PublisherModel extends Model {
	protected $field = array(
		'id',
		'isAvailable',
		'name',
		'time',
	);

	/*
	 * 根据分页获取列表
	 * @param int $page
	 * @param int $num 页内数据数量
	 * @return array
	 */
	public function getPubByPage($page,$num){
		$res = $this->where(array('isAvailable' => 1))->page($page, $num)->select();
		if(empty($res)){
			return array();
		}

		foreach($res as $item){
			unset($item['isavailable']);
			unset($item['time']);
			$data [] = $item;
		}
		return $data;
	}
}
