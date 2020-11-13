


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
	var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemTitleHtml = "snippets/menu-item-title-snippet.html";
	var menuItemHtml = "snippets/menu-item-snippet.html";

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
	
	// Remove the class 'active' from home and switch to Menu button
	var switchMenuToActive = function () {
	  // Remove 'active' from home button
	  var classes = document.querySelector("#navHomeButton").className;
	  classes = classes.replace(new RegExp("active", "g"), "");
	  document.querySelector("#navHomeButton").className = classes;

	  // Add 'active' to menu button if not already there
	  classes = document.querySelector("#navMenuButton").className;
	  if (classes.indexOf("active") == -1) {
	    classes += " active";
	    document.querySelector("#navMenuButton").className = classes;
	  }
	};

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
	abc.loadMenuCategories = function (short_name) {
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
						// Switch CSS class active to menu button
          	switchMenuToActive();
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

	// Load the menu items view of a particular category 
	abc.loadMenuItems = function (categoryShortName) {
		showLoader("#main-content");
		$ajaxUtils.sendGetRequest(menuItemsUrl+categoryShortName, buildAndShowMenuItemsHTML)
	};

	function buildAndShowMenuItemsHTML(menuItemsRes) {
		//console.log(menuItemsRes);
		$ajaxUtils.sendGetRequest(menuItemTitleHtml, function (menuItemTitleHtmlRes) {
			//console.log(menuItemTitleHtmlRes);
			$ajaxUtils.sendGetRequest(menuItemHtml, function (menuItemHtmlRes) {
				// Switch CSS class active to menu button
         switchMenuToActive();
				//console.log(menuItemHtmlRes);
				var menuItemView = buildMenuItemsViewHtml(menuItemsRes, menuItemTitleHtmlRes, menuItemHtmlRes);
				//console.log(menuItemView);
				insertHtml("#main-content", menuItemView);
			}, false);
		}, false);
	}


	function buildMenuItemsViewHtml(menuItemsRes, menuItemTitleHtmlRes, menuItemHtmlRes) {
		var finalHtml = menuItemTitleHtmlRes;
		finalHtml = insertProperty(finalHtml, "name", menuItemsRes.category.name);
		finalHtml = insertProperty(finalHtml, "special_instructions", menuItemsRes.category.special_instructions);

		finalHtml += '<section class="row">';

		var menuItems = menuItemsRes.menu_items;
		var cat_short_name = menuItemsRes.category.short_name;

		for (var i = 0; i < menuItems.length; i++) {
			finalHtml += menuItemHtmlRes;

			finalHtml = insertProperty(finalHtml, "short_name", menuItems[i].short_name);
			finalHtml = insertProperty(finalHtml, "cat_short_name", cat_short_name);
			finalHtml = insertItemPrice(finalHtml, "price_small", menuItems[i].price_small);
	    finalHtml = insertItemPortionName(finalHtml, "small_portion_name", menuItems[i].small_portion_name);
	    finalHtml = insertItemPrice(finalHtml, "price_large", menuItems[i].price_large);
	    finalHtml = insertItemPortionName(finalHtml, "large_portion_name", menuItems[i].large_portion_name);
			finalHtml = insertProperty(finalHtml, "name", menuItems[i].name);
			finalHtml = insertProperty(finalHtml, "description", menuItems[i].description);

			if (i%2 != 0){
				finalHtml += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}
		}

		finalHtml += '</section>';

		return finalHtml;
	}

	function insertItemPrice(html, pricePropName, priceValue) {
		// If not specified, replace with empty string
	  if (!priceValue) {
	    return insertProperty(html, pricePropName, "");;
	  }

	  priceValue = "$" + priceValue.toFixed(2);
  	html = insertProperty(html, pricePropName, priceValue);
  	return html;

	}

	function insertItemPortionName(html, portionPropName, portionValue) {
		// If not specified, replace with empty string
	  if (!portionValue) {
	    return insertProperty(html, portionPropName, "");;
	  }
	  portionValue = "(" + portionValue + ")";
	  html = insertProperty(html, portionPropName, portionValue);
	  return html;
	}
	global.$abc = abc;

})(window);
