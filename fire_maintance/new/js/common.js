var resourceUrl='';
var token='eyJhbGciOiJSUzI1NiIsImtpZCI6ImIzZDE3MGZiMjM2MzQ2MTkxZWI0ZTllNjBjMTIxNDMzIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NjE0NDI2MjMsImV4cCI6MTU2MTUyOTAyMywiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo1MDAyIiwiYXVkIjpbIldlU2FmZSIsImh0dHA6Ly8xMjcuMC4wLjE6NTAwMi9yZXNvdXJjZXMiXSwiY2xpZW50X2lkIjoiZmlyZURlcGFydG1lbnQtZnJvbnQiLCJzdWIiOiIyIiwiYXV0aF90aW1lIjoxNTYxNDQyNjIzLCJpZHAiOiJsb2NhbCIsInRlbmFudCI6IjEiLCJyb2xlcyI6IkFkbWluIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSJdfQ.NX2dc2xHlL_uEW7e3Ip46LBR7iKbeqJMiW4xgkigbWRd9wPyuY7qbLm1hxgyxypzlyamaAjpEGu_ALC3JuDR9bgaVoemzi0LUGKgS3kAQ36mbbeVT_HUI9XVxWRHvGpBiQDAb312YUX5w5LnwL30dSN319VnnUUsV77oqecOKI6Biu50cpAQ-36CjV_aXC_SICTRyte0WtlGgbZ2YoFRDNeykRaEx2lKye6XANwFQ-cqMbZxD5Qsw3pxcxg1BKE2quCrQCVo2-YKbSe-CxWnAeq4mX2Jaba07sUbytLZDCY6IgQOC4-A-gebwv0WxGfIAU9hHE12vZwScR54tmPmDA.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwic3ViIjoiMiIsInRlbmFudCI6IjEiLCJqdGkiOiIxNzQwY2ZmZC0xM2I2LTQzOTEtOGU4NC05NGQwODI1MzI2MTEiLCJpYXQiOjE1NjA4MjI5OTcsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiXSwiY2xpZW50X2lkIjoiYXBwY2VudGVyIiwibmJmIjoxNTYwODIyOTk3LCJleHAiOjE1NjM0MTQ5OTcsImlzcyI6Imh0dHA6Ly8yMTEuMTM3LjY4LjExODozMDE2MCIsImF1ZCI6Imh0dHA6Ly8yMTEuMTM3LjY4LjExODozMDE2MC9yZXNvdXJjZXMifQ.DVc9E7cd_pmrZabMp6aexpviMFDU60Yw_pLVI_nTQoAx4-O_eTQP9s3XsoeZDUSCHYOuxtVd4Zp4W7Hw0Tlblk_4bFS3Hi2gEwQ6FhSIp2pjvhZopQvu3gCMKR2HOtM3ieOG-0ZDZ0aWM4oCSpGlUlBDYm6GTJGAt9gxaLAEWDfZETfRrtFiytZiwVnk-zOUUCCzf7UOXKvMXiBKAL9Gu4NrwekSGTJvQ5RrecXrQVSPGWomI02FE1udWLuKwSOIm7N1MXgNzCGlBIATtI8t-UZoTCie-D-dENB0fwbiQHPUQ8rJ6bL2dShDbPSdSzjiWfgtPT_rNumdjDsb6yxp6Q'
function commonAjax (datas,url,successFn,type){
		if(resourceUrl==''){
			$.ajax({  
						type : 'get',  //提交方式  
						url : 'http://172.16.93.93:5002/appcenter/configinfo',//路径
						data :'',//数据，这里使用的是Json格式进行传输  
						contentType: "application/json",
						dataType: 'json',
						xhrFields:{
			           'Access-Control-Allow-Origin': '*'
			       },
						success: function(data){
							for(var i=0 ; data.package.length>i;i++){
								var dataPackage=data.package[i]
								if(dataPackage.id=='fireDepartmentWebApi'){
									//console.log(dataPackage)
									resourceUrl=dataPackage.resourceUrl
									 $.ajax({
												type : type,  //提交方式  
												url : resourceUrl+url,//路径
												data :datas,//数据，这里使用的是Json格式进行传输  
												contentType: "application/json",
												dataType: 'json',
												xhrFields:{
									           'Access-Control-Allow-Origin': '*'
												},
												beforeSend: function (XMLHttpRequest) {
													XMLHttpRequest.setRequestHeader("Authorization", token);
												},
												success: successFn,
												error:function(){
													console.log('请求失败！')
												}
											});
								}
							}
						},
						error:function(){
							console.log('请求失败！')
						}
					});  
		}else{
			 $.ajax({
					type : type,  //提交方式  
					url : resourceUrl+url,//路径
					data :datas,//数据，这里使用的是Json格式进行传输  
					contentType: "application/json",
					dataType: 'json',
					xhrFields:{
						'Access-Control-Allow-Origin': '*'
					},
					beforeSend: function (XMLHttpRequest) {
						XMLHttpRequest.setRequestHeader("Authorization", token);
					},
					success: successFn,
					error:function(){
						console.log('请求失败！')
					}
				});
		}
}

