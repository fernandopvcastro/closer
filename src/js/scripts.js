$(document).ready(function(){
	var screenWidth = $(window).width();

	$(".nav__item a").click(function(){
		var doc = $('html, body');
		var indice = $(this).attr('href');

		doc.animate({
	        scrollTop: $(indice).offset().top
	    }, 500);
	    return false;
	});

	$('#menuToggle').on('click touchstart', function(e){
		$('.nav__list').toggleClass('menu-active');
		$(this).toggleClass('active');
        e.preventDefault();
	});

	$('.slider').slick({
		slidesToShow: 3,
	    slidesToScroll: 1,
	    infinite: true,
	    arrows: true,
	    dots: false,
	    responsive: [{
	            breakpoint:1000,
	            settings: {
	                slidesToShow: 3
	            }
	        },
	        {
	            breakpoint:950,
	            settings: {
	                slidesToShow: 1
	            }
	        }
	    ]
	});

    $('#videoViagem button, .modal:not(.modal-body)').click(function () {
        var src = 'https://www.youtube.com/embed/uNke4j5Digc';
        $('#videoViagem iframe').removeAttr('src');
        $('#videoViagem iframe').attr('src', src);
    });

    if(screenWidth >= 1000){
	    $('body').on("mousemove", function(e){
	    	var imgX = $('.banner__title img')[0].x;
	    	var imgY = $('.banner__title img')[0].y;

	    	var animeX = 0;
	    	var animeY = 0;
	    	if(e.offsetX > imgX){
				animeX += (e.offsetX*7)/80;

	    	}else{
	    		animeX -= (e.offsetX*7)/80;
	    	}

	    	if(e.offsetY > imgY){
				animeY += (e.offsetY*7)/80;
	    	}else{
	    		animeY -= (e.offsetY*7)/80;
	    	}

	    	$('.banner__title')[0].style = "transition-duration: 0.3s;transform: translate("+animeX+"px,"+animeY+"px)";
	    });
	    $('body').on("mouseleave", function(e){
	    	$('.banner__title')[0].style = "transition-duration: 0.3s;transform: translate(0,0)";
	    });
	}
});


$(document).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var LarguraTela = $(window).width() /2;
	var tamanhoFinal = LarguraTela - scrollTop;

	$(".trip").show(function (){
		if (tamanhoFinal >= 0) {
			$('.title__animation').css({"transform": "translateX("+tamanhoFinal+"px)"});
		}
	});
});