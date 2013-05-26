$(document).ready(function() {
	$(".video").click(function(){
		$(".player:eq(0)").slideDown();
	});

	$(".player").click(function(){
		$(this).slideUp("slow");
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