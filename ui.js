
function goToByScroll(id){
	$('html,body').animate({scrollTop: $(id).offset().top},'slow');
}

jQuery(function($) {

	var $window = $(window),
		$stickyEl = $('.strip'),
		stickyHeight = $stickyEl.outerHeight(),
		sportTop = $('.band--02').offset().top,
		stickyTop = $stickyEl.offset().top,
		windowHeight = $window.height(),
		introHeight = $('.content--intro').outerHeight();

	$('.down-arrow').click(function(){
		$('.menu').find('li:first-child').addClass('active');
		goToByScroll($(this).attr('href'));
		return false;
	});

	$('.menu a').click(function(){
		goToByScroll($(this).attr('href'));
		$('.menu .active').removeClass('active');
		$(this).parent('li').addClass('active');
		return false;
	});

	// What's going on here?
	setTimeout(function() {
		$('.down-arrow').css('-webkit-animation','floating 1s infinite')
	}, 1500);

	var stuck = false;

	var throttled = _.throttle(updatePosition, 100);
	$(window).scroll(throttled);

	function updatePosition() {
		if($window.scrollTop() >= stickyTop && !stuck) {
			$stickyEl.addClass('strip--sticky');
			stuck = true;
		}

		else if ($window.scrollTop() < stickyTop && stuck) {
			$stickyEl.attr('class','strip');
			stuck = false;
		}

		if($window.scrollTop() > (sportTop - stickyHeight)) {
			$('.band--02').addClass('band--visible');
		}

		if($window.scrollTop() >= (windowHeight - stickyTop)) {
			$('.facts').addClass('facts--visible');
		}
	}

});