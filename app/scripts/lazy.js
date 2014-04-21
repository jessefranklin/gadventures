'use strict';

var ypos = 1, 
	loadScene = 3;

$(document).ready(function(){

	//lazyloader
	function lazyLoader(){
		var lazyOffset = document.querySelector('#carousel'+ypos).offsetTop;
		if($(window).scrollTop() > lazyOffset){
			ypos = ypos + 1;
			loadScene  = loadScene + 1;
		}
	}
	

	document.onscroll = lazyLoader;

});


