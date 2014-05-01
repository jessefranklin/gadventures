'use strict';
var previewWidth, g, v, tsTotal, tsw, act = 0, num = 0, iframe, player;

function init(){
	$.getJSON('scripts/travelstyles.json', function(json){
		var tiles = [], t = json.travel.travelstyles, xMedia, xVideo, isVideo;
		tsTotal = json.travel.travelstyles.length;
		tsw = $('.ts-list').width();
		for(var i = 0; i < json.travel.travelstyles.length; i++){

			xMedia = '<img src="'+t[i].bgimg+'" class="imgOverlay" />';
			if(t[i].video) {
				isVideo = 'vContent';
				xVideo = '<iframe id="video'+[i]+'" src="//player.vimeo.com/video/'+t[i].video+'?api=1" width="100%" height="131%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			} else {
				isVideo = ' ';
				xVideo = ' ';
			}
			
			previewWidth = tsw <= 480 ? tsw : tsw / tsTotal;
			
			tiles.push('<li style="width:'+previewWidth+'px; left: '+(previewWidth * i)+'px" class="x'+t[i].ttl+' '+isVideo+'" data-index="'+i+'">'+
				'<a class="ts-close"></a>'+
				'<div class="media-container">'+xMedia+'</div>'+
				'<div class="video-container">'+xVideo+'</div>'+
				'<h2 class="icons-'+t[i].ttl+' title-icon" title="'+t[i].ttl+'">'+t[i].ttl+'</h2>'+
				'<div class="ts-desc"><h3>'+t[i].desctitle+'</h3>'+
				'<p>'+t[i].desc+'</p>'+
				'<p><a href="'+t[i].path+'" class="btn btn-default">View our '+t[i].ttl+' Tours</a>'+
				'</div>'+
			'</li>');
		}

		$('.ts-list').append(tiles.join(' '));
	});
}

$(document).on('click', '.ts-list.live li', function(){
	if(tsw < 480) { return false; }
	v = $(this).attr('data-index');
	g= v * previewWidth;
	$(this).addClass('active').addClass('zin');
	$('.ts-list').animate({left: '-'+g+'px'}, 400);
	$('.ts-list li.active').animate({width: '100%'}, 400);
	$('.ts-list').removeClass('live');
	act = 1;
});

$(document).on('click', '.ts-close', function(){
	var ts = $(this).parent('li'),
		im = $(this).closest('div').find('.media-container img');
	$(im).show();
	$('.video-container').hide();
	if(player){
		player = $f(iframe);
		player.api('pause');
	}
	$('.ts-list').animate({left: '0'}, 400);
	$(ts).removeClass('active').animate({ width: previewWidth+'px', left: g+'px' }, 400, function (){
		$(ts).removeClass('zin');
	});
	$('.ts-list').addClass('live');
	act = 0;
});

$(document).on('click','.ts-next', function(){
	if(num !== (tsTotal-1)){
		num++;
		$('.ts-list').animate({'margin-left': '-'+(num*tsw)+'px'}, 400);
	}
});

$(document).on('click','.vContent img', function(){
	if(act === 1){
		$(this).fadeOut(1400);
		$('.video-container').show();
		iframe = document.getElementById('video'+v);
		player = $f(iframe);
		player.api('play');
	}
});

$(document).on('click','.ts-prev', function(){
	if(num !== 0){
		num--;
		$('.ts-list').animate({'margin-left': '-'+(num*tsw)+'px'}, 400);
	}
});

$(document).ready(function(){
	init();
});


