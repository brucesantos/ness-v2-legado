// Scroll.js

$(window).on('popstate',function(e){
	e.preventDefault();
	var target = window.location.href.split("#")[1];
	if(target != "" && target!=undefined){
		$('html, body').stop().animate({'scrollTop': $("#"+target).offset().top}, 500, 'swing', function () {
			window.location.hash = target;
		});
	}
});

$(document).ready(function(){

	$(window).resize(function(){
		resizeVideo();
		showMenuBtn();
	});

	$(window).trigger("resize");

	// open menu on mobile 768 original

	function showMenuBtn(){
		if($(window).width()<992){
			$(".open_menu").addClass("d-block");
			$("header nav").addClass("d-none");
			$(".navigation_mobile").removeClass("opened");
			$("#loguinho-mobile").show();
		}else{
			$(".open_menu").removeClass("d-block");
			$("header nav").removeClass("d-none");
			$(".navigation_mobile").removeClass("opened");
			$("#loguinho-mobile").hide();
		}
	}

	$(".open_menu").click(function(event){
		event.preventDefault();
		$(".navigation_mobile").addClass("opened");
	});

	$(".close_menu, header, section, footer, .navigation_mobile .inner a").click(function(event){
		$(".navigation_mobile").removeClass("opened");
	});

	// Enable AOS plugin (blocks animations)

	if(typeof(AOS) !== 'undefined'){
		AOS.init({
			easing: 'ease-out-cubic',
			offset: 50
		});
		setTimeout(function(){
			if($(".slick-initialized").length>0){
				AOS.refreshHard();
			}
		},200);
	}

	// AJAX send form

	$("form").submit(function(event){
		event.preventDefault();

		var form = $(this),
			term = form.serialize(),
			url = form.attr("action"),
			required_fields_filled = true;

		form.find("input, textarea, select").each(function(){
			if($(this).prop("required") && $(this).val()==""){
				required_fields_filled = false;
			}
		});

		if(required_fields_filled){
			var posting = $.post(url, term);
			posting
			.done(function(data){
				if(data=="ok"){
					$(".alert-form-success").fadeIn(200).delay(5000).fadeOut(200);
				}else{
					$(".alert-form-error").fadeIn(200).delay(5000).fadeOut(200);
				}
			})
			.fail(function(){
				$(".alert-form-error").fadeIn(200).delay(5000).fadeOut(200);
			});
		}else{
			$(".alert-form-check-fields").fadeIn(200).delay(5000).fadeOut(200);
		}
	});

	// Function to add style to form, when user clicks to input inside it

	function focusForm(formID){
		var form = $("#"+formID);
		if(form.hasClass("focused")){
			form.removeClass("focused");
		}else{
			form.addClass("focused");
		}
	}

	// Resize video, saving aspect ratio

	function resizeVideo(){
		var width, height, ratio;
		$(".video").each(function(){
			ratio = $(this).data("ratio");
			ratio = ratio.split("/");
			ratio = ratio[0]/ratio[1];
			width = $(this).width();
			height = width/ratio;
			$(this).height(height);
		});
	}

	resizeVideo();

	// Play video

	$(".video .play").click(function(){
		var video = $(this).parent().parent().find("video");
		$(this).closest(".poster").fadeOut(300,function(){
			video.fadeIn(300,function(){
				video[0].play();
				video[0].onended = function() {
					$(this).parent().find(".poster").delay(100).fadeIn(300);
				};
			});
		});
	});

	// Open video in popup

	$(".js-play-popup-video").click(function(event){
		event.preventDefault();
		var url = $(this).attr("href");
		$(".video_popup .iframe_container").html('<iframe src="'+url+'" allowfullscreen></iframe>');
		$(".video_popup, .overlay").fadeIn(300);
	});

	// Close video popup

	$(".video_popup .close, .overlay").click(function(e){
		$(".video_popup, .overlay").fadeOut(300);
		setTimeout(function() {
			$(".video_popup .iframe_container").html('');
		},300);
	});

	// Opening tabs

	function openTab(tab){
		if(tab.hasClass("opened")){
			$(".tab_text").animate({height:0},300);
			tab.removeClass("opened");
		}else{
			var nextTabHeight = tab.next().find("div").outerHeight(true);
			$(".tab_text").not(tab.next()).animate({height:0},300);
			tab.next().animate({height:nextTabHeight},300);
			$(".tab_opener").removeClass("opened");
			tab.addClass("opened");
		}
	}

	$(".tab_opener").click(function(){
		openTab($(this));
	});

	if($(".opening_tabs").length > 0){
		$(".tab_opener").each(function(){
			if($(this).hasClass("opened")){
				$(this).removeClass("opened").trigger("click");
			}
		});
	}

	// Copy text from block

	if($("#copy_from_me").length > 0){
		function copyStringToClipboard (str) {
		   var el = document.createElement('textarea');
		   el.value = str;
		   el.setAttribute('readonly', '');
		   el.style = {position: 'absolute', left: '-9999px'};
		   document.body.appendChild(el);
		   el.select();
		   document.execCommand('copy');
		   document.body.removeChild(el);
		}
		$('.js-copy-btn').click(function(){
			copyStringToClipboard ($("#copy_from_me").text());
		});
	}

	// Add mask to inputs in Forms

	if($(".js-card-mask").length > 0){
		$(".js-card-mask").mask("9999 9999 9999 9999");
	}
	if($(".js-expiration-mask").length > 0){
		$(".js-expiration-mask").mask("99 / 9999");
	}
	if($(".js-expiration-short-mask").length > 0){
		$(".js-expiration-short-mask").mask("99 / 99");
	}
	if($(".js-cvv-mask").length > 0){
		$(".js-cvv-mask").mask("999");
	}

	// Disable / enable blocks in Form 13

	$(".form_13 input[type=radio]").change(function(){
		var choosenBlock = $(".form_13 input[type=radio]:checked").closest(".js-form-block");
		$(".js-form-block").removeClass("active");
		choosenBlock.addClass("active");
	});

	// Ecommerce: Quantity selector

	$(".quantity_selector .control").click(function(event){
		event.preventDefault();
		var _this = $(this);
		var input = _this.parent().find("input");
		var input_val = parseInt(input.val());
		if(_this.hasClass("greater")){
			if(input_val<parseInt(input.attr("max"))){
				input.val(input_val+1);
				input.trigger("change");
			}
		}
		if(_this.hasClass("less")){
			if(input_val>parseInt(input.attr("min"))){
				input.val(input_val-1);
				input.trigger("change");
			}
		}
	});

	// Ecommerce: Remove products from cart

	$(".remove_product").click(function(event){
		event.preventDefault();
		var product = $(this).closest(".product");
		console.log(product);
		product.slideUp(300,function(){
			product.remove();
			if(typeof(count_totals_ecommerce_33)=="function"){
				count_totals_ecommerce_33();
			}
			if(typeof(count_totals_ecommerce_36)=="function"){
				count_totals_ecommerce_36();
			}
			if(typeof(count_totals_ecommerce_38)=="function"){
				count_totals_ecommerce_38();
			}
		})
	});

	// Ecommerce: Set discount

	$(".ecommerce_33 input[name=coupon]").change(function(){
		if($(this).val()!=""){
			var discount = $(".ecommerce_33 .discount").attr("data-discount");
			$(".ecommerce_33 .discount span").text(discount);
		}else{
			$(".ecommerce_33 .discount span").text("0");
		}
		if(typeof(count_totals_ecommerce_33)=="function"){
			count_totals_ecommerce_33();
		}
	});

	// Ecommerce: Count total price

	if($(".ecommerce_33 .product").length>0){
		$(".ecommerce_33 .quantity_selector input").change(function(){
			count_totals_ecommerce_33();
		});
		function count_totals_ecommerce_33(){
			var total = 0;
			var discount = parseInt($(".ecommerce_33 .discount span").text());
			$(".ecommerce_33 .product").each(function(){
				var product = $(this);
				var price = parseFloat(product.find(".product_price span").text());
				var quantity = parseInt(product.find("input[name=quantity]").val());
				product.find(".product_total span").text(price*quantity);
				total = total + price*quantity;
			});
			if(!isNaN(discount)){
				total = Math.floor(total*(100-discount)/100);
			}
			$(".ecommerce_33 .total span").text(total);
		}
		count_totals_ecommerce_33();
	}

	if($(".ecommerce_34 .product").length>0){
		$(".ecommerce_34 .quantity_selector input").change(function(){
			count_totals_ecommerce_34();
		});
		function count_totals_ecommerce_34(){
			var total = 0;
			var delivery = parseInt($(".ecommerce_34 .delivery span").text());
			$(".ecommerce_34 .product").each(function(){
				var product = $(this);
				var price = parseFloat(product.find(".product_price span").text());
				var quantity = parseInt(product.find("input[name=quantity]").val());
				product.find(".product_total span").text(price*quantity);
				total = total + price*quantity;
			});
			$(".ecommerce_34 .subtotal span").text(total);
			if(!isNaN(delivery)){
				total = total+delivery;
			}
			$(".ecommerce_34 .total span").text(total);
		}
		count_totals_ecommerce_34();
	}

	if($(".ecommerce_35 .product").length>0){
		$(".ecommerce_35 .quantity_selector input").change(function(){
			count_totals_ecommerce_35();
		});
		function count_totals_ecommerce_35(){
			var total = 0;
			$(".ecommerce_35 .product").each(function(){
				var product = $(this);
				var price = parseFloat(product.find(".product_price span").text());
				var quantity = parseInt(product.find("input[name=quantity]").val());
				product.find(".product_total span").text(price*quantity);
				total = total + price*quantity;
			});
			$(".ecommerce_35 .total span").text(total);
		}
		count_totals_ecommerce_35();
	}

	if($(".ecommerce_36 .product").length>0){
		$(".ecommerce_36 .quantity_selector input").change(function(){
			count_totals_ecommerce_36();
		});
		function count_totals_ecommerce_36(){
			var total = 0;
			var discount = parseInt($(".ecommerce_36 .discount span").text());
			$(".ecommerce_36 .product").each(function(){
				var product = $(this);
				var price = parseFloat(product.find(".product_price span").text());
				var quantity = parseInt(product.find("input[name=quantity]").val());
				total = total + price*quantity;
			});
			$(".ecommerce_36 .total span").text(total);
		}
		count_totals_ecommerce_36();
	}

	if($(".ecommerce_38 .product").length>0){
		function count_totals_ecommerce_38(){
			var total = 0;
			var delivery = parseInt($(".ecommerce_38 .delivery span").text());
			$(".ecommerce_38 .product").each(function(){
				var product = $(this);
				var price = parseFloat(product.find(".product_price span").text());
				product.find(".product_total span").text(price);
				total = total + price;
			});
			$(".ecommerce_38 .subtotal span").text(total);
			if(!isNaN(delivery)){
				total = total+delivery;
			}
			$(".ecommerce_38 .total span").text(total);
		}
		count_totals_ecommerce_38();
	}

	// Google maps initialisation

	if($(".js-google-map").length>0){
		$(".js-google-map").each(function(){

			var map;
			var map_container = this;
			if($(map_container).attr("data-coords")!=undefined){
				var coords = $(map_container).attr("data-coords").replace(" ","").split(",");
				coords = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
			}else{
				var coords = new google.maps.LatLng(38.897710, -77.036530);
			}
			if($(map_container).attr("data-marker")!=undefined && $(map_container).attr("data-marker-size")!=undefined){
				var marker_image = $(map_container).attr("data-marker");
				var marker_size = $(map_container).attr("data-marker-size").split("*");
			}
			if($(map_container).attr("data-zoom")!=undefined){
				var zoom = parseInt($(map_container).attr("data-zoom"));
			}else{
				var zoom = 10;
			}

			function init() {
				var mapOptions = {
						zoom: zoom,
						center: coords,				},
					map = new google.maps.Map(map_container, mapOptions);
				if(marker_image){
					var marker_icon = {
						url: marker_image,
						scaledSize: new google.maps.Size(marker_size[0], marker_size[1]),
						origin: new google.maps.Point(0,0),
						anchor: new google.maps.Point(marker_size[0]/2, marker_size[1])
					},
					marker = new google.maps.Marker({
						position: coords,
						map: map,
						icon: marker_icon
					});
				}

			}

			init();

		});
	}

	/*
		Sliders
	*/

	if($(".header_8 .slider").length>0){
		$(".header_8 .slider").slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
			responsive: [
				{
				  breakpoint: 481,
				  settings: {
					arrows:false
				  }
				}
			]
		});
	}

	if($(".header_19 .slider").length>0){
		$(".header_19 .slider").slick({
			dots: true,
			arrows: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
			vertical: true,
			verticalSwiping: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					vertical: false,
					verticalSwiping: false
				  }
				}
			]
		});
	}

	if($(".content_22 .slider").length>0){
		$(".content_22 .slider").slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
		});
	}

	if($(".content_23_slider").length>0){
		$(".content_23_slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.content_23_slider_nav',
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					asNavFor: null,
					dots:true,
				  }
				}
			]
		});

		$('.content_23_slider_nav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.content_23_slider',
			dots: false,
			arrows: false,
			vertical:true,
			focusOnSelect: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					vertical:false,
					slidesToShow: 4
				  }
				}
			]
		});
	}

	if($(".content_27 .slider").length>0){
		$(".content_27 .slider").slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 2,
			slidesToScroll: 1,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
				  }
				},
				{
				  breakpoint: 620,
				  settings: {
					slidesToShow: 1,
					arrows:false,
					dots:true,
				  }
				}
			]
		});
	}

	if($(".content_29 .slider").length>0){
		$(".content_29 .slider").slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
		});
	}

	if($(".content_31 .slider").length>0){
		$(".content_31 .slider").slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
			responsive: [
				{
				  breakpoint: 991,
				  settings: {
					arrows:false
				  }
				}
			]
		});
	}

	if($(".feature_29 .slider").length>0){
		$(".feature_29 .slider").slick({
			dots: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical:true,
			verticalSwiping:true,
			adaptiveHeight:true,
			responsive: [
				{
				  breakpoint: 767,
				  settings: {
					vertical:false,
					verticalSwiping:false,
				  }
				}
			]
		});
	}

	if($(".feature_31 .slider").length>0){
		$(".feature_31 .slider").slick({
			dots: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical:true,
			verticalSwiping:true,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					vertical:false,
					verticalSwiping:false,
				  }
				}
			]
		});
	}

	if($(".form_4 .slider").length>0){
		$(".form_4 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			adaptiveHeight: true,
			asNavFor: '.form_4_menu',
		});

		$('.form_4_menu').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			asNavFor: '.form_4 .slider',
			dots: false,
			arrows: false,
			focusOnSelect: true,
		});
	}

	if($(".form_15 .slider").length>0){
		$(".form_15 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			adaptiveHeight: true,
			swipe:false,
			asNavFor: '.form_15_menu',
		});

		$('.form_15_menu').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			asNavFor: '.form_15 .slider',
			dots: false,
			arrows: false,
			focusOnSelect: true,
		});
	}

	if($(".pricing_table_6 .slider").length>0){
		$(".pricing_table_6 .slider").slick({
			dots: false,
			arrows: false,
			fade: true,
			infinite: true,
			speed: 300,
			touchMove:false,
			swipe:false,
			slidesToShow: 1,
			slidesToScroll: 1,
		});

		var toggle = $(".custom-toggle");
		var togglePin = toggle.find("i");
		$(".pricing_table_6 .slider").on('beforeChange',function(){
			if(toggle.hasClass("switched")){
				toggle.removeClass("switched");
				togglePin.animate({left:3},200);
			}else{
				var animate_to = toggle.width() - togglePin.outerWidth(true) - 3;
				toggle.addClass("switched");
				togglePin.animate({left:animate_to},200);
			}
		});

		toggle.click(function(){
			$(".pricing_table_6 .slider").slick("slickNext");
		});
	}

	if($(".ecommerce_11 .slider").length>0){
		$(".ecommerce_11 .slider").slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 20000,
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				  }
				}
			]
		});
	}

	if($(".ecommerce_15 .slider").length>0){
		$(".ecommerce_15 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.ecommerce_15 .slider_menu',
		});

		$('.ecommerce_15 .slider_menu').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			asNavFor: '.ecommerce_15 .slider',
			dots: false,
			arrows: false,
			focusOnSelect: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 6,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 469,
				  settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 419,
				  settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 359,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				  }
				}
			]
		});
	}

	if($(".ecommerce_19 .slider").length>0){
		$(".ecommerce_19 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.ecommerce_19 .slider_menu',
		});

		$('.ecommerce_19 .slider_menu').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.ecommerce_19 .slider',
			dots: false,
			arrows: false,
			focusOnSelect: true,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 469,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 359,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				  }
				}
			]
		});
	}

	if($(".ecommerce_32 .slider").length>0){
		$(".ecommerce_32 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.ecommerce_32 .slider_menu',
		});

		$('.ecommerce_32 .slider_menu').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.ecommerce_32 .slider',
			dots: false,
			arrows: true,
			focusOnSelect: true,
			responsive: [
				{
				  breakpoint: 469,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				  }
				},
				{
				  breakpoint: 359,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				  }
				}
			]
		});
	}

	if($(".ecommerce_35 .slider").length>0){
		$(".ecommerce_35 .slider").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			adaptiveHeight: true,
			swipe:false,
			asNavFor: '.ecommerce_35 .slider_menu',
		});

		$('.ecommerce_35 .slider_menu').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			asNavFor: '.ecommerce_35 .slider',
			dots: false,
			arrows: false,
			focusOnSelect: true,
		});
	}

}); // document.ready end


