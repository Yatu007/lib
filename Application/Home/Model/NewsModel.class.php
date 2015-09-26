<?php
namespace Home\Model;

use Think\Model;

class NewsModel extends Model {
	protected $fields = array(
		'id',
		'isAvailable',
		'title',
		'content',
		'count',
		'time',
	);

	/*
	 * 根据分页获取新闻列表
	 * @param int $page 页数
	 * @return array
	 */
	public function getNewsByPage($page){
		$res = $this->where(array('isAvailable' => 1))->order('time desc')
			->page($page, 10)->select();

		if(empty($res)){
			return array();
		}
		foreach($res as $item){
			$id = $item['id'];
			$data[$id] = $item['title'];
		}
		return $data;
	}

	/*
	 * 获取最新新闻
	 * @return array
	 */
	public function getRecent(){
		$res = $this->where(array('isAvailable' => 1))->order('time desc')
			->limit(0,9)->select();

		if(empty($res)){
			return array();
		}
		foreach($res as $item){
			$id = $item['id'];
			$data[$id] = $item['title'];
		}
		return $data;
	}
}
