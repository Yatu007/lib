function login()
 {
		var user=$('#username')[0].value;
		var password=$('#password')[0].value;
		var code=$('#code')[0].value;
		$.ajax({
			type: "post",
			url: "/lib/index.php/Admin/Index/login",
			data:"username="+user+'&password='+password+'&code='+code,
			dataType: "json",
			error: function()//失败 
			{ 
				alert('Error loading document'); 
			},
			success: function(data)					//插入option值
			{			
								
				var temp=data['status'];
					if(temp=='success')
					{
						location.href="/lib/index.php/Admin";
					}				
			}
			 });
 }
function reset()
{
	 u$('#username')[0].value="";
	 $('#password')[0].value="";
	change_picture_code();
}
function change_picture_code()
{
	$("img").attr("src","/lib/index.php/Admin/Index/code");
}