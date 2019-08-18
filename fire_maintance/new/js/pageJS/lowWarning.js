var Numbe=20 //初始条数
var limit=Numbe; //页容量
var offset=0; //页数
var keyword='';//模糊匹配
var svtype='';//单位类型
var starttime=getNowFormatDate()+' 00:00:00' //开始时间
var endtime=getNowFormatDate()+' 23:59:59' //结束时间
//starttime="2018"
var ItemHeight;

//点击筛选
$('.screening').on('click',function(event){
	stopPropagation();
	$('.Mask').show().find(".screen").animate({"right":"0"},300);
	if(svtype==''){
		$('.unitType .mui-btn').removeClass('Selection')
		$('.unitTypeSpan').text('')
	}else{
		$('.screen').html(ifclickSelection)
	}
	$(this).addClass('active')
})

mui(".Mask").on('tap','.screen i',function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
		$('.Mask .unitType .mui-row').show()
	}else{
		$(this).addClass('active')
		$('.Mask .unitType .mui-row').hide()
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

//清空搜索框
function removeSearchFn () {
	$('#search').val('')
	keyword='';
}

//关键字搜索
//关键字搜索
$("#search").on("keypress",function(e){
 var keycode = e.keyCode;  
    var searchName = $(this).val();  
    if(keycode=='13') {  
        e.preventDefault();    
        //请求搜索接口 
		keyword=searchName
    }  
})


var ifclickSelection=''
//搜索
function okButFn(a){
	var svtypes='';
	if(a==0){
		$('.unitType .mui-btn').removeClass('Selection')
		$('.unitTypeSpan').text('')
		svtype='';
	}else{
		$(".Mask").find(".screen").animate({"right":"-100%"},300,function(){$(".Mask").hide()});
		ifclickSelection=$('.screen').html()
		$('.unitType .mui-btn.Selection').each(function(index,element){
			svtypes+=$(element).attr('svtype')+','
		})
		svtype=svtypes;//单位类型
		//console.log(svtype)
	}
}