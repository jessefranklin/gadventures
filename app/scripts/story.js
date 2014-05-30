'use strict';

//Navigation scroll intent starts here

$(document).ready(function(){

	var offsetYClimb = document.querySelector('.activities').offsetTop;

	

	function scroll () {

		if($(window).scrollTop() >= (offsetYClimb - 100 )) {
			$('.climb .quote').removeClass('bounceOut ');
			$('.climb .quote').addClass('bounceIn ');
		} else {
			$('.climb .quote').removeClass('bounceIn ');
			$('.climb .quote').addClass('bounceOut ');
		}

	}

	

	document.onscroll = scroll;
});

var z;


function scrollToAnchor(z){
    var aTag = $('.'+ z);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

$('.vertnav li').click(function() {
	z = $(this).attr('data-scrollto');
	scrollToAnchor(z);
});

var iframe;

$('.play-video').click(function(){
	iframe = document.getElementById('video');
	$(this).hide();
	$('.stop-video').show();
	//$('.intro-video').animate({opacity: 0.25}, 200)
});


$('.stop-video').click(function(){
	iframe = document.getElementById('video');
	$(this).hide();
	$('.play-video').show();
	//$('.intro-video').animate({opacity: 0.25}, 200)
});



var p = 0;
$('.btn').click(function(){
	var g = $(this).data('obj');
	if(g === 'qualifier'){
		$('.character').addClass('op');
		$('.character .text').fadeOut(function(){
			$('.'+g).addClass('fadeInRight');
			p = 1;
		});
	} else {
		$('.'+g).addClass('open');
	}
});

$('.close').click(function(){
	var g = $(this).parent('div');
	if (p === 1 ){
		$(g).removeClass('fadeInRight');
		$('.character .text').fadeIn();
		$('.character').removeClass('op');
	} else {
		$(g).removeClass('open');
	}
});


$('.btn-qualifier').click(function(){
	$('.intro-char').fadeOut(function(){
		$('.qualifier').fadeIn();
	});
	
});

var n = 0;

$('.icons-chev-right').click(function(){
	if(n !== 4){
		$(this).removeClass('op');
		n++;
		$('.v-scroll').animate({'margin-left': '-'+(n*230)+'px'}, 400);
	} else {
		$(this).addClass('op');
	}
});

var s = 0;

$('.move-this').click(function(){
	s++;

	$('.more-block-contain').fadeOut(function(){
		$('.more-block-contain').animate({'margin-left': '-'+(s*390)+'px'}, 0);
		$('.more-block-contain').fadeIn();
	});
});

$('.move-back').click(function(){
	$('.more-block-contain').fadeOut(function(){
		$('.more-block-contain').animate({'margin-left': '0px'}, 0);
		$('.more-block-contain').fadeIn();
	});
	s = 0;
});


$('.video-callout').click(function(){
	$('.character').addClass('op');
	$('.int-video').addClass('yep');
});

$('.video-close').click(function(){
	$('.int-video').removeClass('yep');
	$('.character').removeClass('op');
});

$('.icons-chev-left').click(function(){
	if(n !== 0){
		$(this).removeClass('op');
		n--;
		$('.v-scroll').animate({'margin-left': '-'+(n*230)+'px'}, 400);
	}else {
		$(this).addClass('op');
	}
});




/// Newsletter
$(document).on('click','.close', function(){
	$('.listicals').remove();
});

var total, num = 0;

function listical(x){
	num = 0;
	var y = x, z;
	$.getJSON('scripts/list.json', function(json){
		for(var i = 0; i < json.lists.length; i++){
			if(y === json.lists[i].listUid){
				z = json.lists[i];
			}
		}
		var blocks = [];
		for(var j = 0; j < z.list.length; j++){
			blocks.push('<div class="listitem">'+
							'<img src="'+z.list[j].img+'" />'+
							'<h3>'+z.list[j].title+'</h3>'+
							'<p>'+z.list[j].desc+'</p>'+
							'<p><a href="'+z.list[j].path+'">'+z.list[j].tour+'</a>'+
						'</div>');
		}
		total = z.list.length;
		$('.listers').prepend('<div class="listicals"><div class="glyphicon glyphicon-remove close"></div>'+
			'<h2>'+z.listName+'</h2><p>'+z.listDesc+'</p><div class="list-view"><div class="list-container">'+blocks.join(' ')+'</div>'+
			'<div class="btn-row"><a class="prev-slide btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span>Prev</a><a class="next-slide btn btn-default">Next<span class="glyphicon glyphicon-chevron-right"></span></a> <span class="of">Item <span class="current-num">1</span> of '+z.list.length+'</span></div></div></div>');
		$('.list-container').css('width', (410*z.list.length)+'px');
	});
}


$(document).on('click','.next-slide', function(){
	if(num !== (total-1)){
		num++;
		$('.list-container').animate({'margin-left': '-'+(num*400)+'px'}, 400);
		$('.current-num').html(num+1);
	}
});

$(document).on('click','.prev-slide', function(){
	if(num !== 0){
		num--;
		$('.list-container').animate({'margin-left': '-'+(num*400)+'px'}, 400);
		$('.current-num').html(num+1);
	}
});

$('.getlist').click(function(){
		var listid = $(this).attr('data-list');
		listical(listid);
	});



