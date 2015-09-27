<?php
namespace Home\Controller;

use Think\Controller;

class TypeController extends Controller {
	/*
	 * 分类分页数
	 */
	public function pages(){
		$type = M('Type');
		$count = $type->where(array('isAvailable' => 1))->count();
		$pages = ceil($count / 10);

		$this->ajaxReturn(array('pages' => $pages));
	}

	/*
	 * 分类分页列表
	 */
	public function page($page = 1){
		$page = (int)$page;
		$type = D('Type');
		$data = $type->getTypeByPage($page,10);

		$this->ajaxReturn($data);
	}
}
