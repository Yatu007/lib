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
	 * @param int $num 	每页数量
	 * @return array
	 */
	public function getNewsByPage($page, $num = 10){
		$res = $this->where(array('isAvailable' => 1))->order('time desc')
			->page($page, $num)->select();

		if(empty($res)){
			return array();
		}
		foreach($res as $item){
			unset($item['content']);
			unset($item['isavailable']);
			$data[] = $item;
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

	/*
	 * 获取某条新闻具体信息
	 * @param int $id
	 * @return array
	 */
	public function read($id){
		$data = $this->where(array('isAvailable' => 1))->find($id);
		if(empty($data)){
			return array();
		}

		$data['count'] += 1;
		$this->save($data);
		unset($data['isavailable']);
		return $data;
	}
}
