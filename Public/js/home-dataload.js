$(document).ready(function(){
	getCates();
	getRecentNews();
	getNewBook();
	getHotBook();
	$('#advSearchBtn').bind('click',function(){
		$low = $('#pricefrom').val();
		$high = $('#priceto').val();
		$tip = $('#tip');
		if(!isNaN($low) && !isNaN($high) || ($low == '' && $high == '')){
			if($low < $high || $high == '' ){
				$('#advSearch').submit();
			}else{
				$tip.html('价格区间不正确');
			}
		}else{
			$tip.html('价格必须为数字')
			$('#pricefrom').val('');
			$('#priceto').val('');
		}
		setTimeout(function(){
			$tip.html('');
		},3000);
	});
	getPublisher();
});

//获取分类列表
function getCates(){
	$.get('/lib/index.php/Home/Book/categories', function(data){
		$parent = $('#categories');
		$.each(data, function(i, item){
			$node = $('<li>').append($('<a href="#type'+item.id+'" data-toggle="tab">'+item.name+'</a>'));
			$active = false;
			if(i == 0){
				$node.addClass('active');
				$active = true;
			}
			$parent.append($node);
			getCateContent(item.id, $active);
			addSearchType(item.name);
		});
	});
}

//获取分类内容
function getCateContent(id, active){
	$.get('/lib/index.php/Home/Book/category?id='+id, function(data){
		$parent = $('<div class="tab-pane fade" id="type'+id+'">');
		$.each(data, function(i, item){
			$node = $('<a href="/lib/index.php/Home/Book/detail?id='+id+'">').addClass('thumbnail');
			$node.append('<img src="/lib/Public/upload/img/'+item.cover+'" class="img-rounded" alt="封面" style="width:95px;height:145px;"/>');
			$node.append($('<div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">').html(item.title));
			$parent.append($('<div>').addClass('col-md-3').append($node));
			if(active){
				$parent.addClass('in active');
			}
		});
		$('#myType').append($parent);
	});
}

//最新新闻
function getRecentNews(){
	$.get('/lib/index.php/Home/News/recent', function(data){
		$parent = $('#news ul');
		$.each(data, function(index, value){
			$node = $('<li style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">')
			  .addClass('list-group-item').append($('<a>').attr('href','/lib/index.php/Home/News/detail?id='+index).html(value));
			$parent.append($node);
		});
	});
}

//新书推荐
function getNewBook(){
	$.get('/lib/index.php/Home/Book/newbook', function(data){
		$parent = $('#newbook ul');
		$.each(data, function(i, item){
			$node = $('<li style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">')
			  .addClass('list-group-item').append($('<a>').attr('href','/lib/index.php/Home/Book/detail?id='+item.id).html(item.title+'——'+item.author));
			$parent.append($node);
		});
	});
}

//热门书籍
function getHotBook(){
	$.get('/lib/index.php/Home/Book/hotbook', function(data){
		$parent = $('#hotbook ul');
		$.each(data, function(i, item){
			$node = $('<li style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">')
			  .addClass('list-group-item').append($('<a>').attr('href','/lib/index.php/Home/Book/detail?id='+item.id).html(item.title+'——'+item.author));
			$parent.append($node);
		});
	});
}

//将分类加入搜索选项中
function addSearchType(name){
	$('#type').append($('<option>').html(name));
}

//获取出版社列表
function getPublisher(){
	$.get('/lib/index.php/Home/Publisher/index', function(data){
		$parent = $('#publisher');
		$.each(data, function(i, item){
			$parent.append($('<option>').html(item.name));
		});
	});
}