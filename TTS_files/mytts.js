function getDateNum(str){
	var num = 0;
	var strArray = str.split("_");
	var beginDateStr = strArray[0];
	var redressNum = strArray[1];
	var beginDate = new Date(beginDateStr);
	var days=Math.floor((new Date(strArray[2]).getTime()-beginDate.getTime())/(24*3600*1000))
	var beginWeekIndex = beginDate.getDay();
	var nowWeekIndex = new Date(strArray[2]).getDay();
	if(nowWeekIndex-beginWeekIndex == days){
		num = days;
	}else{
		num = 5-beginWeekIndex;
		days = days -7 + beginWeekIndex;
		num = num + Math.floor(days/7)*5;
		if(days % 7 <5){
			num = num + days % 7;
		}else{
			num = num + 5;
	    }
	}
	
	getClear(num+parseInt(redressNum));
}
function getClear(num){
	num = num +5-num%5;
	var liArray = $('.col-960').children('.course-list').children('.course-menu').children().children();
	for(var i=num;i<liArray.length;i++){
		var li=liArray[i];
		$(li).removeClass("opened");
	}
}
$(document).ready(function() {
	var versionCode=$("#version").val();
	$.ajax({
		type: "post", 
		url: TTS_URL+"studentCenter/getStuBaseMsg", 
		dataType: "json",
		data:{"versionCode":versionCode},
  		success: function (data) {
  			if(data.code>0){
  				var stuList=data.list;
  				var stu=stuList[0];
  				var beginDateString = stu.beginDateString;
  				var redress = stu.redress;
  				var now = stu.nowDateStr;
  				var str = beginDateString+"_"+redress+"_"+now;
  				$("#classStartTime").html(stu.beginDateString);
  				$("#pmName").html(stu.projectManager);
  				$("#classTeacherName").html(stu.classCharge);
  				getDateNum(str);
  			}
    	}, 
   		error: function (XMLHttpRequest, textStatus, errorThrown) { 
   			console.debug("取出教历进度错误");
		}
	});
});
function startStudy(){
	var list = $('li.opened');
	var name = list.eq(list.length-1).closest('.course-list').prev().children('a').attr('name');
	location.href = "#"+name;
}
$('body').append('<script src="'+TTS_URL+'private/ttsfront/js/jquery.eBox.js"></script>')
/*获取学员公告信息*/
var courseName_ = $.cookie("courseCookie");
var defaultVersionCookie = $.cookie('defaultVersionCookie');
$.ajax({
	url:TTS_URL + 'notice/getNotice',
	dataType : 'json',
	data : { courseName : courseName_ },
	success : function(d) {
		if(d.list != '') {
			  var html ='<div style="float: right;position:relative;top: 6px;display:inline-block;"><img src="'+ TTS_URL +'private/ttsfront/img_17/img_menu/gril.png" width="120px" height="200px"></div>'
            	+'<div style="float: left;position:relative;right: -15px;top: 11px;display:table;width:240px;height:200px;"> <div style="display:table-cell;vertical-align:middle;text-indent: 2em;line-height: 1.5;font-family: &quot;微软雅黑&quot;;font-size: 13px;">'+d.list[0].noticeContent+'</div></div>';
          	$_eBox({
                  title : { html : " &nbsp;&nbsp;&nbsp;&nbsp"+d.list[0].noticeTitle },
                  content : { html : html},
                  effect : {
                      type : "slide",
                      speed : 500,
                  },
                  openOnce : true
              },
              TTS_URL + "private/ttsfront/",
              defaultVersionCookie
              );
		}
	}
	
})
