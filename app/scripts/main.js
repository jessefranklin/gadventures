'use strict';

//Navigation scroll intent starts here
var xIntent = 0, yIntent = 0;

function hideNav(){
	if(yIntent !== 1) {
		$('.menu.sticky').addClass('hde');
	}
}


$(document).ready(function(){

	var offsetYnav = document.querySelector('.menu').offsetTop,
		offsetYSubscribe = 1200,
		scrollTimeout = null;

	function scroll () {
		if($(window).scrollTop() >= offsetYnav) {
			$('.menu').addClass('sticky');
			$('.content').addClass('ypadding');
		} else {
			$('.menu').removeClass('sticky');
			$('.content').removeClass('ypadding');
		}

		if (scrollTimeout){clearTimeout(scrollTimeout);}
		scrollTimeout = setTimeout(hideNav, 1150);

		var pos = $(window).scrollTop();
		if (xIntent > pos){
			$('.menu.sticky').removeClass('hde');
		}
		xIntent = pos;

		//This is for the subscribe newsletter flyout
		if($(window).scrollTop() >= offsetYSubscribe) {
			$('.convert').addClass('slide');
		} else {
			$('.convert').removeClass('slide');
		}
	}

	document.onscroll = scroll;
	
	$('.menu').hover( function(){
		yIntent = 1;
	}, function(){
		setTimeout(yIntent = 0, 1000);
		scroll();
	});

});
