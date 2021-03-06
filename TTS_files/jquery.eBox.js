﻿ function showNoticePage(){
			 //window.open('../ttsPage/notice/Untitled-1.html','_blank');
		 }
function $_eBox(option,path,defaultVersionCookie){
        var defaults={
	        size:{width:403,height:254,padding:0,borderWidth:"1px"},
		    title:{show:true,html:"标题"},
		    content:{url:false,html:"内容"},
		    skin:path+"css/eBox/eBox.css",
		    //skin:"http://localhost:8080/tts8/script/css/eBox/default/eBox.css",
			minButton:true,
			openOnce:true,
			effect:{type:"fade",speed:"normal"}
	     };		 
		 if(option)$.extend(true,defaults,option);
		 //
		 function writeCookie(name, value,keepTime) {
                 var expiresDate = new Date();
                 expiresDate.setTime(expiresDate.getTime() + keepTime);
                 var cookieStr = name + "=" + escape(value) + ";expires=" + expiresDate.toGMTString();
                 document.cookie = cookieStr;
         };
         function readCookie(name) {
                 var cookieStr = document.cookie;
                 var cookieArr = cookieStr.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                 if (cookieArr != null) return unescape(cookieArr[2]); return null;
         };
	     if(defaults.openOnce && readCookie("eBoxOpen"+defaultVersionCookie))return;	
		 //
		 $("<link rel=\"stylesheet\" title=\"eBoxSkin\" />").appendTo($("head")).attr("href",defaults.skin);
		 //
		 $("<div></div>").prependTo($("body")).attr("id","eBoxWrap").css("display","none");
		 var eBoxWrap=$("#eBoxWrap");	 
		 if(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1){
		     var origBottom=$("body").height()-$(window).height();	
			 var origRight=$("body").width()-$(window).width();
			 eBoxWrap.css({position:"absolute",bottom:origBottom,right:origRight});
			 $("body").css({position:"relative"});
			 $(window).scroll(function(){
			       eBoxWrap.css({bottom:$("body").height()-$(window).height()-$(window).scrollTop(),right:$("body").width()-$(window).width()-$(window).scrollLeft()});
			 });
			 $(window).resize(function(){
			       eBoxWrap.css({bottom:$("body").height()-$(window).height()-$(window).scrollTop(),right:$("body").width()-$(window).width()-$(window).scrollLeft()});
			 });
		 }else{
		     eBoxWrap.css({"position":"fixed",bottom:"0px",right:"0px"});			 
		 }
		 eBoxWrap.css({zIndex:"999",overflow:"hidden",width:defaults.size["width"],height:defaults.size["height"],padding:defaults.size["padding"],borderWidth:defaults.size["borderWidth"],background:"#fff"});
		 //
		 $("<div></div>").prependTo(eBoxWrap).attr({"id":"eBox","class":"eBox-"+new Date().getTime()}).css("position","relative");
	     var myBox=$("#eBox");
		 //
		 if(defaults.title["show"]){
		    $("<h6></h6>").prependTo(myBox).attr("class","eBox-title").html(defaults.title["html"]);
			var myBoxTitle=myBox.children("h6.eBox-title");
		 }else{
		    defaults.minButton=false;
		 }
		 //
		
//		 var skinPath="../script/"+defaults.skin.match(/[^\/]*\/?eBox\/[^\/]+\//);
         $("<span></span>").prependTo(myBox).attr("class","eBox-close").append("<img onclick='showNoticePage()' alt=\"\" src=\""+path+"css/eBox/"+"close.gif\" />").css("position","absolute");		 
		 //bind event
		 myBox.children("span.eBox-close").children("img").bind("click",function(){
		        setWinStatu("hide");			
		 });
		 if(defaults.minButton){
		    $("<span></span>").prependTo(myBox).attr("class","eBox-min").append("<img  alt=\"\" src=\""+path+"css/eBox/"+"min.gif\" />").css("position","absolute");
		    myBox.children("span.eBox-min").children("img").click(function(){
			     var me=$(this);
				 if(!eBoxWrap.is(":animated") && eBoxWrap.height()==defaults.size["height"]){
				      eBoxWrap.animate({height:myBoxTitle.outerHeight()-parseInt(myBoxTitle.css("borderBottomWidth"))},function(){
					        me.attr("src",path+"css/eBox/"+"max.gif");
					  });
				 }else{
				     eBoxWrap.animate({height:defaults.size["height"]},function(){
					        me.attr("src",path+"css/eBox/"+"min.gif");
					 });
				 }
		    });	
		 };
		 //
		 $("<div></div>").appendTo(myBox).attr("class","eBox-content");
		 var myBoxContent=myBox.children("div.eBox-content");
		 //
		 if(defaults.content["url"]){
		     myBoxContent.css("position","relative");
			 $("<img />").appendTo(myBoxContent).attr({"src":path+"css/eBox/"+"load.gif","class":"eBox-load"});
			 myBoxContent.load(defaults.content["url"]);
		 }else{
		     myBoxContent.html(defaults.content["html"]);
		 }
		 setWinStatu("show");
		 writeCookie("eBoxOpen"+defaultVersionCookie,"true",3600*1000);
		 function setWinStatu(flag){
		  switch(defaults.effect["type"]){
		    case "slide":
			if(flag=="show")
			  eBoxWrap.slideDown(defaults.effect["speed"]);
		    else if(flag=="hide")
			  eBoxWrap.slideUp(defaults.effect["speed"],function(){
			      removeWin(); 
			  }); 
			break;
			case "fade":
			if(flag=="show")
			  eBoxWrap.fadeIn(defaults.effect["speed"]);
		    else if(flag=="hide")
			  eBoxWrap.fadeOut(defaults.effect["speed"],function(){
			      removeWin();
			  }); 
			break;
			case "show":
			if(flag=="show")
			  eBoxWrap.show(defaults.effect["speed"]);
		    else if(flag=="hide")
			  eBoxWrap.hide(defaults.effect["speed"],function(){
			      removeWin();
			  });
			break;
		   }
		   function removeWin(){
		          $("link[title='eBoxSkin']").remove();
				  eBoxWrap.empty().remove(); 
		   };
		}	        		
	  } 