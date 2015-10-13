$id = parseInt(getQueryString('id'));
$start = $id-1;
$(document).ready(function(){
	getDetails();
	getPage();
	$('#prev').on('click', function(){
		prevPage();
		return false;
	});
	$('#next').on('click', function(){
		nextPage();
		return false;
	});
});

function getDetails(){
	$.get('/lib/index.php/Home/News/info', {'id':$id}, function($data){
		if($data.id){
			$('#title').html($data.title);
			$('#count').html($data.count);
			$('#time').html($data.time);
			$('#content').html($data.content);
		}
	})
}

function getPage(){
	$.get('/lib/index.php/Home/News/page', {'start':$start}, function($data){
		if($data.length){
			$parent = $('#page');
			$parent.empty();
			$.each($data, function($index, $value){
				$node = $('<li style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">')
				  .addClass('list-group-item').append($('<a>').attr('href','/lib/index.php/Home/News/detail?id='+$value.id).html($value.title));
				$parent.append($node);
			});
		}
		if($data.length < 10){
			$('#next').addClass('disabled');
		}
	})

}

//上一页
function prevPage(){
	if($start <= 10){
		$start = 0;
		$('#prev').addClass('disabled');
	}else{
		$start = $start - 10;
	}
	$('#next').removeClass('disabled');
	getPage();
}

//下一页
function nextPage(){
	if($start == 0){
		$('#prev').removeClass('disabled');
	}
	$start = $start + 10;
	getPage();
}


function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); return null;
}