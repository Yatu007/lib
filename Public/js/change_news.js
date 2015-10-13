 var page=1;
 //加载新闻列表
 $.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/News/page",//文件请求地址
					 data: 'page=1',
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {		
							var html="<table class='table_change_news'><tr><td>编号</td><td >新闻标题</td><td>发表时间</td><td>是否修改</td><td>是否删除</td></tr>";
							var i=0;
							for( var news in data)
							{
								i++;
								var temp='<tr><td>'+i+'</td><td class="news_td" >'+data[news]['title']+'</td><td>'+data[news]['time']+'</td><td class=\'table_change_td\' class="news_td" onclick=\'get_detai_news("'+data[news]['id']+'")\'>'+'修改</td><td class=\'table_change_td\' onclick=\'delete_news("'+data[news]['id']+'")\'>'+'删除</td></tr>';
								html+=temp;
							}
							html+='</table>';
								$('#div_right_table_change_news').html(html);
					 }
		 });
 function get_change_pages(num)
{
	$.ajax({	
			type: "get",
			url: "/lib/index.php/Home/News/pages",
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
					  $('#div_right_table_change_news').empty();
					$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/News/page",
					 data: 'page='+num,
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>新闻标题</th><th>发布时间</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var book in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[book]['title']+'</td><td  class=table_td>'+data[book]['author']+'<td class=\'table_change_td\' onclick=get_detai_news('+data[book]['id']+')>修 改</td><td  class=\'table_change_td\' onclick=delete_news('+data[book]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								
								html+="</table>"
								$('#div_right_table_change_news').html(html);
					 }
				 
				 });
			 }
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



function get_detai_news(news_id)//传入新闻id获取信息
	{	
		$('#div_right_table_change_news').empty();//清空
		$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/News/info",//文件请求地址
					 data: 'id='+news_id,
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)	//导入新闻信息				
					 {		
							var temp="<div class='div_right_change_contian'><div class='div_right_contian_form_chengeNews'><label>新闻主标题：</label><label class=\"notice\" id='label_bookName'>*</label><input type=\"text\" name='title' required placeholder='请输入新闻主标题' id='news_title' value="+data['title']+"></div>";
							temp+="<div class='div_right_contian_form_change_Newsdecoration'><textarea type='text' name='news_mainContain' id=\"input_NewsDecoration\" required placeholder='请输入新闻内容描述'> "+data['content']+"</textarea>";
							
							temp+="<script>KindEditor.ready(function(K) {	var editor;editor = K.create('textarea[id=input_NewsDecoration]', {newlineTag :this.value,	afterBlur:function(){this.sync();}})});	</script></div>";
							temp=temp+'<div class=\'div_right_contian_form_changeEnsure\'><button type=\'button\' onclick="ensure_change('+data['id']+')"  class=\'button_change_ensure\' id=\'button_ensure\'>确定</button><button type=\'button\' onclick=\'cancel()\' class=\'button_change_ensure\'>取消</button></div></div>';
							$('#div_right_table_change_news').append(temp);
					 }
				 });
	
	}


function ensure_change(id)
{
		var title=$('#news_title')[0].value;
		var contain=$('#input_NewsDecoration').val();//加载KindEditor后需要把里面的信息同步到textarea里面
		if(title!=""&&contain!="")
		{
			$.ajax
		({	
			type: "post",
			url: "/lib/index.php/Admin/News/alter",
			data:"id="+id+"&title="+title+'&content='+contain,
			dataType: "json",
			error: function()//失败 
			{ 
			alert('操作失败 '); 
			},
			success: function(data)					
			{
				if(data['status']=="success")
				{
					
					//跳到修改新闻页面
					$('#div_right').empty();
					$.get("/lib/Public/txt/change_news.txt",function(data){ $("#div_right").html(data); });
					$("#div_time_hidden").fadeIn(1500);
					window.setTimeout(div_hidden,1000);
					
				}
				else
				{
					alert("上传新闻失败");
				}
			}
		});
		}
		else
		{
			alert("标题与内容不得为空");
		}
}
function cancel()
{
		$('#div_right').empty();
		 $.get("/lib/Public/txt/change_news.txt",function(data){ $("#div_right").html(data); });
}
function delete_news(id)
{
	var statu = confirm("是否删除该条信息?");
        if(!statu){
            return false;
        }
	$.ajax({
					 type: "get",
					 url: "/lib/index.php/Admin/News/delete",//文件请求地址
					 data: 'id='+id,
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('操作失败'); 
					},
					 success: function(data)					//插入td的值
					 {		
							if(data['status']=="success")
							{
								$('#div_right').empty();
								$.get("/lib/Public/txt/change_news.txt",function(data){ $("#div_right").html(data); });
								$("#div_time_hidden").fadeIn(1500);
								window.setTimeout(div_hidden,1000);
							}
							else
							{
								alert('删除失败'); 
							}
					 }
				 });
}
 function div_hidden()
{
	$("#div_time_hidden").fadeOut(1000);
}
function get_changeNews()
{
	 $.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/News/page",//文件请求地址
					 data: 'page=1',
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {		
							var html="<table class='table_change_news'><tr><td>编号</td><td >新闻标题</td><td>发表时间</td><td>是否修改</td><td>是否删除</td></tr>";
							var i=0;
							for( var news in data)
							{
								i++;
								var temp='<tr><td>'+i+'</td><td class="news_td" >'+data[news]['title']+'</td><td>'+data[news]['time']+'</td><td class=\'table_change_td\' class="news_td" onclick=\'get_detai_news("'+data[news]['id']+'")\'>'+'修改</td><td class=\'table_change_td\' onclick=\'delete_news("'+data[news]['id']+'")\'>'+'删除</td></tr>';
								html+=temp;
							}
							html+='</table>';
								$('#div_right_table_change_news').html(html);
					 }
				 });
}