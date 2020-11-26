
// load Account Wrapper
const loadAccountWrap = (user) => {

  const accountWrap = document.querySelector('.account-wrap');
  if (user) {
    let html = '';
    const li = `
      <div class="account-item clearfix js-item-menu">
          <div class="image">
              <img src="images/icon/avatar-01.jpg" alt="John Doe" />
          </div>
          <div class="content">
              <a class="js-acc-btn" href="#">john doe</a>
          </div>
          <div class="account-dropdown js-dropdown">
              <div class="info clearfix">
                  <div class="image">
                      <a href="#">
                          <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                      </a>
                  </div>
                  <div class="content">
                      <h5 class="name">
                          <a href="#">john doe</a>
                      </h5>
                      <span class="email">${user.email}</span>
                  </div>
              </div>
              <div class="account-dropdown__body">
                  <div class="account-dropdown__item">
                      <a href="#">
                          <i class="zmdi zmdi-account"></i>Account</a>
                  </div>
                  <div class="account-dropdown__item">
                      <a href="#">
                          <i class="zmdi zmdi-settings"></i>Settings</a>
                  </div>
              </div>
              <div class="account-dropdown__footer">
                  <a href="#" class="logout">
                      <i class="zmdi zmdi-power"></i>Logout</a>
              </div>
          </div>
      </div>
    `;
    html += li;
    accountWrap.innerHTML = html;
  } else {
    accountWrap.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
  

};

document.addEventListener("DOMContentLoaded", function (event) {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        //location.replace("../dashboard.html");
        //loadAccountWrap(user);
      } else {
        location.replace("../index.html");
        console.log("user logged out");
      }
    });
});



(function ($) {
  // USE STRICT
  "use strict";

  // Dropdown 
  try {
    var menu = $('.js-item-menu');
    var sub_menu_is_showed = -1;

    for (var i = 0; i < menu.length; i++) {
      $(menu[i]).on('click', function (e) {
        e.preventDefault();
        $('.js-right-sidebar').removeClass("show-sidebar");        
        if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = -1;
        }
        else {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).removeClass("show-dropdown");
          }
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = jQuery.inArray(this, menu);
        }
      });
    }
    $(".js-item-menu, .js-dropdown").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
    });

  } catch (error) {
    console.log(error);
  }

  


  try {
    // Hamburger Menu
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      $('.navbar-mobile').slideToggle('500');
    });
    $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
      $(this).toggleClass('active');
      $(dropdown).slideToggle('500');
      return false;
    });
  } catch (error) {
    console.log(error);
  }
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Load more
  try {
    var list_load = $('.js-list-load');
    if (list_load[0]) {
      list_load.each(function () {
        var that = $(this);
        that.find('.js-load-item').hide();
        var load_btn = that.find('.js-load-btn');
        load_btn.on('click', function (e) {
          $(this).text("Loading...").delay(1500).queue(function (next) {
            $(this).hide();
            that.find(".js-load-item").fadeToggle("slow", 'swing');
          });
          e.preventDefault();
        });
      })

    }
  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  try {
    
    $('[data-toggle="tooltip"]').tooltip();

  } catch (error) {
    console.log(error);
  }

  // Chatbox
  try {
    var inbox_wrap = $('.js-inbox');
    var message = $('.au-message__item');
    message.each(function(){
      var that = $(this);

      that.on('click', function(){
        $(this).parent().parent().parent().toggleClass('show-chat-box');
      });
    });
    

  } catch (error) {
    console.log(error);
  }

})(jQuery);


// listen for auth status changes




