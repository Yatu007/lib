 var cover;
  $(document).ready(function(){
    //选择文件成功则提交表单
    $("#input_picture").change(function(){
        if($("#input_picture").val() != '') $("#submit_form").submit();
     });
    //iframe加载响应，初始页面时也有一次，此时data为null。
     $("#exec_target").load(function(){
         var data = $(window.frames['exec_target'].document.body).find("pre").html();
         //若iframe携带返回数据，则显示在feedback中
		 var obj = eval('(' + data + ')'); //json数据生成object对象
		 
        if(data != null){
		
             $("#upload_file").val('');
			
			 window.cover=obj['pic']
			
         }
     });
 });
 //删除确认按钮
 function delete_book(id)
 {
        //var user8ID   = $.trim( $('#user8ID').val() );
        var statu = confirm("是否删除该条信息?");
        if(!statu){
            return false;
        }
        $.ajax({
                type:'post',
                url:'/lib/index.php/Admin/Book/delete',
                data:'id='+id,
				dataType:'json',
                success:function(msg){
                        if(msg['status']=='success')
						{
                            //重新加载内容
							$('#div_right').empty();
							$.get("/lib/Public/txt/change_books.txt",function(data){ $("#div_right").html(data); });
							$("#div_time_hidden").fadeIn(1500);
								window.setTimeout(div_hidden,1000);
                        }
						else
						{
                            alert( '删除失败！' );
                        }                      
                },
                error:function(){
                        alert( '操作失败！' );
                }
                
            });
        
    
   
 }
 
 
 
 var page=1;
  function get_change_pages(num)
{
	$.ajax({	
			type: "get",
			url: "/lib/index.php/Home/Book/pages",
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
					 url: "/lib/index.php/Admin/Book/index",
					 data: 'page='+num,
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>书籍名称</th><th>作者</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var book in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[book]['title']+'</td><td  class=table_td>'+data[book]['author']+'<td class=\'table_change_td\' onclick=change('+data[book]['id']+')>修 改</td><td  class=\'table_change_td\' onclick=delete_book('+data[book]['id']+')>删除</td></tr>';
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
 function getPublisher(num,Publisher)
				 {
					$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Publisher/page",
					data:"page="+num,
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入option值
					 {			var html;
								for(var publisher in data)
								{
									if(Publisher!=data[publisher]['name'])
									{
										var temp='<option value='+data[publisher]['id']+'>'+data[publisher]['name']+'</option>';
										html+=temp;
										
									}
									if(Publisher==data[publisher]['name'])
									{
										html='<option value="'+data[publisher]['id']+'">'+Publisher+'</option>'+html;
									}
								}
								
								
								$('#bookPress').append(html);
					 }
				 });
				 }
function getBookBelong(num,bookBelong)
				 {
					
					$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Type/page",
					data:"page="+num,
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入option值
					 {			
								
								var html;
								for(var publisher in data)
									
								{	
								if(bookBelong!=data[publisher]['name'])
									{	
												var temp='<option value="'+data[publisher]['id']+'">'+data[publisher]['name']+'</option>';
												html+=temp;	
									}
									else
									{
										html='<option value="'+data[publisher]['id']+'">'+bookBelong+'</option>'+html;
									}
									
								}
								
								
								$('#bookBelong').append(html);
					 }
				 });
				 }

//导入第一页信息
$.ajax({
					 type: "get",
					 url: "/lib/index.php/Admin/Book/index",
					 data: 'page=1',
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>书籍名称</th><th>作者</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var book in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[book]['title']+'</td><td  class=table_td>'+data[book]['author']+'</td><td class=\'table_change_td\' onclick=change('+data[book]['id']+')>修 改</td><td  class=\'table_change_td\'onclick=delete_book('+data[book]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 
				 });
