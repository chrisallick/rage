
attach_clicks = function() {

	$(".player-wrapper .close").click(function() {
		if( playing ) {
			//vapi.api("pause");
			$(".playing-now .video-wrapper").html("");
		}

		playing = false;

		$(this).parents(".player").animate({
			opacity: 0
		}, function() {
			$(this).parents(".player-wrapper").removeClass("playing-now").delay(100).animate({
				height: 0
			}, function() {
				if( $(document).scrollTop()/$(document).height()*100 > 18 ) {
					$("#backtotop").fadeIn();
				} else {
					$("#backtotop").fadeOut();
				}
			});			
		});
	});

	$(".videothumb").click(function() {
		if( playing ) {
			$(".playing-now .video-wrapper").html("");
		}

		var el = $(this);

		var row = $(this).parents(".row").data("index");

		var player = $(".player-wrapper")[row];

		if( currentPlayer != row ) {
			if( $(".playing-now").length > 0 ) {
				$(".playing-now").animate({
					height: 0
				}, 300, function() {
					if( row != 21 || row != 22 ) {
						if( $(window).height() < 720 ) {
							$("body,html").animate({
								scrollTop: $(player).offset().top - 107
							});
						} else {
							$("body,html").animate({
								scrollTop: $(player).offset().top - $(window).height()/2 + 304
							});
						}
					}
				}).removeClass("playing-now");
			} else {
				if( row != 21 || row != 22 ) {
					if( $(window).height() < 720 ) {
						$("body,html").animate({
							scrollTop: $(player).offset().top - 107
						});
					} else {
						$("body,html").animate({
							scrollTop: $(player).offset().top - $(window).height()/2 + 304
						});
					}
				}
			}
		}

		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");

		$($(".player-wrapper")[row]).addClass("playing-now");

		var src = "http://player.vimeo.com/video/"+$(this).data("id")+"?api=1&player_id=player"+row;
  		var role = $(this).data("role");
  		var main_title = $('.title .main', this).text().replace(" - ", "");

  		$(".role", player).html( "<p>"+role+"</p>" );
  		if( $('.title .it', this).text() != "" ) {
  			var sub_title = $('.title .it', this).text();
  			$(".title", player).html( "<p class='main'>"+main_title+"</p><p class='sub'>" + sub_title + "</p>" );
  		} else {
  			$(".title", player).html( "<p class='mainonly'>"+main_title+"</p>" );
  		}
  		
		$("#backtotop").fadeOut();

		playing = true;
		currentPlayer = row;

		$(player).delay(600).animate({
			height: 608
		}, function() {
			if( row == 21 || row == 22 ) {
				if( $(window).height() < 720 ) {
					$("body,html").animate({
						scrollTop: $(player).offset().top - 107
					});
				} else {
					$("body,html").animate({
						scrollTop: $(player).offset().top - $(window).height()/2 + 304
					});
				}
			}
			$(".video-wrapper", player).html('<iframe id="player'+row+'"" src="'+src+'&autoplay=1" width="804" height="453" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			$(".player",player).animate({
				opacity: 1
			});
		});
	});
}

$(window).load(function(){
	attach_clicks();
});



load_categories = function( all ) {
	all = all || false;

	if( !all ) {
		var q = "/categories?cats="+category;
		$.get(q,function(data){
			$("#wrapper").html(data).ready(function(){
				players = [];
				setup_thumbs(true);
			});
		});
	} else if( all ) {
		var q = "/categories?cats=all";
		$.get(q,function(data){
			$("#wrapper").html(data).ready(function(){
				players = [];
				setup_thumbs(true);
			});
		});
	}
}

show_rows = function() {
	$(".row").animate({
		opacity: 1
	});
}

setup_thumbs = function(wait) {
	$(".videothumb").each(function(index,value){
		if( $(this).data("id") ) {
			var vid = $(this).data("id");
			$.getJSON('http://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/'+vid+'&width=804&callback=?', {format: "json"}, function(data) {
				if( data.title ) {
					var title = data.title.replace(/\"/g,'').split(" - ");
					var new_title = "";
					if( title.length == 3 )  {
						new_title = "<span class='main'>" + title[0] + "</span> - <span class='it'>" + title[1] + " - " + title[2] + "</span>";
					} else if( title.length == 2 ) {
						new_title = "<span class='main'>" + title[0] + "</span> - <span class='it'>" + title[1] + "</span>";
					} else if( title.length == 1 ) {
						new_title = "<span class='main'>" + title[0] + "</span>";
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

var iframe
var vapi;
var playing = false;
var currentPlayer = -1;
var currentSubNav = "";
var category = "";
$(document).ready(function() {

	// setTimeout(function(){
	// 	$("body,html").css({
	// 		scrollTop: 0
	// 	});
	// }, 10);

    if (window.location.hash) { 
        //bind to scroll function
        $(document).scroll( function() {
            var hash = window.location.hash
            var hashName = hash.substring(1, hash.length);
            var element;

            //if element has this id then scroll to it
            if ($(hash).length != 0) {
                element = $(hash);
            }
            //catch cases of links that use anchor name
            else if ($('a[name="' + hashName + '"]').length != 0)
            {
                //just use the first one in case there are multiples
                element = $('a[name="' + hashName + '"]:first');
            }

            //if we have a target then go to it
            if (element != undefined) {
                window.scrollTo(0, element.position().top);
            }
            //unbind the scroll event
            $(document).unbind("scroll");
        });
    }

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
			// 
		} else {
			$("#categories .on").removeClass("on");
			$(this).addClass("on");
			//categories.push($(this).data("role"));
			category = $(this).data("role");
			$("#active-label p").text(category);
			$("#active-label").show();
		}

		load_categories();
	});

	$("#active-label").click(function(){
		category = "";
		$(this).hide();
		$("#categories .on").removeClass("on");
		load_categories(true);
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

	$("#navwrapper .projects").click(function(event){
		event.preventDefault();
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");

		$("#categories .on").removeClass("on");
		$("#active-label").hide();

		$("body,html").animate({
			scrollTop: 0
		}, function(){
			load_categories(true);
		});
	});

	$("#closeheader").click(function() {
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").addClass("closing").delay(250).fadeOut("fast",function(){
			$(this).removeClass("closing");
		});
		$(".subnav").delay(250).fadeOut("fast");
		$("#subnavswrapper").delay(250).slideUp("fast" );
	});

	$("#backtotop").click(function(){
		$("body,html").animate({
			scrollTop: 0
		});
	});

	$(window).scroll(function(){
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
				$("#closeheader").addClass("closing").fadeOut("fast",function(){
			$(this).removeClass("closing");
		});
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");

		if( $(document).scrollTop()/$(document).height()*100 > 18 && $(".playing-now").length == 0 ) {
			$("#backtotop").fadeIn();
		} else {
			$("#backtotop").fadeOut();
		}
	});

});