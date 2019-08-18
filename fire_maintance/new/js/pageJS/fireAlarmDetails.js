var urlParameter=getQueryVariable()

//拨号
mui(".callPhone").on('tap','#callPhone',function(){
    let btnArray = ['拨打', '取消']; 
    let Phone = $(this).attr('phone'); 
           window.location.href="tel:"+Phone
}) 
mui(".videoSurveillance").on('tap','.mui-card-header .mui-icon',function(){
	$(".screening-tc").show().find('.tc-center').animate({"right":"0"},300);
	 //GetAlarmCamerasFn()
})

mui(".screening-tc").on('tap','.title i',function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
		$('.screening-tc .mui-scroll-wrapper').show()
	}else{
		$(this).addClass('active')
		$('.screening-tc .mui-scroll-wrapper').hide()
	}
})

$('.tc-center').on('click',function(event){stopPropagation()})

$('.screening-tc').on('click',function(event){
	$(".tc-center").animate({"right":"-100%"},300,function(){
		$('.screening-tc').hide()
	});
})

var startX
$(".screening-tc").on("touchstart", function(e) {
   startX = e.originalEvent.changedTouches[0].pageX;
   
});
$(".screening-tc").on("touchend", function(e) {
   var moveEndX = e.originalEvent.changedTouches[0].pageX;
   if(moveEndX>startX+50){
     $(".screening-tc").find(".tc-center").animate({"right":"-100%"},300,function(){$(".screening-tc").hide()});
   }
});

//选择视频
$('.tc-center').on('click','.level-list .mui-btn',function(event){
	if($(this).hasClass('Selection')){
		$(this).removeClass("Selection")
		$('.VideoSurveillance').text('')
	}else{
		$(this).addClass('Selection').parent().siblings().find('.mui-btn').removeClass("Selection");
		$('.VideoSurveillance').text($(this).text())
	}
})

//切换告警日志与火场文书
$('.TitleSelection li').on('click',function(){
	$(this).addClass('active').parent().siblings().find('li').removeClass('active')
	if($(this).attr('type')==1){
		$('.alarmLog').hide()
		$('.fireDocuments').show()
	}else{
		$('.fireDocuments').hide()
		$('.alarmLog').show()
	}
})

//清空搜索框
function removeSearchFn(){
	$('#search').val('')
}

//搜索
function okButFn(a){
	if(a==0){
		$('.tc-center .level-list .mui-btn').removeClass('Selection')
		$('.VideoSurveillance').text('')
	}else{
		$(".screening-tc").find(".tc-center").animate({"right":"-100%"},300,function(){$(".screening-tc").hide()});
	}
}

GetFireAlarmEventlogsFn();

