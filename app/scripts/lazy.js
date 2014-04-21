'use strict';

var ypos = 1,
	loadScene = 3,
	ytotal = $('.stage .scene').length;

$(document).ready(function(){

	function lazyLoader(){
		var lazyOffset = document.querySelector('#carousel'+ypos).offsetTop;
		if($(window).scrollTop() > lazyOffset && loadScene <= ytotal){
			
			$('#carousel'+ loadScene + ' .carousel-inner .item img').each(function(){
				var imgLoad = $(this).attr('data-src');
				$(this).attr('src', imgLoad);
			});
		
			ypos = ypos + 1;
			loadScene  = loadScene + 1;

		}
	}
	
	document.onscroll = lazyLoader;

});


