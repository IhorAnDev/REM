"use strict";

$(document).ready(function () {
  if ($(window).outerWidth() < 1024) {
    hideHeader();
  } else {
    hideMenu();
  }

  ;

  function hideHeader() {
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      if (!$('body').hasClass('link-scrolling')) {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          $('body').removeClass(scrollUp);
          return;
        }

        if (currentScroll > lastScroll && !$('body').hasClass(scrollDown)) {
          // down
          $('body').removeClass(scrollUp);
          $('body').addClass(scrollDown);
        } else if (currentScroll < lastScroll && $('body').hasClass(scrollDown)) {
          // up
          $('body').removeClass(scrollDown);
          $('body').addClass(scrollUp); // }
        }

        lastScroll = currentScroll;
      }
    });
    $('.navigation__item, .header__donation-button, .navigation__donation-button, .intro__donation-button, .numbers__donation-button, .scheme__donation-button').click(function () {
      $('body').removeClass();
      $('body').addClass('link-scrolling');
      $('.header__menu').removeClass('header__menu_open');

      function scrollFinishedCheck() {
        var timer = null;
        window.addEventListener('scroll', function check() {
          if (timer !== null) {
            clearTimeout(timer);
          }

          timer = setTimeout(function () {
            $('body').removeClass('link-scrolling');
            window.removeEventListener('scroll', check);
          }, 150);
        }, false);
      }

      scrollFinishedCheck();
      $('body').addClass('scroll-down');
    });
  }

  ;

  function hideMenu() {
    $('.navigation__item, .header__donation-button, .navigation__donation-button, .intro__donation-button, .numbers__donation-button, .scheme__donation-button').click(function () {
      $('.header__menu').removeClass('header__menu_open');
    });
  }

  burgerToggle();

  function burgerToggle() {
    $('.header__toggle').click(() => {
      if ($(window).outerWidth() >= 1024) {
        if (!$('.header__menu').hasClass('header__menu_open')) {
          $('.header__menu').addClass('header__menu_open');
          $('.header__button-group').css('opacity', 0);

          function drawMenu() {
            const topStringHeight = $('.header__button-group').outerHeight();
            const menuPadding = 40;

            if ($('.navigation').outerHeight() >= $('.navigation__content').outerHeight() + topStringHeight + menuPadding * 3) {
              $('.navigation__content').css("height", `auto`);
              $('.navigation__content-wrapper').css({
                "margin": `${topStringHeight + menuPadding * 2}px 0 0`
              });
              $('.navigation__bottom-link').css({
                "margin-bottom": "0"
              });
            } else {
              $('.navigation__content-wrapper').css({
                "margin": `${topStringHeight + menuPadding * 2}px 0 0`
              });
              $('.navigation__content').css({
                "overflow": "scroll",
                "margin": "0",
                "height": `${$('.navigation').outerHeight() - (topStringHeight + menuPadding * 2)}px`
              });
              $('.navigation__list').css('height', $('.navigation__list').outerHeight());
              $('.navigation__bottom-link').css({
                'height': $('.navigation__bottom-link').outerHeight(),
                "margin-bottom": "40px"
              });
            }

            $('.header__navigation-wrapper').css("height", `${$('body').outerHeight()}px`);

            function displayText() {
              $('.navigation__content').css('opacity', 1);
              $('.header__button-group').css('opacity', 1);
            }

            setTimeout(displayText, 200);
          }

          ;
          setTimeout(drawMenu, 600);
        } else {
          $('.navigation__content').css('opacity', 0);
          $('.header__button-group').css('opacity', 0);

          function shrinkMenu() {
            $('.header__menu').removeClass('header__menu_open');
            $('.header__button-group').css('opacity', 1);
          }

          setTimeout(shrinkMenu, 300);
        }
      } else {
        $('.header__menu').toggleClass('header__menu_open');
        $('body').toggleClass('fixed');
      }

      ;
    });
  }

  ;

  if ($(window).outerWidth() < 1024) {
    navigationHeight();
  }

  ;

  function navigationHeight() {
    const headerHeight = $('.header').outerHeight();
    $('.navigation').css({
      'height': `calc(100vh - ${headerHeight}px)`
    });
  }

  ;
  enableLanguageSwitch();

  function enableLanguageSwitch() {
    const currentLang = $('main').attr('data-lang');
    $('.language__item').each(function () {
      $(this).removeClass('language__item_active');

      if ($(this).find('.language__text').attr('data-lang') !== currentLang) {
        $(this).addClass('language__item_active');
      }
    });
  }

  ;
}); // Полифилы
// forEach IE 11

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}