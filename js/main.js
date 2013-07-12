$(window).load(function(){
	//

	$(".videothumb").click(function() {

		var row = $(this).parents(".row").data("index");

		var player = $(".player-wrapper")[row];

		// populate the data
		var src = "http://player.vimeo.com/video/"+$(this).data("id")+"?api=1&player_id=player"+row;
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

	setTimeout(function(){
		$("body,html").animate({
			scrollTop: 0
		}, 100);
	}, 10);

	$(".player .close").click(function() {
		playing = false;

		$("#backtotop").fadeIn();
		//players[currentPlayer].api("unload");
		$(this).parents(".player-wrapper").animate({
			height: 0
		});
	});

	// $(".videothumb").mouseover(function(){
	// 	// $(".title",this).animate({
	// 	// 	backgroundColor: "#000000",
	// 	// 	color: "#FFFFFF"
	// 	// });
	// 	$(".overlay", this).animate({
	// 		opacity: 1
	// 	});
	// }).mouseout(function(){
	// 	$(".overlay", this).animate({
	// 		opacity: 0
	// 	});
	// });

	$(".videothumb").each(function(index,value){
		if( $(this).data("id") ) {
			var vid = $(this).data("id");
			$.getJSON('http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/'+vid+'&width=804&callback=?', {format: "json"}, function(data) {
				//console.log( data);
				if( data.title ) {
					var title = data.title.split("\"");
					var new_title = ""
					if( title.length == 3 )  {
						new_title = title[0] + "<span>" + title[1] + "</span>" + title[2];
						
					} else {
						new_title = data.title;
					}
					$(".title", value).html(new_title);
				}
			    if( data.thumbnail_url ) {
			    	var thumb_url = data.thumbnail_url;
			    	$(".thumb",value).attr('src', thumb_url );
			    }
			});			
		}
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
				$("#closeheader").fadeIn("fast");
				$("#subnavs .about").fadeIn("fast");
				$("#subnavswrapper").slideDown("fast");
			} else {
				$("."+currentSubNav).fadeOut("fast",function(){
					$("#subnavs .about").fadeIn("fast");	
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
				$("#closeheader").fadeIn("fast");
				$("#subnavs .contact").fadeIn("fast");
				$("#subnavswrapper").slideDown("fast");
			} else {
				$("."+currentSubNav).fadeOut("fast",function(){
					$("#subnavs .contact").fadeIn("fast");	
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
		$("#subnavswrapper").slideUp("fast");
	});

	$("#backtotop").click(function(){
		$("body,html").animate({
			scrollTop: 0
		})
	});

});