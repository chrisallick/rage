$(window).load(function(){

	setTimeout(function(){
		$("body,html").animate({
			scrollTop: 0
		}, 100);
	}, 10);

	$(".videothumb").click(function() {
		var src = $(this).data("src");
		$("#player1").attr("src", src);

		var vTop = $(".row:eq(0)").offset().top + $(".row:eq(0)").height();
		var vHeight = 608;
		var offset = ($(window).height() - vHeight)/2;
		var scrollHeight = vTop - offset + "px";

		iframe = $('#player1')[0];
  		players[0] = $f(iframe);

  		var role = $(this).data("role");
  		var title = $('.title', this).html();

  		$(".player:eq(0) .role").text( role );
  		$(".player:eq(0) .title").html(title);

		players[0].addEvent('ready', function() {
			$("body,html").animate({
				scrollTop: scrollHeight
			}, function() {
				if( !playing ) {
					$(".player:eq(0)").animate({
						height: 608
					},function(){
						players[0].api("play");
					});
					playing = true;
				} {
					players[0].api("play");
				}
			});
		});
	});
});

var iframe, players = new Array();
var playing = false;
var currentSubNav = "";
$(document).ready(function() {
	$(".player .close").click(function() {
		playing = false;
		players[0].api("unload");
		$(this).parent().animate({
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