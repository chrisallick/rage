$(window).load(function(){

	setTimeout(function(){
		$("body,html").animate({
			scrollTop: 0
		}, 100);
	}, 10);

	//

	$(".videothumb").click(function() {

		var row = $(this).parents(".row").data("index");

		var player = $(".player-wrapper")[row];

		// populate the data
		var src = $(this).data("src");
  		var role = $(this).data("role");
  		var title = $('.title', this).html();
  		
  		$(".role", player).text( role );
  		$(".title", player).html( title );
  		$(".video-wrapper", player).html('<iframe id="player'+row+'"" src="'+src+'" width="804" height="453" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

  		$("#backtotop").fadeOut();

		var fired = false;
		$("body,html").delay(500).animate({
			scrollTop: $(player).offset().top - $(window).height()/2 + 304
		}, function() {
			$(player).animate({
				height: 608
			}, function() {
				$(".role", player).animate({
					opacity: 1
				});
				$(".title", player).animate({
					opacity: 1
				});
				if( !fired ) {
					fired = true;

					iframe = $("iframe", player)[0];
					players[row] = $f(iframe);
					players[row].addEvent('ready', function() {
						players[row].api("play");
						currentPlayer = row;
						playing = true;
					});
				}				
			});
		});
	});
});

var iframe, players = new Array();
var playing = false;
var currentPlayer = -1;
var currentSubNav = "";
$(document).ready(function() {
	$(".player .close").click(function() {
		playing = false;

		$("#backtotop").fadeIn();
		//players[currentPlayer].api("unload");
		$(this).parents(".player-wrapper").animate({
			height: 0
		});
	});

	$("#navwrapper").animate({
		opacity: 1
	}, function() {
		$("#navwrapper .nav").animate({
			opacity: 1
		}, function() {
			$(".row").animate({
				opacity: 1
			}, function() {
				$("#backtotop").animate({
					opacity: 1
				});
			});
		});
	});

	$("#navwrapper .openabout").click(function(event){
		event.preventDefault();
		if( currentSubNav != "about" ) {
			if( $("#subnavs").hasClass("closed") ) {
				$("#closeheader").fadeIn("slow");
				$("#subnavs .about").fadeIn("slow");
				$("#subnavswrapper").slideDown();
			} else {
				$("."+currentSubNav).fadeOut(function(){
					$("#subnavs .about").fadeIn("slow");	
				});
			}
			currentSubNav = "about";
			$("#subnavs").removeClass().addClass("open");
		}
	});

	$("#navwrapper .opencontact").click(function(event){
		event.preventDefault();
		if( currentSubNav != "contact" ) {
			if( $("#subnavs").hasClass("closed") ) {
				$("#closeheader").fadeIn("slow");
				$("#subnavs .contact").fadeIn("slow");
				$("#subnavswrapper").slideDown();
			} else {
				$("."+currentSubNav).fadeOut(function(){
					$("#subnavs .contact").fadeIn("slow");	
				});
			}
			currentSubNav = "contact";
			$("#subnavs").removeClass().addClass("open");
		}
	});

	$("#closeheader").click(function() {
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp();
	});

	$("#backtotop").click(function(){
		$("body,html").animate({
			scrollTop: 0
		})
	});
});