/* 获取href后传参 */
function getQueryVariable() {
  var query = window.location.search.substring(1);
  var vars = query.split("&")
  var json = {}
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    json[pair[0]] = decodeURI(pair[1])
  }
  return json
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

/* 计算时间差 */
function timestapFn(data){
	var a = new Date(data).getTime()
	var b = new Date().getTime()
	var c=b-a
	var days = parseInt(c / (1000 * 60 * 60 * 24));
    var hours = parseInt(c / (1000 * 60 * 60));
    var minutes = parseInt((c % (1000 * 60 * 60)) / (1000 * 60));
    //var seconds = (c % (1000 * 60)) / 1000;
    // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 "
	//return hours + " 小时 " + minutes + " 分钟 "
	if(hours==0){
		return minutes + " 分钟前"
	}else{
		return hours + " 小时前"
	}
}

//阻止冒泡方法
function stopPropagation(e) {  
	e = e || window.event;  
	if(e.stopPropagation) { //W3C阻止冒泡方法  
		e.stopPropagation();  
	} else {  
		e.cancelBubble = true; //IE阻止冒泡方法  
	}  
}

$(".back-top").click(function(){
 if(mui('#pullrefresh').length==0){
	  mui('#refreshContainer').pullRefresh().scrollTo(0,0);
 }else{
	  mui('#pullrefresh').pullRefresh().scrollTo(0,0);
 }
})

/*$(".back-top").click(function(){
	mui('#refreshContainer').pullRefresh().scrollTo(0,0);
})*/

//A 可视滚动区域高度  b 滚动区域离上放的距离 c滑动区域的id或者class d 总数 e卡片的高度
 function scrollHeight(A,b,c,d,e){
 	var MoveHeight;
 	var timeout = null;
 	$(".all-num").text(d);
 	$(".now-num").text(Math.ceil(A/e));
 	if(Math.ceil(A/e)>d){
 		$(".now-num").text(d);
 	}
 	if(d>999){
 		$(".all-num").text("999+");
 	}
 	$(c).scroll(function(){
	 	if(timeout != null){
	     	window.clearTimeout(timeout);//取消延迟滚动
		}
		$('.data-num').show()
		$('.back-top-icon').hide()
		//500ms后，假定认为停止滚动
		timeout = window.setTimeout(function(){
			$('.data-num').hide()
			$('.back-top-icon').show()
		},1000);
		MoveHeight=$(c).offset().top;
		if(d<Math.ceil(A/e)){
	 		$(".now-num").text(d);
	 	}
	 	else if(d>Math.ceil(A/e)){
	 		//$(".back-top-icon").hide();
	 		$(".back-top p").show();
	 		if(MoveHeight>0){
		 		$(".now-num").text(Math.ceil((b-MoveHeight+A)/e))
		 	}else{
		 		MoveHeight=Math.abs(MoveHeight)+b;
		 		if(Math.ceil((MoveHeight+A)/e)>d&&Math.ceil((MoveHeight+A)/e)<999){
		 			$(".now-num").text(d)
		 		}else if(Math.ceil((MoveHeight+A)/e)>999){
		 			$(".now-num").text("999+");
		 		}else{
		 			$(".now-num").text(Math.ceil((MoveHeight+A)/e))
		 		}
		 		
		 	}
	 	}
 	})
 }