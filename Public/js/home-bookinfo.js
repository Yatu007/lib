$id = parseInt(getQueryString('id'));

$(document).ready(function(){
	getDetails();
	getOthers();
	$('#change').on('click',function(){
		getOthers();
	})
})

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); return null;
}

//获取书籍详情
function getDetails(){
	$.get('/lib/index.php/Home/Book/info', {id:$id}, function($data){
		if($data.id){
			$('#title').html($data.title);
			$('#cover').attr('src', '/lib/Public/upload/img/'+$data.cover);
			$('#author').html($data.author).attr('href','/lib/index.php/Home/Search/index?keyword='+$data.author);
			$('#count').html($data.count);
			$('#price').html($data.price);
			$('#type').html($data.type);
			$('#pubdate').html($data.pubdate);
			$('#isbn').html($data.isbn);
			$('#publisher').html($data.publisher);
			$('#description').html($data.description);
		}
	});
}

//获取推荐
function getOthers(){
	$parent = $('#others');
	$parent.empty();
	$.get('/lib/index.php/Home/Book/others', function($data){
		if($data[0]){
			$.each($data, function($i, $item){
				$a = $('<a>').attr('href','/lib/index.php/Home/Book/detail?id='+$item.id);
				$a.append($('<img>').attr('src','/lib/Public/upload/img/'+$item.cover));
				$a.append($('<p>').addClass('title').html($item.title));

				$parent.append($('<div>').addClass('col-md-6').append($a));
			});
		}else{
			$paren.append($('<h3>').html('Nothing In Here!'));
		}
	});
}