// HEADER FIXED SCROOL


//CANVAS


/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash include="throttle"`
 */
;(function(){function t(){}function e(t){return null==t?t===l?d:y:I&&I in Object(t)?n(t):r(t)}function n(t){var e=$.call(t,I),n=t[I];try{t[I]=l;var r=true}catch(t){}var o=_.call(t);return r&&(e?t[I]=n:delete t[I]),o}function r(t){return _.call(t)}function o(t,e,n){function r(e){var n=d,r=g;return d=g=l,x=e,v=t.apply(r,n)}function o(t){return x=t,O=setTimeout(c,e),T?r(t):v}function i(t){var n=t-h,r=t-x,o=e-n;return w?k(o,j-r):o}function f(t){var n=t-h,r=t-x;return h===l||n>=e||n<0||w&&r>=j}function c(){
	var t=D();return f(t)?p(t):(O=setTimeout(c,i(t)),l)}function p(t){return O=l,S&&d?r(t):(d=g=l,v)}function s(){O!==l&&clearTimeout(O),x=0,d=h=g=O=l}function y(){return O===l?v:p(D())}function m(){var t=D(),n=f(t);if(d=arguments,g=this,h=t,n){if(O===l)return o(h);if(w)return O=setTimeout(c,e),r(h)}return O===l&&(O=setTimeout(c,e)),v}var d,g,j,v,O,h,x=0,T=false,w=false,S=true;if(typeof t!="function")throw new TypeError(b);return e=a(e)||0,u(n)&&(T=!!n.leading,w="maxWait"in n,j=w?M(a(n.maxWait)||0,e):j,S="trailing"in n?!!n.trailing:S),
	m.cancel=s,m.flush=y,m}function i(t,e,n){var r=true,i=true;if(typeof t!="function")throw new TypeError(b);return u(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),o(t,e,{leading:r,maxWait:e,trailing:i})}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function f(t){return null!=t&&typeof t=="object"}function c(t){return typeof t=="symbol"||f(t)&&e(t)==m}function a(t){if(typeof t=="number")return t;if(c(t))return s;if(u(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;
	t=u(e)?e+"":e}if(typeof t!="string")return 0===t?t:+t;t=t.replace(g,"");var n=v.test(t);return n||O.test(t)?h(t.slice(2),n?2:8):j.test(t)?s:+t}var l,p="4.17.5",b="Expected a function",s=NaN,y="[object Null]",m="[object Symbol]",d="[object Undefined]",g=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,O=/^0o[0-7]+$/i,h=parseInt,x=typeof global=="object"&&global&&global.Object===Object&&global,T=typeof self=="object"&&self&&self.Object===Object&&self,w=x||T||Function("return this")(),S=typeof exports=="object"&&exports&&!exports.nodeType&&exports,N=S&&typeof module=="object"&&module&&!module.nodeType&&module,E=Object.prototype,$=E.hasOwnProperty,_=E.toString,W=w.Symbol,I=W?W.toStringTag:l,M=Math.max,k=Math.min,D=function(){
	return w.Date.now()};t.debounce=o,t.throttle=i,t.isObject=u,t.isObjectLike=f,t.isSymbol=c,t.now=D,t.toNumber=a,t.VERSION=p,typeof define=="function"&&typeof define.amd=="object"&&define.amd?(w._=t, define(function(){return t})):N?((N.exports=t)._=t,S._=t):w._=t}).call(this);

// This function will run a throttled script every 300 ms
var checkHeader = _.throttle(() => {

	// Detect scroll position
	let scrollPosition = Math.round(window.scrollY);

	// If we've scrolled 100px, add "sticky" class to the header
	if (scrollPosition > 100){
			document.querySelector('header').classList.add('sticky');
	}
	// If not, remove "sticky" class from header
	else {
			document.querySelector('header').classList.remove('sticky');
	}
}, 300);

// Run the checkHeader function every time you scroll
window.addEventListener('scroll', checkHeader);