function book_detail_message(id,bookName,author,bookBelong,publisher,BookPrice,cover,description,isbn,pubdate)
{	
	html="<div id='div_right_change_contian'><div class='div_right_contian_form_bookName_'><label>书名：</label><label class=\"notice\" id='label_bookName'>*</label><input type=\"text\" name='Change_book_name'id='title' ";
									
		html+="value='"+bookName+"' class='Manager_input'/></div>";
							
		html+="<div class='div_right_contian_form_bookName_'><label>作者：</label><label class=\"notice\"id='label_writerName'>*</label><input type=\"text\" name='writerName' required  class='Manager_input'"+" value='"+author+"'  class='Manager_input' id='author'/></div>";
		
		html+=	'<div class=\'div_right_contian_form_writerName_\'><label>编号：</label><label class="notice" id=\'label_writerNum\'>*</label><input type="text" name=\'isbn\' required  placeholder=\'请输入书籍编号\' class=\'Manager_input\' value="'+isbn+'" id=\'isbn\'/></div><div class=\'div_right_contian_form_bookPrice_\'><label>出版日期：</label><label class="notice" class=\'input_bookbelong\'>*</label><input type=\'text\' name=\'pubdate\' required placeholder=\'请输入出版日期\'value="'+pubdate+'" id=\'pubdate\'/></div>	';	
		
		html+="<div class='div_right_contian_form_bookPress_'><label>所属类别：</label><label class=\"notice\">*</label><select name=\"bookBelong\" id =\"bookBelong\"  >";//插入书籍类别
		var pages=1;
		$.ajax
		({	
			type: "get",
			url: "/lib/index.php/Home/Type/pages",
			dataType: "json",
			error: function()//失败 
			{ 
			alert('Error loading document'); 
			},
			success: function(data)					
			{
				pages=data["pages"];
				for(i=1;i<=pages;i++)
				{
					getBookBelong(i,bookBelong);
				}
			}
		});
		html+="</select></div >";	
		
		html+="<div class='div_right_contian_form_bookPress_'><label>出版社名：</label><label class=\"notice\">*</label><select name=\"bookPress\" id =\"bookPress\"  >";
		
		var pages=1;
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
				for(i=1;i<=pages;i++)
				{
				getPublisher(i,publisher);
				}
			}
	});
	
		html+="</select></div >";	
								
							
			html+="<div class='div_right_contian_form_bookPrice_'><label>书籍价格：</label><label class=\"notic\">*</label><input type='text' name='bookPrice' id=\"input_bookPrice\" required class='Manager_input' value='"+BookPrice+"'></div>";
				
			 html+="<div id='div_right_contian_form_bookPicture_'><form id=\"submit_form\" method=\"post\" action=\"/lib/index.php/Admin/Upload/image\" target=\"exec_target\" enctype=\"multipart/form-data\"><label>书籍图片：</label><label class=\"notice\">*</label><input type=\"file\"  method= 'post'name=\"pic\" id=\"input_picture\" accept=\"image/png,image/jpeg\" required>       </form> <iframe id=\"exec_target\" name=\"exec_target\"></iframe></div>";
			 
			html+="<div id='div_right_change_contian_form_decoration'><textarea type='text' name='book_decoration' id=\"input_bookDecoration\" required placeholder='请输入书籍描述'>"+description+"</textarea></div>";
			html+="<div id='div_right_change_contian_form_ensure'><button onclick='upload_change("+id+")' >确定</button><button onclick='cancel()' id='input_reset_right'>取消</button></div> </div>";
			
			$('#div_right_table_change_book').append(html);//此处加入修改后的内容 
			
}
function upload_change(id)
{
	var title=$("#title")[0].value;
	
	var author=$("#author")[0].value;
	var isbn=$("#isbn")[0].value;
	var pubdate=$("#pubdate")[0].value;
	var bookBelong=$("#bookBelong")[0].value;
	var publisher_id=$("#bookPress")[0].value;
	var input_bookPrice=$("#input_bookPrice")[0].value;
	var input_bookDecoration=$("#input_bookDecoration")[0].value;
	
		if(title!=null&&author!=null&&isbn!=null&&pubdate!=null&&bookBelong!=null&&publisher_id!=null&&input_bookPrice!=null&&input_bookDecoration!=null&&window.cover!=null)
		{
			$.ajax({
					 type: "post",
					 url: "/lib/index.php/Admin/Book/alter",
					data:"id="+id+"&title="+title+"&cover="+window.cover+"&author="+author+"&isbn="+isbn+"&publisher_id="+publisher_id+"&type_id="+bookBelong+"&pubdate="+pubdate+"&description="+input_bookDecoration+"&price="+input_bookPrice,
					 dataType: "json",
					 success:function(msg){
                        if(msg['status']=='success')
						{
                            //重新加载内容
							
							$('#div_right').empty();
							$.get("/lib/Public/txt/change_books.txt",function(data){ $("#div_right").html(data); });
							$("#div_time_hidden").fadeIn(1500);
								window.setTimeout(div_hidden,1000);
                        }
						else
						{
                            alert( '上传失败，请确保信息已经填完整！' );
							
                        }                      
                },
                error:function(){
                        alert( '操作失败！' );
                }
				 });
		
		}
	
 
}
function change(str)//从数据库导出书籍信息
{
		$('#div_right_table_change_book').empty(); 
		$('.div_right_table_change_index').empty(); 
		//通过id值导出书籍信息
		var bookName;
		var author;
		var type;
		var publisher;
		var BookPrice;
		
		var description;
		$.ajax({
					 type: "get",
					 url: "/lib/index.php/Home/Book/info",
					 data: 'id='+str,
					 dataType: "json",
					 error: function()//失败 
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)		
					 {
						bookName=data['title'];
						author=data['author'];
						type=data['type'];
						publisher=data['publisher'];
						BookPrice=data['price'];
						window.cover=data['cover'];
						description=data['description'];
						isbn=data['isbn'];
						pubdate=data['pubdate'];
						id=data['id'];
						book_detail_message(id,bookName,author,type,publisher,BookPrice,window.cover,description,isbn,pubdate);
					}
		});
		
		
}                                                                                                                                                  
function cancel()
{
	
	$('#div_right_table_change_book').empty();
	$.ajax({
					 type: "get",
					 url: "/lib/index.php/Admin/Book/index",
					 data: 'page=1',
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>书籍名称</th><th>作者</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var book in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[book]['title']+'</td><td  class=table_td>'+data[book]['author']+'<td class=\'table_change_td\' onclick=change('+data[book]['id']+')>修 改</td><td  class=\'table_change_td\'onclick=delete_book('+data[book]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 
				 });
}
 function div_hidden()
{
	$("#div_time_hidden").fadeOut(1000);
}
function get_change_books()
{
	$.ajax({
					 type: "get",
					 url: "/lib/index.php/Admin/Book/index",
					 data: 'page=1',
					 dataType: "json",
					 error: function()
					 { 
						alert('Error loading document'); 
					},
					 success: function(data)					//插入td的值
					 {
								var html="<table class='table_change_news'><tr><th>编号</th><th>书籍名称</th><th>作者</th><th>是否修改</th><th>是否删除</th></tr>";
								var i=1;
								for(var book in data)
								{
									var temp='<tr><td>'+i+'</td><td class=table_td>'+data[book]['title']+'</td><td  class=table_td>'+data[book]['author']+'<td class=\'table_change_td\' onclick=change('+data[book]['id']+')>修 改</td><td  class=\'table_change_td\'onclick=delete_book('+data[book]['id']+')>删除</td></tr>';
									html+=temp;
									i++;
								}
								html+="</table>"
								$('#div_right_table_change_book').html(html);
					 }
				 
				 });
}
