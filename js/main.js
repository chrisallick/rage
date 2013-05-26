$(window).load(function(){
	$(".video").click(function(){
		var vTop = $(".row:eq(0)").offset().top + $(".row:eq(0)").height();
		var vHeight = 608;
		var offset = ($(window).height() - vHeight)/2;
		var scrollHeight = vTop - offset + "px";
					$("body").animate({
				scrollTop: scrollHeight
			}, function() {
		$(".player:eq(0)").slideDown();				
			});

	});
});

$(document).ready(function() {
	$(".player .close").click(function(){
		$(this).parent().slideUp("slow");
	});

	$(".player").slideUp(function(){
		$("#header").animate({
			opacity: 1
		}, function() {
			$("#header .nav").animate({
				opacity: 1
			}, function() {
				$(".row").animate({
					opacity: 1
				});
			});
		});
	});
});