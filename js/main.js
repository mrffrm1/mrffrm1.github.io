jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider .carousel').carousel({
			interval: 4000,
			cycle: true
		});
		
	});

	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		
		var is_valid = true;
		
		if($('.nameReq').val()==''){
			is_valid = false;
			$('.nameReq').next('.contError').slideDown();
		} 
		if($('.subjectReq').val()==''){
			is_valid = false;
			$('.subjectReq').next('.contError').slideDown();
		} 
		if($('.messageReq').val()==''){
			is_valid = false;
			$('.messageReq').next('.contError').slideDown();
		}
		if($('.emailReq').val()==''){
			is_valid = false;
			$('.emailReq').next('.contError').slideDown();
		} else {
			var email = $('.emailReq').val();
			if(isValidEmailAddress(email)) {
                $('.emailReq').next('.contError').slideUp;
            } else {
				is_valid = false;
               $('.emailReq').next('.contError').slideDown().html("Please Enter a valid Email Address");
            }
		}
		if(is_valid)
			validateComplete(form);
	});
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 	$(".dropdown > a").attr("href", "javascript:;");
	}

});

$(window).scroll(function() {
	if($("body").scrollTop() > 300){
		$('.gototop').addClass("gototopAct");
	} else {
		$('.gototop').removeClass("gototopAct");
	}
});

function errorRemove(that){
	$(that).next('span').slideUp();
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function validateComplete(form){
	var form_status = $('<div class="form_status center"></div>');
	$.ajax({
		url: $(form).attr('action'),
		type: 'post',
               data: $(form).serialize(),
		beforeSend: function(){
			form.prepend( form_status.html('<p class="mailSendingLoader"><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
		}
	}).done(function(data){
		form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).slideUp();
               $('.form-control').delay(3000).val('');
	});
}