function GetFireAlarmEventlogsFn() {
	dataAjax={
		alarmId:urlParameter.id
		//alarmId:'908ea01516234c8a911b1d68c8cff2f3',
	}
	commonAjax(dataAjax,'api/Event/GetAlarmInfoById',GetFireAlarmEventlogssuccFn,'get')
}
function GetFireAlarmEventlogssuccFn(data){
	//地址板块
	if(data.unitDetail !=null){
		$('.position .company').text(data.unitDetail.unitName)
		$('.position .companyIp').text(data.unitDetail.unitAddress)
		$('.position #fireControlJurisdiction').text(data.unitDetail.fireControlJurisdiction)
		$('.position #supervisorsResponsible').text(data.unitDetail.supervisorsComanagement+','+data.unitDetail.supervisorsResponsible)
		$('.position #unitTypeInfo').text(data.unitDetail.unitTypeInfo)
		$('.position #unitAttribute').text(data.unitDetail.unitAttribute)
		$('.position #totalBuildingArea').text(data.unitDetail.totalBuildingArea)
		$('.position #fireControlRoomLocationInfo').text(data.unitDetail.fireControlRoomLocationInfo)
		//电话板块
		var callPhoneLis='';
		for (var i=0 ; data.unitDetail.safetyPersonList.length>i ; i++) {
			var safetyPersonListData=data.unitDetail.safetyPersonList[i]
			callPhoneLis+='<div id="callPhone" class="mui-col-sm-12 mui-col-xs-12" phone="'+safetyPersonListData.phone+'"><div class="safetyManager">'+
						'<div><p>消防安全管理人：<span>'+safetyPersonListData.name+'</span></p><p><a>'+safetyPersonListData.phone+'</a></p>'+
						'</div><i></i></div></div>';
		}
		$('.callPhone .mui-row').append(callPhoneLis)
		
		//应急预案
		var archival='';
		if(data.unitDetail.archivalList!=null && data.unitDetail.archivalList.length !=0){
			for(var i=0 ;data.unitDetail.archivalList.length>i;i++){
				var dataArchival=data.unitDetail.archivalList[i]
				archival+='<li class="mui-table-view-cell"><a class="mui-navigate-right">'+dataArchival.archivalName+'</a></li>';
			}
			$('#archival .mui-table-view').append(archival)
		}
	}
	
	//可视化
	var visualization='';
	if(data.planeMaps!=null && data.planeMaps.length !=0){
		for(var i=0 ;data.planeMaps.length>i;i++){
			var dataAfficeAreas=data.planeMaps[i]
			visualization+='<li class="mui-table-view-cell"><a class="mui-navigate-right" id="'+dataAfficeAreas.id+'">'+dataAfficeAreas.fullName+'</a></li>';
		}
		$('.visualization .mui-table-view').append(visualization)
	}
	//告警日志
	var alarmLogLis='';
	var indexArr=[];
	var timeArr=[];
	if(data.logs!=null && data.logs.length !=0){
		for(var i=0 ;data.logs.length>i;i++){
			var dataLogs=data.logs[i];
			var month=dataLogs.logDate.split(" ")[0].substring("5"); //月日
			var time=dataLogs.logDate.split(" ")[1].substring("0","5"); //时分
			var a=jQuery.parseJSON(dataLogs.logDetail)
			//console.log(a)
			alarmLogLis+='<div class="item clearfix"><div class="clearfix"><div class="fl"><i class="state-icon"></i>'+
						'<div class="data">'+month+'</div><div class="time">'+time+'</div></div><div class="fr"><div class="state">'+a.logType+'</div>';
			
			
			if(a.keyValues!=null && a.keyValues.length !=0){
				alarmLogLis+='<div class="info-list">';
				//console.log(a.keyValues)
				for(var s=0 ;a.keyValues.length>s;s++){
					alarmLogLis+='<div>'+a.keyValues[s].key+'：<span class="color-gray">'+a.keyValues[s].value+'</span></div>';
				}
			}
			if(a.photos!=null && a.photos.length !=0){
				alarmLogLis+='<div class="img-box clearfix">';
				//console.log(a.keyValues)
				for(var s=0 ;a.photos.length>s;s++){
					alarmLogLis+='<img data-preview-src="" data-preview-group="1"  src="'+resourceUrl+'api/Public/DownLoadFile?FileName='+a.photos[s]+'" alt="">';
				}
				alarmLogLis+='</div>';
			}
			alarmLogLis+='</div></div></div></div></div>';

			if(i>0&&i<data.logs.length&&data.logs[i].logDate.substring("0",'4')!=data.logs[i-1].logDate.substring("0",'4')){
				indexArr.push(i-1);
				timeArr.push(data.logs[i-1].logDate.substring("0",'4'));
				//$(".alarmLog .item").eq(i-1).find(".clearfix").append("<div class='cancel-time'>"+data.logs[i-1].logDate.substring("0",'4')+"</div>");
			}
		}
		$('.alarmLog').append(alarmLogLis);
		for(var j=0;j<timeArr.length;j++){
			$('.alarmLog .item').eq(indexArr[j]).find(".clearfix").append("<div class='cancel-time'>"+timeArr[j]+"</div>")
		}
	}
	//火场文书
	var fireworksLis='';
	if(data.fireworks!=null && data.fireworks.length !=0){
		for(var i=0 ;data.fireworks.length>i;i++){
			var dataLogs=data.fireworks[i];
			var month=dataLogs.logDate.split(" ")[0].substring("5"); //月日
			var time=dataLogs.logDate.split(" ")[1].substring("0","5"); //时分
			var a=jQuery.parseJSON(dataLogs.logDetail)
			//console.log(a)
			fireworksLis+='<div class="item clearfix"><div class="clearfix"><div class="fl"><i class="state-icon"></i>'+
						'<div class="data">'+month+'</div><div class="time">'+time+'</div></div><div class="fr"><div class="state">'+a.LogType+'</div>';
			if(a.KeyValues!=null && a.KeyValues.length !=0){
				fireworksLis+='<div class="info-list">';
				//console.log(a.keyValues)
				for(var s=0 ;a.KeyValues.length>s;s++){
					fireworksLis+='<div>'+a.KeyValues[s].Key+'';
					if(a.KeyValues[s].Value!=null){
						fireworksLis+='<span class="color-gray">：'+a.KeyValues[s].Value+'</span>';
					}
					fireworksLis+='</div>';
				}
			}
			if(a.Photos!=null && a.Photos.length !=0){
				fireworksLis+='<div class="img-box clearfix">';
				for(var s=0 ;a.Photos.length>s;s++){
					fireworksLis+='<img data-preview-src="" data-preview-group="1"  src="'+resourceUrl+'api/Public/DownLoadFile?FileName='+a.Photos[s]+'" alt="">';
				}
				fireworksLis+='</div>';
			}
			fireworksLis+='</div></div></div></div></div>';
		}
		$('.fireDocuments').append(fireworksLis)
	}
	mui.previewImage();
}
// //告警视频搜索接口
// var keyword=''
// function GetAlarmCamerasFn(){
// 	dataAjax={
// 		larmId:urlParameter.id
// 		//alarmid:'c507a7f2f86547d386979c97917fc46f',
// 		keyword:keyword
// 	}
// 	commonAjax(dataAjax,'api/Event/GetAlarmCameras',GetAlarmCamerasssuccFn,'get')
// }

function GetAlarmCamerasssuccFn(data){
	
}

//筛选视频
function oninputFn (t){
	keyword=t.value
	GetAlarmCamerasFn()
}

//清空搜索框
function removeSearchFn () {
	$('#search').val('')
	keyword='';
	GetAlarmCamerasFn()
}
