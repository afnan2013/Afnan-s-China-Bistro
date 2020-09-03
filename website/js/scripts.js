$(function () {	// Same as document.addEventListener("DOMContentLoaded"...	
	// Same as document.querySelector("#navbarToggle").addEventListener("blur",...
	$("#navbarToggle").blur(function(event) {
		var screenWidth = window.innerWidth;
		if(screenWidth < 768){
			// same as navbarToggle
			$("#collapsable-nav").collapse('hide');
		}
	});

	// In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
	$("#navbarToggle").click(function (event) {
		$(event.target).focus();
	});
});


(function (global) {
	
	var abc = {};

	var HomeHtml = "snippets/home-snippet.html";

	// Convenience function for inserting innerHTML for 'select'
	function insertHtml(selector, html) {
		var targetElement = document.querySelector(selector);
		targetElement.innerHTML = html;
	}

	// Show loading icon inside element identified by 'selector'.
	function showLoader(selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	}

	// On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {
		// On first load, show home view
		showLoader("#main-content");
		$ajaxUtils.sendGetRequest(HomeHtml, 
			function (responseText) {
				console.log(responseText);
				insertHtml("#main-content", responseText);
		}, false);
	});

	global.$abc = abc;
})(window);

