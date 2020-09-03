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
	var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html"; 
	var categoryHtml = "snippets/category-snippet.html";

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

	// Return substitute of '{{propName}}'
	// with propValue in given 'string'
	function insertProperty(string, propName, propValue) {
		var propToReplace = "{{" + propName +"}}";
		string = string.replace(new RegExp(propToReplace, 'g'), propValue);
		return string;
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


	// Load the menu categories view
	abc.loadMenuCategories = function () {
		showLoader("#main-content");
		$ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
	};


	// Builds HTML for the categories page based on the data
	// from the server
	function buildAndShowCategoriesHTML(categoriesRes) {
		// Load title snippet of categories page
		$ajaxUtils.sendGetRequest(categoriesTitleHtml, 
			function (categoriesTitleHtmlRes) {
				// Retrieve single category snippet
				$ajaxUtils.sendGetRequest(categoryHtml, 
					function (categoryHtmlRes) {
						var categoriesViewHtml = buildCategoriesViewHtml(categoriesRes, categoriesTitleHtmlRes, categoryHtmlRes);
						insertHtml("#main-content", categoriesViewHtml);
				},false);
		}, false);
	}


	function buildCategoriesViewHtml(categoriesRes, categoriesTitleHtmlRes, categoryHtmlRes){

		var finalHtml = categoriesTitleHtmlRes;
		finalHtml += '<section class="row">';

		for(var i=0; i<categoriesRes.length; i++){
			//inserting values in the place of names
			var html = categoryHtmlRes;
			html = insertProperty(html, "name", categoriesRes[i].name)
			html = insertProperty(html, "short_name", categoriesRes[i].short_name);

			finalHtml += html;
		}

		finalHtml += '</section>';

		return finalHtml;
	}

	global.$abc = abc;
	
})(window);

