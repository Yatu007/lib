/*
折叠面板js代码

*/
window.onload=function()
{
        var oNav=document.getElementById('nav');
		var TNav=document.getElementById('nav1');
		var sNav=document.getElementById('nav2');
		var nNav=document.getElementById('nav3');
        var oBox=document.getElementById('box');
		var TBox=document.getElementById('box1');
		var sBox=document.getElementById('box2');
		var nBox=document.getElementById('box3');
		var logout=document.getElementById('logout');
		
		logout.onclick=function()
		{
			$.ajax({
					 type: "get",
					 url: "/lib/index.php/Admin/Index/logout",
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					
					 {			
									var temp=data['status'];
									if(temp=='success')
									{
										location.href="/lib/index.php/Admin";
									}
					 }
				 });
		}
        oNav.onclick=function()
        {
				$('#div_right').empty(); 					//清空div_right里面的所有内容
				//$('#div_right').append('<img src=../img/div_right3.jpg id=img_user_guide />');	
				             //重新添加div_right里面的引导内容
				var insert_html="<h>";
                if(oBox.style.display=='block')
                {
                        oBox.style.display='none';
                }
                else
                {
                        oBox.style.display='block';
						TBox.style.display='none';
						sBox.style.display='none';
						nBox.style.display='none';
                }
        }
		TNav.onclick=function()
        {
				$('#div_right').empty(); 					//清空div_right里面的所有内容
				//$('#div_right').append(' <img src=../img/div_right3.jpg id=img_user_guide />');					             //重现添加div_right里面的引导内容
                if(TBox.style.display=='block')
                {
                        TBox.style.display='none';
                }
                else
                {
                        TBox.style.display='block';
						oBox.style.display='none';
						sBox.style.display='none';
						nBox.style.display='none';
                }
        }
		  sNav.onclick=function()
        {
				$('#div_right').empty(); 					//清空div_right里面的所有内容
				//$('#div_right').append(' <img src=../img/div_right3.jpg id=img_user_guide />');					             //重现添加div_right里面的引导内容
                if(sBox.style.display=='block')
                {
                        sBox.style.display='none';
                }
                else
                {
                        sBox.style.display='block';
						oBox.style.display='none';
						TBox.style.display='none';
						nBox.style.display='none';
                }
        }
		nNav.onclick=function()
        {
				$('#div_right').empty(); 					//清空div_right里面的所有内容
				//$('#div_right').append('<img src=../img/div_right3.jpg id=img_user_guide />');					             //重现添加div_right里面的引导内容
                if(nBox.style.display=='block')
                {
                        nBox.style.display='none';
                }
                else
                {
                        nBox.style.display='block';
						oBox.style.display='none';
						TBox.style.display='none';
						sBox.style.display='none';
						
                }
        }
		
		
/*
		折叠面板下的，菜单栏点击按钮，#div_right出现不同界面
*/
		
	var add_book=document.getElementById('add_book');
	var change_books=document.getElementById('change_books');
	var add_news=document.getElementById('add_news');		   
	var change_news=document.getElementById('change_news'); 
	var add_newSorts=document.getElementById('add_newSorts');
	var add_Press=document.getElementById('add_Press');
	var change_book_sorts=document.getElementById('change_Sorts');
	var change_Publisher=document.getElementById('change_Press');
	
		//功能具体操作
	
	//添加书籍按钮模块
	add_book.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/add_book.txt",function(data){ $("#div_right").html(data); });//加载div_right里面的内容
		 
	}
	
	//修改/删除书籍信息模块
	change_books.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/change_books.txt",function(data){ $("#div_right").html(data); });//加载div_right里面的内容
	}
	//添加新闻信息模块
	add_news.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/add_news.txt",function(data){ $("#div_right").html(data); });//加载div_right里面的内容
		
	}
	//修改/删除新闻信息模块
	change_news.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/change_news.txt",function(data){ $("#div_right").html(data); });//加载div_right里面的内容
	}
	add_newSorts.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/add_newSorts.txt",function(data){ $("#div_right").html(data); });//加载div_right里面的内容
	}
	add_Press.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/add_Press.txt",function(data){ $("#div_right").html(data); });
	}
	change_books.onclick=function()
	{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/change_books.txt",function(data){ $("#div_right").html(data); });
	}
	change_Publisher.onclick=function()
	{
		$('#div_right').empty();
		$.get("/lib/Public/txt/change_Publisher.txt",function(data){$("#div_right").html(data)});
	}
	change_book_sorts.onclick=function()
	{
		$('#div_right').empty();
		$.get("/lib/Public/txt/change_book_sorts.txt",function(data){$("#div_right").html(data)});
	}	
};

