
attach_clicks = function() {

	$(".player-wrapper .close").click(function() {
		playing = false;

		if( players && players[currentPlayer] && players[currentPlayer].api ) {
			players[currentPlayer].api("unload");
		}

		$("#backtotop").fadeIn();
		$(this).parents(".player-wrapper").css({
			height: 0
		});	
	});

	$(".videothumb").click(function() {

		console.log("gotime");

		for( var i = 0,len = players.length; i < len; i++ ) {
			if( players[i] && players[i].api ) {
				players[i].api("unload");
			}
		}

		var row = $(this).parents(".row").data("index");

		var player = $(".player-wrapper")[row];

		if( currentPlayer != row ) {
			$(".playing-now").css({
				height: 0
			}, 250, function() {

			}).removeClass("playing-now");			
		}


		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");

		$($(".player-wrapper")[row]).addClass("playing-now");

		// populate the data
		var src = "http://player.vimeo.com/video/"+$(this).data("id")+"?api=1&player_id=player"+row;
  		var role = $(this).data("role");
  		var title = $('.title', this).html();
  		
  		$(".role", player).text( role );
  		$(".title", player).html( title );
  		$(".video-wrapper", player).html('<iframe id="player'+row+'"" src="'+src+'" width="804" height="453" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

  		$("#backtotop").fadeOut();

		var fired = false;
		if( row == 19 || row == 18 ) {
				$(player).delay(500).animate({
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
							if( players[row] && players[row].api ) {
								players[row].api("play");
								currentPlayer = row;
								playing = true;								
							}
						});
					}
					$("body,html").animate({
						scrollTop: $(player).offset().top - $(window).height()/2 + 250
					});
				});
		} else {
			$("body,html").delay(500).animate({
				scrollTop: $(player).offset().top - 115// - $(window).height()/2 + 250
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
							if( players[row] && players[row].api ) {
								players[row].api("play");
								currentPlayer = row;
								playing = true;								
							}
						});
					}				
				});
			});
		}
	});
}

$(window).load(function(){
	//console.log("loaded");
	attach_clicks();
});

load_categories = function() {
	var q = "/categories?cats="+categories.join(",");
	$.get(q,function(data){
		$("#wrapper").html(data).ready(function(){
			players = [];
			setup_thumbs(true);
		});
	});
}

show_rows = function() {
	$(".row").animate({
		opacity: 1
	}, function() {
		$("#backtotop").animate({
			opacity: 1
		});
	});
}

setup_thumbs = function(wait) {
	$(".videothumb").each(function(index,value){
		if( $(this).data("id") ) {
			var vid = $(this).data("id");
			$.getJSON('http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/'+vid+'&width=804&callback=?', {format: "json"}, function(data) {
				if( data.title ) {
					var title = data.title.split("\"");
					var new_title = ""
					if( title.length == 3 )  {
						new_title = title[0] + "<span class='it'>" + title[1] + "</span><span class='plain'>" + title[2] + "</span>";
						
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
	if(wait){
					attach_clicks();

			show_rows();
		}
}

var iframe, players = new Array();
var playing = false;
var currentPlayer = -1;
var currentSubNav = "";
var categories = new Array();
$(document).ready(function() {

	setTimeout(function(){
		$("body,html").animate({
			scrollTop: 0
		}, 100);
	}, 10);

	setup_thumbs();

	$("#navwrapper").animate({
		opacity: 1
	}, function() {
		$("#navwrapper .nav").animate({
			opacity: 1
		}, function() {
			show_rows();
		});
	});

	$("#categories li").click(function(event){
		if( $(this).hasClass("on") ) {
			$(this).removeClass("on");
			var index = categories.indexOf($(this).data("role"));
			if (index !== -1) {
			    categories.splice(index, 1);
			}
		} else {
			$(this).addClass("on");
			categories.push($(this).data("role"));
		}

		load_categories();
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

	$(window).scroll(function(){
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");
	});

});