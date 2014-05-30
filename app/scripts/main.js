'use strict';

//Navigation scroll intent starts here
var xIntent = 0, yIntent = 0;

function hideNav(){
	if(yIntent !== 1) {
		$('.menu.sticky').addClass('hde');
	}
}

var parallax = document.getElementById('para'),
	speed = -4;

$(document).ready(function(){

	var offsetYnav = document.querySelector('.menu').offsetTop,
		offsetYSubscribe = 1200,
		offsetYSearch = 400,
		offsetYBreak = document.querySelector('.break').offsetTop,
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
			$('.newsletter-slider').addClass('slide');
		} else {
			$('.newsletter-slider').removeClass('slide');
		}

		//This is for the subscribe newsletter flyout
		if($(window).scrollTop() >= offsetYSearch) {
			$('.navbar-form').addClass('show');
		} else {
			$('.navbar-form').removeClass('show');
		}

		var xy = $(window).height();
		
		if(($(window).scrollTop()+xy) >= offsetYBreak && offsetYBreak >= ($(window).scrollTop()-300)) {
			var yOffset = window.pageYOffset;
			parallax.style.backgroundPosition='0px '+(yOffset/speed)+'px';
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


$('.convert .glyphicon-remove').click(function(){
	$('.convert').removeClass('slide');
	$('.convert').addClass('off');
});

$('.where').focus(function(){
	$('.search-anime').addClass('extend');
});



