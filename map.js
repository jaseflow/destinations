
var map;

var beaches = [
	['Chalong Bay', 7.830051,98.349899, 4],
  ['Karmala', 7.949757,98.289818, 5],
  ['Karon', 7.843486,98.303234, 3],
  ['Kata', 7.821527,98.299374, 2]
];

function initializeMap() {

  var mapOptions = {
    zoom: 15,
    scrollwheel: false,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    center: new google.maps.LatLng(-37.816565,144.963859),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  setMarkers(map, beaches);



};

function setMarkers(map,locations) {
	for (var i = 0; i < locations.length; i ++) {
		var region = beaches[i];
		var myLatLng = new google.maps.LatLng(region[1],region[2]);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			$('.dest-map__sidebar').addClass('dest-map__sidebar--visible');
			console.log(this);
		});
	}
};



jQuery(function($) {

	// Async load of maps

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initializeMap';
	document.body.appendChild(script);

	// Hotel Stuff

	if (matchMedia('only screen and (max-width: 600px)').matches) {

		window.mySwipe = Swipe(document.getElementById('slider'), {
			continuous: false
		});

		flyerHeight = $('.flyer').height();

		$('.flipper').css('height',flyerHeight + 24);

	}

	// Tab Stuff

	$('.dest-tabs a').click(function(e) {
		e.preventDefault();
		var activeTab = $(this).attr('href');
		$('.dest-tabs li.active').removeClass('active');
		$(this).parent('li').addClass('active');

		$('.dest-window--active').removeClass('dest-window--active');
		$(activeTab).addClass('dest-window--active');
	});

	$('.pocket-book a').click(function(e) {
		e.preventDefault();
		var activeTab = $(this).attr('href').replace('#','');
		$('.pocket-book li.active').removeClass('active');
		$(this).parent('li').addClass('active');
		$('.pocket-book__slider').attr('class','pocket-book__slider');
		$('.pocket-book__slider').addClass('pocket-book__slider--' + activeTab);
	});

	// Close sidebar 

	$('.dest-map__sidebar-close').click(function() {
		$('.dest-map__sidebar').removeClass('dest-map__sidebar--visible');
	});

});