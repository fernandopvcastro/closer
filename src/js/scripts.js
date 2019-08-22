$(document).ready(function(){
	$('.slider').slick({
		fade: true,
		slidesToShow: 1,
	    slidesToScroll: 1,
	    infinite: false,
	    arrows: true,
	    dots: false
	});
});


$(document).scroll(function() {
	var scrollTop = $(this).scrollTop();
	if(scrollTop > 40){
		$('.header').addClass('active');
	}else {
		$('.header').removeClass('active');
	}
});