jQuery(function ($) {
  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
      .parent()
      .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
  });
});





$(document).ready(function() {
  $('.input-number').prop('disabled', true);
  $('.quantity-right-plus').click(function() {
    $('.input-number').val(parseInt($('.input-number').val()) + 1 );
  });

  $('.quantity-left-minus').click(function() {
    $('.input-number').val(parseInt($('.input-number').val()) - 1 );
      if ($('.input-number').val() == 0) {
        $('.input-number').val(1);
      }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() >= 300) {
      $('button.shop__to-top').addClass('show');
    } else {
      $('button.shop__to-top').removeClass('show');
    }
  });

  $('button.shop__to-top').click(function() { 
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
});

