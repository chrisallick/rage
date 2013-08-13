
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
			//vapi.api("pause");
			$(".playing-now .video-wrapper").html("");
		}

		var row = $(this).parents(".row").data("index");

		// unload anything
		// collapse and unfold
		// scroll
		// load video

		var player = $(".player-wrapper")[row];

		if( currentPlayer != row ) {
			if( $(".playing-now").length > 0 ) {
				$(".playing-now").animate({
					height: 0
				}, 100, function() {
					$("body,html").animate({
						scrollTop: $(player).offset().top - 115// - $(window).height()/2 + 250
					});
				}).removeClass("playing-now");
			} else {
				$("body,html").animate({
					scrollTop: $(player).offset().top - 115// - $(window).height()/2 + 250
				});
			}
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
  		var main_title = $('.title .main', this).text().replace(" - ", "");
  		if( ('.title .it', this).length == 0 ) {
			var sub_title = $('.title .plain', this).text();
  		} else {
  			var sub_title = $('.title .it', this).text();	
  		}
  		
  		$(".role", player).html( "<p>"+role+"</p>" );
  		$(".title", player).html( "<p class='main'>"+main_title+"</p><p class='sub'>" + sub_title + "</p>" );
  		//$(".video-wrapper", player).html('<iframe id="player'+row+'"" src="'+src+'&autoplay=1" width="804" height="453" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

		$("#backtotop").fadeOut();

		playing = true;
		currentPlayer = row;

		$(player).animate({
			height: 608
		}, function() {
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
	//var q = "/categories?cats="+categories.join(",");

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
					var title = data.title.split("\"");
					var new_title = "";
					if( title.length == 3 )  {
						new_title = "<span class='main'>" + title[0] + "</span><span class='it'>" + title[1] + "</span><span class='plain'>" + title[2] + "</span>";
					} else if( title.length == 1 ) {
						title = data.title.split("-")
						if( title.length == 1 ) {
							new_title = data.title;	
						} else {
							new_title = "<span class='main'>" + title[0] + "</span> - <span class='plain'>" + title[1] + "</span>";
						}
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
	setTimeout(function(){
		$("body,html").css({
			scrollTop: 0
		});
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
		$("#subnavswrapper").slideUp("fast" );

		$("body,html").animate({
			scrollTop: 0
		}, function(){
			load_categories(true);
		});
	});

	$("#closeheader").click(function() {
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast" );
	});

	$("#backtotop").click(function(){
		$("body,html").animate({
			scrollTop: 0
		});
	});

	$(window).scroll(function(){
		currentSubNav = "";
		$("#subnavs").removeClass().addClass("closed");
		$("#closeheader").fadeOut("fast");
		$(".subnav").fadeOut("fast");
		$("#subnavswrapper").slideUp("fast");

		if( $(document).scrollTop()/$(document).height()*100 > 18 && $(".playing-now").length == 0 ) {
			$("#backtotop").fadeIn();
		} else {
			$("#backtotop").fadeOut();
		}
	});

});