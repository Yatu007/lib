<?php
namespace Addon\Behavior;

use \Think\Behavior;
/*
*记录请求到日志表
*/
class RequestBehavior extends Behavior {
	public function run(&$param) {
		
		$Request = M('Request');

		$data['ip'] = get_client_ip();
		$data['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
		$data['method'] = $_SERVER['REQUEST_METHOD'];
		$data['uri'] = $_SERVER['REQUEST_URI'];
		
		$Request->add($data);
	}
}
