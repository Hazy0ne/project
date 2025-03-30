	
jQuery(document).ready(function() {
    jQuery('[data-youtube]').youtube_background();
});

$(function(){
	function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure ){
	  var cookie_string = name + "=" + escape ( value ) + "; path=/";
	 
	  if ( exp_y )
	  {
	    var expires = new Date ( exp_y, exp_m, exp_d );
	    cookie_string += "; expires=" + expires.toGMTString();
	  }
	 
	  if ( path )
	        cookie_string += "; path=" + escape ( path );
	 
	  if ( domain )
	        cookie_string += "; domain=" + escape ( domain );
	  
	  if ( secure )
	        cookie_string += "; secure";
	  
	  document.cookie = cookie_string;
	}
	
	function get_cookie ( cookie_name ) {
		var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

		if ( results )
			return ( unescape ( results[2] ) );
		else
			return null;
	}

	var flag = get_cookie("flag");
	var langButNew = document.querySelector("#languageButtonNew");
	if ( flag == '1' ) {
		langButNew.innerHTML = ("EN");
		readTextFile("/public/language/english.json", function(text){
		    var data = JSON.parse(text);
		    for ( key in data ) {
				var newText = document.getElementById(key);
				try {
					newText.innerHTML = data[key];
				}
				catch (e) {

				}
			}
		});
	}
	else if ( flag == '0' ) {
		langButNew.innerHTML = ("RU");
	}

	function readTextFile(file, callback) {
	    var rawFile = new XMLHttpRequest();
	    rawFile.overrideMimeType("application/json");
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4 && rawFile.status == "200") {
	            callback(rawFile.responseText);
	        }
	    }
	    rawFile.send(null);
	}


	document.querySelector("#languageButtonNew").onclick = function() {
		if (languageButtonNew.innerHTML == ("EN")) {
			set_cookie("flag", "0");
			languageButtonNew.innerHTML = ("RU");
			window.location.reload();
		}
		else if (languageButtonNew.innerHTML == ("RU")){
			set_cookie("flag", "1");
			languageButtonNew.innerHTML = ("EN");
			window.location.reload();
		}
	};

	// $('#burger-block').css('display', 'none');

	$('#burger-button').click(function(){
		// transition: all 2s ease-in-out;
		// $('#burger-block').css('position', 'fixed').css('display', 'block');
		$('#burger-block').css('z-index', '2');
		$('#burger-block > .burger-block').toggleClass('active-menu');
		$('.burger-li > li').toggleClass('li-line-active');
		// $('active-menu').css('right', '0');
	});
	$('#close-button').click(function(){
		$('#burger-block').css('z-index', '-1');
		$('#burger-block > .burger-block').removeClass('active-menu');
		$('.burger-li > li').removeClass('li-line-active');
	});		
});


function slide(slideId) {
	$(`.slider > .slider-wrapper > .slide`).removeClass('active');
	$(`.slider > .slider-wrapper > .slide[data-slide-id="${slideId}"]`).addClass('active');
	$(`.bottom-part-points > .slider-point`).removeClass('active');
	$(`.bottom-part-points > .slider-point[data-slide-id="${slideId}"]`).addClass('active');
}

var slidesCount = 3;
var currentSlide = 1;
var slideInterval = 2000;

setInterval(function() {
	if (++currentSlide > slidesCount)
		currentSlide = 1;
	slide(currentSlide);
	
}, slideInterval);


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} 
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}


const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		
		const blockID = anchor.getAttribute('href').substr(1)
		
		document.getElementById(blockID).scrollIntoView({
		behavior: 'smooth',
		block: 'start'
		})
	})
}

