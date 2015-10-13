 $.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Publisher/page",//文件请求地址
					 data: 'page=1',
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {		
							var html="<table class='table_change_news'><tr><th>编号</th><th>出版社名</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var Publisher in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[Publisher]['name']+'</td><td class=\'table_change_td\' onclick=change_Publisher("'+data[Publisher]['id']+'","'+data[Publisher]['name']+'")>修 改</td><td  class=\'table_change_td\' onclick=delete_Publisher('+data[Publisher]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 });
function get_changePublisher()
{
	 $.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Publisher/page",//文件请求地址
					 data: 'page=1',
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {		
							var html="<table class='table_change_news'><tr><th>编号</th><th>出版社名</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var Publisher in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[Publisher]['name']+'</td><td class=\'table_change_td\' onclick=change_Publisher('+data[Publisher]['id']+'","'+data[Publisher]['name']+')>修 改</td><td  class=\'table_change_td\' onclick=delete_Publisher('+data[Publisher]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 });
}
function  Turn_the_page(num)
 {
	 if(num==1)
	 {
		 get_change_pages('first');
	 }
	 if(num==2)
	 {
			
			 get_change_pages('front'); 
	 }
	 if(num==3)
	 {
		
		get_change_pages('next');
	 }
	 if(num==4)
	 {
		 get_change_pages('last');
	 } 
 }
 
 var page=1;
  function get_change_pages(num)
{
	$.ajax({	
			type: "get",
			url: "/lib/index.php/Home/Publisher/pages",
			dataType: "json",
			error: function()//失败 
			{ 
			alert('Error loading document'); 
			},
			success: function(data)					
			{
				  pages=data["pages"];
				  if(num=='last')
				  {
					  num=pages;
					  window.page=num;
					 
				  }
				  if(num=='first')
				  {
					  num=1;
					  window.page=num;
					 
				  }
				  if(num=='next'&&window.page<pages)
				  {
					  window.page++;
					  num=window.page;
					 
				  }
				  if(num=='front'&&window.page>1)
				  {
					  window.page--;
					  num=window.page;
				  }
				  if(num>=1&&num<=pages)
				  {
					  $('#div_right_table_change_book').empty();
					$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Publisher/page",
					 data: 'page='+num,
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>出版社名</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var Publisher in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[Publisher]['name']+'</td><td class=\'table_change_td\' onclick=change_Publisher('+data[Publisher]['id']+'","'+data[Publisher]['name']+')>修 改</td><td  class=\'table_change_td\' onclick=delete_Publisher('+data[Publisher]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 
				 });
			 }
			}
		});
	
}

function delete_Publisher(id)
{
        var statu = confirm("是否删除该条信息?");
        if(!statu){
            return false;
        }
        $.ajax({
                type:"post",
                url:"/lib/index.php/Admin/Publisher/delete",
                data:"id="+id,
				dataType: "json",
                success:function(msg){
                        if(msg['status']=='success')
						{
                            
							//重新加载内容
							$('#div_right').empty();
							$.get("/lib/Public/txt/change_Publisher.txt",function(data){ $("#div_right").html(data); });
							$("#div_time_hidden").fadeIn(1500);
								window.setTimeout(div_hidden,1000);
                        }
						else
						{
                            alert( '操作失败！请确保无该出版社出版的书籍' );
                        }                      
                },
                error:function(){
                        alert( '操作失败！' );
                }
                
            });
}
function change_Publisher(Publisher,id)
{
	
}
 function div_hidden()
{
	$("#div_time_hidden").fadeOut(1000);
}