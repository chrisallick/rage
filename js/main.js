$(document).ready(function() {
	$(".video").click(function(){
		$(".player:eq(0)").slideDown();
	});

	$(".player").click(function(){
		$(this).slideUp("slow");
	});

	$(".player").slideUp(function(){
		$("header .logo").animate({
			opacity: 1
		},function() {
			$(".row").animate({
				opacity: 1
			});
		});
	});
});