$page = 1;
$pages = 0;
$query = window.location.href.slice(window.location.href.indexOf('?') + 1);
$(document).ready(function(){
	getPages();
	changePage($page);
	hotSearch();
	showOptions();
});

function getPages(){
	$.ajaxSetup({
		async : false //取消异步
	});
	$.get('/lib/index.php/Home/Search/pages?'+$query,function($data){
		$pages = $data.pages;
	});
}

//改变分页栏
function changePagination(){
	$pagination = $('#pagination');
	$pagination.empty();
	if($pages == 0){
		return;
	}
	$total = 5;
	$start = 1;
	if($pages < $total){
		$total = $pages;
	}

	if($total < 5){
		$start = 1;
	}
	else if($page > 3 && $page <= $pages -3){
		$start = $page-2;
	}else if($page > 3 && $page > $pages -3){
		$start = $pages -4;
	}
	for($i = 0; $i < $total; $i++){
		$item = $('<li>');
		if($page == $start+$i){
			$item.addClass('active');
		}
		$item.append($('<a>').html($start+$i).bind('click',function(){
			changePage(parseInt($(this).html()));
		}));
		$pagination.append($item);
	}
}

//改变分页
function changePage($index){
	$page = $index;
	changePagination();
	getPage();
}

//获取分页数据
function getPage(){
	var $reg = /keyword=/;
	if($reg.test($query)){//普通搜索
		$.get('/lib//index.php/Home/Search/normal?'+$query, {'page':$page}, function($data){
			showPage($data);
		});
	}else{//高级搜索
		$.get('/lib//index.php/Home/Search/advanced?'+$query, {'page':$page}, function($data){
			showPage($data);
		});
	}
	$(document).scrollTop(0);
}

//显示分页数据
function showPage($data){
	var $booklist = $('#booklist');
	$booklist.empty();
	if($data == null){
		$booklist.append($('<h2>').html('Nothing In Here!'));
		return;
	}
	$.each($data, function($index, $item){
		$node = $('<div>').addClass('row').append($('<hr/>'));
		$img = $('<img>').attr('src', '/lib/Public/upload/img/'+$item.cover);
		$node.append($('<div class="col-md-3">').append($('<a>')
			.attr('href', '/lib/index.php/Home/Book/detail?id='+$item.id).append($img)));

		$about = $('<div>').addClass('col-md-9');
		$about.append($('<a>').attr('href', '/lib/index.php/Home/Book/detail?id='+$item.id).html($item.title));
		$about.append($('<p style="height:80px;overflow:hidden;">').html("&nbsp;&nbsp;&nbsp;&nbsp;"+$item.description));
		$node.append($about);
		$booklist.append($node);
	});
}

//热门检索
function hotSearch(){
	$parent = $('#hotSearch');
	$.get('/lib/index.php/Home/Search/hotSearch', function($data){
		$.each($data, function($index, $item){
			$parent.append($('<div>').append($('<a>').attr('href','/lib/index.php/Home/Search/index?keyword='+$item.keyword)
				.addClass('label label-primary').html($item.keyword)));
		});
	});
}

//显示搜索相关项
function showOptions(){
	$parent = $('#options');
	$reg = /keyword=/;
	if($reg.test($query)){
		var $keyword = getQueryString('keyword');
		$node = $('<span>').addClass('label label-primary').html(escape2Html($keyword));
		$parent.append($node);
	}else{
		var $arr = ['title', 'author', 'isbn', 'publisher', 'type'];
		$.each($arr, function($i, $item){
			var $value = getQueryString($item);
			if($value != ''){
				$node = $('<span>').addClass('label label-primary').html(escape2Html($value));
				$parent.append($node);
			}
				
		});
	}
	$node = $('<span>').addClass('label label-primary').html('共'+$pages+'页');
	$parent.append($node);
}

//html转义
function escape2Html(str) {
	$html = $('<p>').text(str).html();
	return $html;
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); return null;
} 