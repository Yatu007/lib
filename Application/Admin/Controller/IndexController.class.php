<?php
namespace Admin\Controller;

use Think\Controller;

class IndexController extends Controller {
	public function index(){
		if(session('user_type') == 'admin'){
			$this->redirect('Index/admin');
		}
		$this->display();
	}

	/*
	 * 处理登录表单
	 */
	public function login($username='', $password='', $code=''){
		if(session('user_type') == 'admin'){
			$data['status'] = 'error';
			$data['code'] = '103';
			$this->ajaxReturn($data);
		}
		
		if(!($this->checkCode($code))){
			$data['status'] = 'error';
			$data['code'] = '102';
			$this->ajaxReturn($data);
		}

		$admin = M('Admin');
		$where = array(
			'uname' => $username,
			'passwd' => md5($password),
		);
		$status = $admin->where($where)->getField('id');
		if(empty($status)){
			$data['status'] = 'error';
			$data['code'] = '101';
			$this->ajaxReturn($data);
		}
		$login = M('Login');
		$ip = get_client_ip();
		$login->add(array('uid'=>$status,'ip'=>$ip));
		session('user_type','admin');
		$this->ajaxReturn(array('status' => 'success'));

	}

	/*
	 * 生成验证码
	 */
	public function code(){
		$verify = new \Think\Verify();
		$verify->entry();
	}

	/*
	 * 校验验证码
	 * @param string $code
	 * @param int $id
	 * @return bool
	 */
	protected function checkCode($code, $id = ''){
		$verify	= new \Think\Verify();
		return $verify->check($code, $id);
	}

	/*
	 * 注销登陆
	 */
	public function logout(){
		$status = 'success';
		try{
			session(null);
		}catch(Exception $e){
			$status = 'error';
		}
		$this->ajaxReturn(array('status' => $status));
	}

	/*
	 * 管理页面
	 */
	public function admin(){
		if(session('user_type') != 'admin'){
			$this->redirect('Index/index');
		}
		$this->display();
	}
}
