$(function(){

	/*topbar图片滚动效果*/
	function topbarImg(){
		var page = 1;  //页面起始页
		var i_show = $("#imgshow");  //图片展示区
		var topbar = $("#topbar");
		var mask = $("#white-mask"); //蒙层
		var height = topbar.height();  //topbar图片展示区的高度
		var len = i_show.find('li').length;  //图片展示区中li的个数
		var page_count = Math.ceil(len/1);  //计算页数

		/*topbar和蒙层的背景变换*/
		var bgcss = function(id,p){		
			if(id == mask){
				id.css('background', 'url(images/in00'+p+'.jpg) no-repeat center center').fadeIn();
				$("#text"+page).fadeIn('slow');
			}else{
				mask.hide();
				$("#text"+page).hide();
				id.css('background', 'url(images/in00'+p+'.jpg) no-repeat center center');
			}
		}
		/*点击next*/
		$(".topbar-next-btn").click(function() {	
			if(!i_show.is(":animated")){
				if(page == page_count){
					i_show.animate({top:'0px'}, 'slow');
					bgcss(topbar,page); //将topbar背景图设为当前page页背景
					page = 1;
					bgcss(mask,page); //page改变，mask背景跟着改变
				}else{
					i_show.animate({top:'-='+height}, 'slow');
					bgcss(topbar,page);
					page++;
					bgcss(mask,page);
				}		
			}
		});
		/*点击prev*/
		$(".topbar-prev-btn").click(function() {
			if(!i_show.is(":animated")){
				if(page == 1){
					i_show.animate({top:'-='+height*(page_count-1)}, 'slow');
					bgcss(topbar,page); //将topbar背景图设为当前page页背景
					page = page_count;
					bgcss(mask,page); //page改变，mask背景跟着改变
				}else{
					i_show.animate({top:'+='+height}, 'slow');
					bgcss(topbar,page); //将topbar背景图设为当前page页背景
					page--;
					bgcss(mask,page); //page改变，mask背景跟着改变
				}		
			}
		});
		/*定时模拟点击*/
		if(!i_show.is(":animated")){
			setInterval(function(){
				$(".topbar-next-btn").trigger('click');
			},5000);
		}
	}

	/*菜单栏置顶的滚动条监听*/
	function menuTopScroll(){
		var menu = $(".menubar");
		$(window).scroll(function() {
			var top = document.documentElement.scrollTop || document.body.scrollTop;
			if(top >= 390){
				menu.addClass('menu-fixed-top');
			}else{
				menu.removeClass('menu-fixed-top');
			}
		});
	}

	/*search搜索框变换样式*/
	function searchFocuBlur(){
		var btn = $("#searchbtn");
		var btn_i = $("#searchbtn i");
		var input = $("#searchinput");

		input.focus(function() {
			if(!input.is(":animated")){
				btn_i.addClass('addfocus');
				$(this).animate({width: "400px"}, "fast");				
			}
		}).blur(function() {
			btn_i.removeClass('addfocus');
			$(this).animate({width: "80px"}, "fast"); //不进行动画检测，以免不响应
		});

		btn_i.mouseover(function() {
			$(this).css('color', '#333');
		}).mouseout(function() {
			$(this).css('color', '#515151');
		});
	}

	/*菜单路径高亮*/
	function menuHighlight(){
		var links = $(".menu-midbox ul a");
		for(var i=0;i<links.length;i++){
			var linkurl = links[i].getAttribute('href');
			if(window.location.href.indexOf(linkurl) != -1)
				$(links[i]).parent("li").addClass('menu-highlight');
		}
	}

	/*执行topbarImg的图片滚动动画*/
	topbarImg();
	menuTopScroll();
	searchFocuBlur();
	menuHighlight();
});