var Numbe=20 //初始条数
var limit=Numbe; //页容量
var offset=0; //页数
var keyword='';//模糊匹配
var svtype='';//单位类型
var alarmType='';//告警类型
var total //总页数
var pullRefreshType=0;//刷新状态 0上拉刷新 1筛选 2下拉加载
var starttime=getNowFormatDate()+' 00:00:00' //开始时间
//starttime="2018"
var endtime=getNowFormatDate()+' 23:59:59' //结束时间
var ItemHeight;

//点击筛选
$('.screening').on('click',function(event){
	stopPropagation();
	$('.Mask').show().find(".screen").animate({"right":"0"},300);
	if(alarmType=='' && svtype==''){
		$('.eventStatus .mui-btn,.unitType .mui-btn').removeClass('Selection')
		$('.eventStatusSpan,.unitTypeSpan').text('')
	}else{
		$('.screen').html(ifclickSelection)
	}
	$(this).addClass('active')
})

mui(".Mask").on('tap','.screen i',function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
		if($(this).parent().parent().hasClass('unitType')){
			$('.Mask .unitType .mui-row').show()
		}else{
			$('.Mask .eventStatus .mui-row').show()
		}
	}else{
		$(this).addClass('active')
		if($(this).parent().parent().hasClass('unitType')){
			$('.Mask .unitType .mui-row').hide()
		}else{
			$('.Mask .eventStatus .mui-row').hide()
		}
	}
})

$('.screen').on('click',function(event){stopPropagation()})

$('.Mask').on('click',function(event){
	$(".screen").animate({"right":"-100%"},300,function(){
		$('.Mask').hide()
	});
})

var startX
$(".Mask").on("touchstart", function(e) {
   startX = e.originalEvent.changedTouches[0].pageX;
});
$(".Mask").on("touchend", function(e) {
   var moveEndX = e.originalEvent.changedTouches[0].pageX;
   if(moveEndX>startX+50){
     $(".Mask").find(".screen").animate({"right":"-100%"},300,function(){$(".Mask").hide()});
   }
});
//点击单位类型
$('.screen').on('click','.unitType .mui-btn',function(){
	if($(this).hasClass('Selection')){
		$(this).removeClass("Selection")
		$('.unitTypeSpan').text('')
	}else{
		$(this).addClass('Selection');
		$('.unitTypeSpan').text($(this).text())
	}
})
//点击事件状态
$('.screen').on('click','.eventStatus .mui-btn',function(){
	if($(this).hasClass('Selection')){
		$(this).removeClass("Selection")
		$('.eventStatusSpan').text('')
	}else{
		$(this).addClass('Selection');
		$('.eventStatusSpan').text($(this).text())
	}
})

//清空搜索框
function removeSearchFn () {
	$('#search').val('')
	pullRefreshType=1
	keyword='';
	limit=Numbe
	GetAlarmPageList()
}

