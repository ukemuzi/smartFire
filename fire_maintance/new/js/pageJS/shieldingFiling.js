var clickif=true
var pullRefreshType=0//刷新状态 0上拉刷新 1筛选 2下拉加载
var Numbe=20 //初始条数
var limit=Numbe; //页容量
var offset=0; //页数
var keyword=''//模糊匹配
var svtype='' //单位类型
var status='' //屏蔽状态
var ifclickSelection
var starttime=getNowFormatDate()+' 00:00:00' //开始时间
var endtime=getNowFormatDate()+' 23:59:59' //结束时间
//starttime="2018"
var ItemHeight;

//点击筛选
$('.screening').on('click',function(event){
	stopPropagation();
	$('.Mask').show().find(".screen").animate({"right":"0"},300);
	if(status=='' && svtype==''){
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
	GetMonitorSignalList()
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
  }
});

//0上拉刷新
function callfunction() {
	pullRefreshType=0
	limit=Numbe
	setTimeout(function() {
		GetMonitorSignalList()
	},1000)
}

//2下拉刷新
function pullupRefresh(){
	pullRefreshType=2
	limit=limit+Numbe;
	setTimeout(function() {
		GetMonitorSignalList()
	},1000)
	
}

//关键字搜索
$("#search").on("keypress",function(e){
 var keycode = e.keyCode;  
    var searchName = $(this).val();  
    if(keycode=='13') {  
        e.preventDefault();    
        //请求搜索接口 
		pullRefreshType=1
		keyword=searchName
		limit=Numbe
		GetMonitorSignalList() 
    }  
})

var ifclickSelection=''
//确认筛选
function okButFn(a){
	pullRefreshType=1;
	var svtypes='';
	var statuss='';
	limit=Numbe
	if(a==0){
		$('.eventStatus .mui-btn,.unitType .mui-btn').removeClass('Selection')
		$('.eventStatusSpan,.unitTypeSpan').text('')
		svtype='';
		status='';
	}else{
		$(".Mask").find(".screen").animate({"right":"-100%"},300,function(){$(".Mask").hide()});
		$('.eventStatus .mui-btn.Selection').each(function(index,element){
			statuss+=$(element).attr('status')+','
		})
		$('.unitType .mui-btn.Selection').each(function(index,element){
			svtypes+=$(element).attr('svtype')+','
		})
		svtype=svtypes
		status=statuss
		ifclickSelection=$('.screen').html()
	}
	GetMonitorSignalList()
	// console.log(svtype,status)
}

function GetMonitorSignalList(){
	dataAjax={
		limit:limit, //页容量
		offset:offset, //页数
		keyword:keyword,//模糊匹配
		starttime:starttime,
		endtime:endtime,
		svtype:svtype,
		status:status
	}
	commonAjax(dataAjax,'api/Device/GetMonitorSignalList',GetMonitorSignalListsuccFn,'get')
}
function GetMonitorSignalListsuccFn (data) {
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
			var date=dataRows.startTime.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
			//console.log(dataRows.date)
			datalis+='<div class="mui-card" id="'+dataRows.sequenceNumber+'"><div class="mui-card-header"><div><p>'+
					''+dataRows.tenantName+'<span>'+timestapFn(date)+'</span>'+
					'</p><p class="typeP">点位屏蔽数：'+dataRows.currentPointCount+'/'+dataRows.totalPointCount+'</p></div></div><div class="mui-card-content">';
			var status=''
			switch(dataRows.status){
				case 5:
					status='屏蔽中'
					break;
				case 6:
					status='逾期恢复'
					break;
				case 7:
					status='已逾期'
					break;
				case 8:
					status='已恢复'
					break;
			}
			datalis+='<div><span class="mui-badge mui-badge-inverted">'+status+'</span>'+
					'</div></div></div>';
		}
		if(pullRefreshType==0){
			$('.mui-table-view-chevron').empty().append(datalis)
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
		var px = $('.mui-card').css("marginTop")+$('.mui-card').css("paddingTop")
		var h=$('#pullrefresh').height()
		var h2=$('.mui-card').height()+parseInt(px)+1
		var h3=$('#pullrefresh').offset().top;
		//scrollHeight(h,h3,'.mui-scroll',total,'.mui-table-view',h2)
		//scrollHeight(h,h2,'.mui-card',total)
		ItemHeight=$(".mui-card").height()+parseInt($('.mui-card').css("marginTop"))
	}else{
		if(pullRefreshType==2){
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
		$('.mui-pull-caption').hide()
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		$('.mui-table-view-chevron').empty().append('<div class="none_img">现在暂无数据</div>');
		ItemHeight=0;
	}
	if(isNaN(ItemHeight)){
		ItemHeight=$(".mui-card").height()+parseInt($('.mui-card').css("marginTop"))
	}else{
		ItemHeight=0;
	}
	scrollHeight($("#pullrefresh").height(),$("#pullrefresh").offset().top,"#pullrefresh .mui-scroll",total,ItemHeight)
}
//点击跳转到详情
mui('.mui-table-view-chevron').on('tap','.mui-card',function(){
	window.location.href="../home/details/ShieldingDetails.html?id="+$(this).attr('id');
})
