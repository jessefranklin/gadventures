'use strict';
var previewWidth;

function init(){

	$.getJSON('scripts/travelstyles.json', function(json){
		var tiles = [], t = json.travel.travelstyles, xMedia, tsTotal = json.travel.travelstyles.length;

		for(var i = 0; i < json.travel.travelstyles.length; i++){

			xMedia = '<img src="'+t[i].bgimg+'" />';
			
			previewWidth = $('.ts-list').width() < 480 ? $('.ts-list').width() : 100 / tsTotal;
			tiles.push('<li style="width:'+(previewWidth / 2)+'%;" data-index="'+i+'">'+
				'<a class="ts-close">X</a>'+
				'<div class="media-container">'+xMedia+'</div>'+
				'<h2 class="icons-'+t[i].ttl+'-logo title-icon" title="'+t[i].ttl+'">'+t[i].ttl+'</h2>'+
				'<div class="ts-desc"><h3>'+t[i].desctitle+'</h3>'+
				'<p>'+t[i].desc+'</p>'+
				'<p><a href="'+t[i].path+'">View our '+t[i].ttl+' Tours</a>'+
				'</div>'+
			'</li>');
		}

		$('.ts-list').append(tiles.join(' '));
	});
}
var g, s;
$(document).on('click', '.ts-list.live li', function(){
	g= ($(this).attr('data-index')) * previewWidth;
	s = previewWidth / 2;
	$(this).addClass('active');
	$('.ts-list').animate({left: '-'+g+'%'}, 300);
	$('.ts-list li.active').animate({width: '50%'}, 400);
	$('.ts-list').removeClass('live');
});

$(document).on('click', '.ts-close', function(){
	var ts = $(this).parent('li');
	
	$('.ts-list').animate({left: '0'}, 400);
	$('.ts-list li.active').animate({ width: s+'%'}, 400);
	$(ts).removeClass('active');
	$('.ts-list').addClass('live');
});



$(document).ready(function(){

	init();

});