mui.init({
  pullRefresh : {
    container:"#pullrefresh",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      auto: true,//可选,默认false.首次加载自动上拉刷新一次
      callback :callfunction //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    },
	up: {
		auto:false,//可选,默认false.自动上拉加载一次
		contentrefresh : "加载中...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		callback :pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	}
  },
});

//0上拉刷新
function callfunction() {
	pullRefreshType=0
	limit=Numbe
	setTimeout(function() {
		GetAlarmPageList()
	},1000)
}

//2下拉刷新
function pullupRefresh(){
	pullRefreshType=2
	limit=limit+Numbe;
	setTimeout(function() {
		GetAlarmPageList()
	},1000)
	
}

//关键字搜索
//关键字搜索
$("#search").on("keypress",function(e){
 var keycode = e.keyCode;  
    var searchName = $(this).val();  
    if(keycode=='13') {  
        e.preventDefault();    
        //请求搜索接口 
		pullRefreshType=1
		keyword=searchName
		limit=Numbe; //页容量
		GetAlarmPageList()
    }  
})

var ifclickSelection=''
//搜索
function okButFn(a){
	pullRefreshType=1;
	var alarmtypes='';
	var svtypes='';
	limit=Numbe; //页容量
	if(a==0){
		$('.eventStatus .mui-btn,.unitType .mui-btn').removeClass('Selection')
		$('.eventStatusSpan,.unitTypeSpan').text('')
		alarmType='';
		svtype='';
	}else{
		$(".Mask").find(".screen").animate({"right":"-100%"},300,function(){$(".Mask").hide()});
		$('.eventStatus .mui-btn.Selection').each(function(index,element){
			alarmtypes+=$(element).attr('alarmtype')+','
		})
		$('.unitType .mui-btn.Selection').each(function(index,element){
			svtypes+=$(element).attr('svtype')+','
		})
		alarmType=alarmtypes.slice(0,alarmtypes.length-1);;
		svtype=svtypes.slice(0,svtypes.length-1);;
		ifclickSelection=$('.screen').html()
	}
	//console.log(alarmtypes,svtypes)
	GetAlarmPageList()
}

function GetAlarmPageList(){
	dataAjax={
		limit:limit, //页容量
		offset:offset, //页数
		keyword:keyword,//模糊匹配
		svtype:svtype,//单位类型
		alarmstate:alarmType,//告警类型
		starttime:starttime,
		endtime:endtime,
	}
	commonAjax(dataAjax,'api/Event/GetFireAlarmPageList',GetAlarmPageListsuccFn,'get')
}
function GetAlarmPageListsuccFn (data){
	total=data.total
	var datalis=''
	$('.mui-pull-caption').show()
	mui('#pullrefresh').pullRefresh().refresh(true);
	if(pullRefreshType!=2){
		//使用的是scroll下拉刷新上啦加载  
		mui('#pullrefresh').pullRefresh().scrollTo(0,0);
	}
	if(data.rows!=null && data.rows.length!=0){
		
		for(var i=0 ; data.rows.length>i;i++){
			var dataRows=data.rows[i]
			//console.log(dataRows)
			datalis+='<div class="mui-card" index="'+i+'" id="'+dataRows.id+'" type="'+dataRows.status+'"><div class="mui-card-header">'+
					'<div><p>'+dataRows.deviceName+'<span class="mui-badge mui-badge-inverted">'+timestapFn(dataRows.creationTime)+'</span>	</p>'+
					'<p class="typeP">'+dataRows.unitName+'</p>'+
					'<p class="typeP">'+dataRows.areaName+'</p></div>'+
					'</div><div class="mui-card-content">'+
					'<div><span class="mui-badge mui-badge-inverted">'+dataRows.statement+'</span></div>'+
					'</div></div>';
		}
		if(pullRefreshType==0){
			$('.mui-table-view-chevron').empty().append(datalis)
			var a
			if(total>limit){
				a=limit
			}else{
				a=total
			}
			//mui.toast('更新了'+a+'条消息');
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //完成刷新
			
		}else if(pullRefreshType==1){
			$('.mui-table-view-chevron').empty().append(datalis)
		}else if(pullRefreshType==2){
			if(total>limit){
				//mui.toast('加载了'+Numbe+'条消息');
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);//传入false,表示还有数据
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			}else{
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			//传入true，表示没有数据，会显示init配置中：contentnomore参数
			}
			$('.mui-table-view-chevron').empty().append(datalis)
		}
		ItemHeight=$(".mui-card").height()+parseInt($('.mui-card').css("marginTop"))
	}else{
		if(pullRefreshType==2){
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		$('.mui-pull-caption').hide()
		$('.mui-table-view-chevron').empty().append('<div class="none_img">现在暂无数据</div>')
		ItemHeight=0;
	}
	if(isNaN(ItemHeight)){
		ItemHeight=$(".mui-card").height()+parseInt($('.mui-card').css("marginTop"))
	}else{
		ItemHeight=0;
	}
	//A 可视滚动区域高度  b 滚动区域离上放的距离 c滑动区域的id或者class d 总数 e卡片的高度
	scrollHeight($("#pullrefresh").height(),$("#pullrefresh").offset().top,"#pullrefresh .mui-scroll",total,ItemHeight)
}

//点击跳转到详情
mui('.mui-table-view-chevron').on('tap','.mui-card',function(){
	var url=''
	switch($(this).attr('type'))
		{
			case 'L1':
				url='CategoryAWarning_Realfirealarm'//'已处警'
				break;
			case 'L2':
				url='CategoryAWarning_Falsepositives'//'误报'
				break;
			case 'L3':
				url='CategoryAWarning_AlreadyLnPolice'//真实火警
				break;
			case 'L4':
				url='CategoryAWarning_Fireextinguished'//'已灭火'
				break;
		}
	//console.log(url)
	window.location.href="../home/detailsPage/"+url+".html?id="+$(this).attr('id');
})
