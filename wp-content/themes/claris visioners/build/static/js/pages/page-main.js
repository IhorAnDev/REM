"use strict";

// const changed = require("gulp-changed");

$(function () {
  faqBlockFunc();
  function faqBlockFunc() {
    $('.faq__item').each(function () {
      $(this).click(function () {
        if ($(this).hasClass('opened')) {
          $('.faq__item').each(function () {
            $(this).removeClass('opened');
          });
        } else {
          $('.faq__item').each(function () {
            $(this).removeClass('opened');
          });
          $(this).addClass('opened');
        }
      });
    });
  }
  enableFeedbackSwiper();
  function enableFeedbackSwiper() {
    new Swiper('.feedback__bio', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 10,
      // Navigation arrows
      navigation: {
        nextEl: '.feedback-next',
        prevEl: '.feedback-prev'
      }
    });
    let totalSlides = 0;
    $('.swiper-slide').each(function () {
      if ($(this).attr('data-order') >= totalSlides) {
        totalSlides = $(this).attr('data-order');
      }
    });
    let currentSlide = $('.swiper-slide-active').attr('data-order');
    $('.feedback__text').each(function () {
      if ($(this).attr('data-order') !== currentSlide) {
        $(this).hide();
      }
    });
    $('.feedback__slide-number').text(`${currentSlide}/${totalSlides}`);
    $('.feedback-prev, .feedback-next').click(function () {
      currentSlide = $('.swiper-slide-active').attr('data-order');
      $('.feedback__slide-number').text(`${currentSlide}/${totalSlides}`);
      $('.feedback__text').each(function () {
        $(this).hide();
        if ($(this).attr('data-order') == currentSlide) {
          $(this).fadeIn(1000);
        }
      });
    });
  }
  ;
  if ($(window).outerWidth() < 1024) {
    enableGallerySwiperMobile();
  } else {
    enableGallerySwiperPC();
  }
  ;
  function enableGallerySwiperMobile() {
    new Swiper('.gallery', {
      // Optional parameters
      slidesPerView: "auto",
      direction: 'horizontal',
      loop: true,
      spaceBetween: 8,
      pagination: {
        el: ".gallery__pagination",
        clickable: true
      },
      // Navigation arrows
      navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev'
      }
    });
  }
  ;
  function enableGallerySwiperPC() {
    // new Swiper('.gallery', {
    //     // Optional parameters
    //     slidesPerView: "auto",
    //     // direction: 'horizontal',
    //     centeredSlides: true, //only difference between PC and mobile
    //     initialSlide: 1,
    //     loop: true,
    //     spaceBetween: 8,

    //     // Navigation arrows
    //     navigation: {
    //       nextEl: '.gallery-next',
    //       prevEl: '.gallery-prev',
    //     },
    // });

    $('.gallery__list').slick({
      infinite: true,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      initialSlide: 1,
      prevArrow: $('.gallery-prev'),
      nextArrow: $('.gallery-next')
    });
  }
  ;
  galleryLazyLoad();
  function galleryLazyLoad() {
    // document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadTimeout;
    function lazyload() {
      if (lazyloadTimeout) {
        clearTimeout(lazyloadTimeout);
      }
      lazyloadTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 50);
    }
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
    //    });
  }

  enableDonationTypeSwitcher();
  function enableDonationTypeSwitcher() {
    $('.payment__detailed-info').hide();
    $('.credit').show();
    $('.payment__type-item').click(function () {
      $('.payment__type-item').each(function () {
        $(this).removeClass('payment__type-item_active');
      });
      $(this).addClass('payment__type-item_active');
      if ($('.payment__type-item_cc').hasClass('payment__type-item_active')) {
        $('.payment__detailed-info').hide();
        $('.credit').show();
      } else if ($('.payment__type-item_bt').hasClass('payment__type-item_active')) {
        $('.payment__detailed-info').hide();
        $('.transfer').show();
      } else if ($('.payment__type-item_cr').hasClass('payment__type-item_active')) {
        $('.payment__detailed-info').hide();
        $('.crypto').show();
      } else if ($('.payment__type-item_pp').hasClass('payment__type-item_active')) {
        $('.payment__detailed-info').hide();
        $('.paypall').show();
      }
    });
  }
  ;
  donationsSettingsSwitcher();
  function donationsSettingsSwitcher() {
    $('.credit__frequency-item').click(function () {
      $('.credit__frequency-item').removeClass('credit__frequency-item_active');
      $(this).addClass('credit__frequency-item_active');
    });
    $('.level:nth-of-type(2)').addClass('level_active');
    $('.level').click(function () {
      $('.level').removeClass('level_active');
      $(this).addClass('level_active');
    });
    $('.transfer__currency-item:first-of-type').addClass('transfer__currency-item_active');
    $('.transfer__details-item:first-of-type').addClass('transfer__details-item_active');
    $('.transfer__currency-item').click(function () {
      $('.transfer__currency-item').removeClass('transfer__currency-item_active');
      $(this).addClass('transfer__currency-item_active');
      const $currency = $(this).attr('data-curr');
      $('.transfer__details-item').removeClass('transfer__details-item_active');
      $(`.transfer__details-item[data-curr="${$currency}"]`).addClass('transfer__details-item_active');
    });
  }
  ;
  enableClipboardCopy();
  function enableClipboardCopy() {
    function copyToClipboard(element) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(element).select();
      document.execCommand("copy");
      $temp.remove();
    }
    function createTextarea() {
      var $temp = $("<textarea>");
      $temp.addClass('temp-textarea');
      $("body").append($temp);
    }
    function collectDataFromTextArea() {
      $("body").find('.temp-textarea').select();
      document.execCommand("copy");
      $("body").find('.temp-textarea').remove();
    }
    $('.copy-bubble').fadeOut();
    $('.copy-all-bubble').fadeOut();
    $('.line-copy').click(function () {
      const string = $(this).parent().find('span').text();
      copyToClipboard(string);
      var bubble = $(this).find('.copy-bubble');
      bubble.fadeIn(600).fadeOut(600);
      $('.copy-boxes').show();
      $('.copy-tick').hide();
      $(this).find('.copy-boxes').hide();
      $(this).find('.copy-tick').show();
    });
    $('.copy-all').parents('.light-button').click(function () {
      const parentList = $(this).parents('.copy-all-container');
      const bankList = $(this).parents('.bank-list');
      function addToTextarea() {
        const val = $('.temp-textarea').val();
        if (val != '') {
          $('.temp-textarea').val(`${val}` + '\r\n' + `${$(this).text()}`);
        } else {
          $('.temp-textarea').val(`${$(this).text()}`);
        }
      }
      createTextarea();
      if (bankList.length > 0) {
        parentList.find("div[class$='general-list']").find("span[class$='value']").each(addToTextarea);
        bankList.find("span[class$='value']").each(addToTextarea);
      } else {
        parentList.find("div[class$='general-list']").find("span[class$='value']").each(addToTextarea);
      }
      collectDataFromTextArea();
      $(this).find('.copy-all-bubble').fadeIn(600).fadeOut(600);
    });
    $('.paypall__copy').parents('.light-button').click(function () {
      const email = $(this).find('.paypall__copy').attr('data-email');
      copyToClipboard(email);
      $(this).find('.copy-all-bubble').fadeIn(600).fadeOut(600);
    });
  }
  ;
  placeholderSlideAwayOnFocus();
  function placeholderSlideAwayOnFocus() {
    $('.credit form input[type="text"], .credit form input[type="email"], .credit form input[type="tel"]').focus(function () {
      $(this).parents('label').find('.input-placeholder').addClass('input-placeholder_slide-up');
    });
    $('.credit form input[type="text"], .credit form input[type="email"], .credit form input[type="tel"]').blur(function () {
      if ($(this).val() == '') {
        $(this).parents('label').find('.input-placeholder').removeClass('input-placeholder_slide-up');
      }
    });
  }
  acceptanceDecorativeCheckbox();
  function acceptanceDecorativeCheckbox() {
    $('.form-acceptance').change(function () {
      $(this).parents('.acceptance-checkbox-label').find('.decorative-checkbox').toggleClass('decorative-checkbox_checked');
      $('.form-submit-button').toggleClass('form-submit-button_disabled');
    });
    if (!$('.form-acceptance').prop('checked')) {
      $('.form-submit-button').addClass('form-submit-button_disabled');
    }
  }
  if ($(window).outerWidth() >= 1024) {
    scrollMagicAnimationPC();
  } else {
    scrollMagicAnimationMob();
  }
  function scrollMagicAnimationPC() {
    var controller = new ScrollMagic.Controller();

    // INTRO SECTION

    var introTl = gsap.timeline();
    introTl.from(".header__logo, .header__menu, .intro__title, .intro__subtitle", {
      opacity: 0,
      ease: Power2.easeOut,
      duration: 1.5
    }).fromTo(".intro__donation-button", {
      y: 500,
      ease: Power2.easeOut,
      duration: 2
    }, {
      y: 0
    }, "-=1.5").from(".intro__image_bottom-left", {
      y: 1000,
      ease: Power2.easeOut,
      duration: 1.5
    }, "-=2").from(".intro__image_top-right", {
      y: 1200,
      ease: Power2.easeOut,
      duration: 1.3
    }, "-=2").from(".intro__bubble", {
      opacity: 0,
      ease: Power2.easeOut,
      duration: 1
    }, "-=0.5").from(".intro__decoration-arrow_pc", {
      y: "-100%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=1").from(".intro__decoration-arrow_mobile", {
      x: "300%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=1");
    new ScrollMagic.Scene({
      triggerElement: ".intro",
      triggerHook: 0.9,
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(introTl).addTo(controller);

    // MILESTONES SECTION

    $('.milestones__item').each(function () {
      var milestonesTl = gsap.timeline();
      const colBlock = $(this).find('.milestones__coloured-block');
      let decorSideMovement = "200%";
      if (colBlock.css('order') == 2) {
        decorSideMovement = "-200%";
      }
      const uncolBlock = $(this).find('.milestones__uncoloured-block');
      const image = colBlock.find('.milestones__image');
      const decor = colBlock.find('.milestones__decoration');
      milestonesTl.from(colBlock, {
        y: 500,
        ease: Power2.easeOut,
        duration: 1
      }).from(uncolBlock, {
        y: 500,
        ease: Power2.easeOut,
        duration: 1
      }, "-=0.5").from(image, {
        width: "30%",
        height: "30%",
        ease: Power2.easeOut,
        duration: 1
      }, "-=1.5").from(decor, {
        x: decorSideMovement,
        ease: Power2.easeOut,
        duration: 1
      }, "-=1.5");
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.9,
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(milestonesTl).addTo(controller);
    });

    // TEAM SECTION

    var teamtopTl = gsap.timeline();
    teamtopTl.from(".team__title, .team__subtitle, .team__upper-text", {
      y: "300%",
      ease: Power2.easeOut,
      duration: 1
    }).from(".team__decoration_pc", {
      x: "-100%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=0.5");
    new ScrollMagic.Scene({
      triggerElement: '.team',
      // triggerHook: 0.9,
      offset: -450,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(teamtopTl).addTo(controller);
    $('.team__item').each(function () {
      var teamMiddleTl = gsap.timeline();
      var teamBottomTl = gsap.timeline();
      const id = $(this).attr('data-id');
      let topOffset;
      if (id % 3 == 1) {
        topOffset = "20%";
      } else if (id % 3 == 2) {
        topOffset = "10%";
      } else {
        topOffset = "30%";
      }
      teamMiddleTl.fromTo(this, {
        y: "100%",
        ease: Power2.easeOut,
        duration: 1
      }, {
        y: topOffset,
        ease: Power2.easeOut,
        duration: 1
      });
      teamBottomTl.to(this, {
        y: 0,
        ease: Power2.easeOut,
        duration: 1
      });
      new ScrollMagic.Scene({
        triggerElement: '.team',
        triggerHook: 0.9,
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(teamMiddleTl).addTo(controller);
      new ScrollMagic.Scene({
        triggerElement: '.team__list',
        triggerHook: 0.9,
        offset: 250,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(teamBottomTl).addTo(controller);
    });

    // INFOGRAPHICS SECTION

    var infographicsTl = gsap.timeline();
    infographicsTl.fromTo('.numbers__donation-button, .numbers__list-decoration_top, .numbers__list-decoration_middle', {
      y: '200%',
      ease: Power2.easeOut,
      duration: 1
    }, {
      y: 0,
      ease: Power2.easeOut
    });
    new ScrollMagic.Scene({
      triggerElement: '.numbers',
      triggerHook: 0.9,
      offset: 250,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(infographicsTl).addTo(controller);
    $('.numbers__item').each(function () {
      var numbersTl = gsap.timeline();
      let topOffset = 0;
      const id = $(this).attr('data-id');
      if (id == 1) {
        topOffset = "100%";
      } else if (id == 2) {
        topOffset = "0";
      } else if (id == 3 || id == 5) {
        topOffset = "70%";
      } else if (id == 4) {
        topOffset = "50%";
      } else {
        topOffset = "80%";
      }
      numbersTl.from($(this), {
        y: topOffset,
        ease: Power2.easeOut,
        duration: 1
      });
      new ScrollMagic.Scene({
        triggerElement: '.numbers',
        triggerHook: 0.9,
        offset: 250,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(numbersTl).addTo(controller);
    });
    var schemeTl = gsap.timeline();
    schemeTl.from('.scheme', {
      y: '30%',
      ease: Power2.easeOut,
      duration: 1
    }).from('.scheme__decoration_pc', {
      opacity: '0',
      ease: Power2.easeOut,
      duration: 1
    });
    new ScrollMagic.Scene({
      triggerElement: '.scheme',
      triggerHook: 0.9,
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(schemeTl).addTo(controller);

    // VALUES SECTION

    var valuesTl = gsap.timeline();
    valuesTl.from('.values', {
      y: '30%',
      ease: Power2.easeOut,
      duration: 1
    }).from('.values__image', {
      width: '30%',
      height: '30%',
      ease: Power2.easeOut,
      duration: 1
    }, "-=1");
    new ScrollMagic.Scene({
      triggerElement: '.values',
      triggerHook: 0.9,
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(valuesTl).addTo(controller);
  }
  ;
  function scrollMagicAnimationMob() {
    var controller = new ScrollMagic.Controller();

    // INTRO SECTION

    var introTl = gsap.timeline();
    introTl.from(".header__logo, .header__menu, .intro__title, .intro__subtitle", {
      opacity: 0,
      ease: Power2.easeOut,
      duration: 1.5
    }).fromTo(".intro__donation-button", {
      y: 200,
      ease: Power2.easeOut,
      duration: 2
    }, {
      y: 0
    }, "-=1.5").from(".intro__image_bottom-left", {
      y: 500,
      ease: Power2.easeOut,
      duration: 1.5
    }, "-=2").from(".intro__image_top-right", {
      y: 600,
      ease: Power2.easeOut,
      duration: 1.3
    }, "-=2").from(".intro__bubble", {
      opacity: 0,
      ease: Power2.easeOut,
      duration: 1
    }, "-=0.5").from(".intro__decoration-arrow_pc", {
      y: "-100%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=1").from(".intro__decoration-arrow_mobile", {
      x: "300%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=1");
    new ScrollMagic.Scene({
      triggerElement: ".intro",
      triggerHook: 1,
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(introTl).addTo(controller);

    // MILESTONES SECTION

    $('.milestones__item').each(function () {
      var milestonesTl = gsap.timeline();
      var milestonesUncolTl = gsap.timeline();
      const colBlock = $(this).find('.milestones__coloured-block');
      let decorSideMovement = "200%";
      if (colBlock.css('order') == 2) {
        decorSideMovement = "-200%";
      }
      const uncolBlock = $(this).find('.milestones__uncoloured-block');
      const image = colBlock.find('.milestones__image');
      const decor = colBlock.find('.milestones__decoration');
      milestonesTl.from(colBlock, {
        y: 500,
        ease: Power2.easeOut,
        duration: 1
      }).from(image, {
        width: "30%",
        height: "30%",
        ease: Power2.easeOut,
        duration: 1
      }, "-=1").from(decor, {
        x: decorSideMovement,
        ease: Power2.easeOut,
        duration: 1
      }, "-=1");
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 'onEnter',
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(milestonesTl).addTo(controller);
      const uncol = this.querySelector('.milestones__uncoloured-block');
      milestonesUncolTl.from(uncolBlock, {
        opacity: '0',
        ease: Power2.easeOut,
        duration: 1
      });
      new ScrollMagic.Scene({
        triggerElement: uncol,
        triggerHook: 'onEnter',
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(milestonesUncolTl).addTo(controller);
    });

    // TEAM SECTION

    var teamtopTl = gsap.timeline();
    teamtopTl.from(".team__title, .team__subtitle, .team__upper-text", {
      y: "300%",
      ease: Power2.easeOut,
      duration: 1
    }).from(".team__decoration_pc", {
      x: "-100%",
      ease: Power2.easeOut,
      duration: 1
    }, "-=0.5");
    new ScrollMagic.Scene({
      triggerElement: '.team',
      // triggerHook: 0.9,
      offset: -450,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(teamtopTl).addTo(controller);
    $('.team__item').each(function () {
      var teamMiddleTl = gsap.timeline();
      const id = $(this).attr('data-id');
      let sideOffset;
      if (id % 2 == 1) {
        sideOffset = "-20%";
      } else {
        sideOffset = "20%";
      }
      teamMiddleTl.from(this, {
        opacity: '0',
        x: sideOffset,
        ease: Power2.easeOut,
        duration: 0.7
      });
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 'onEnter',
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(teamMiddleTl).addTo(controller);
    });

    // INFOGRAPHICS SECTION

    var infographicsTl = gsap.timeline();
    infographicsTl.fromTo('.numbers__donation-button, .numbers__list-decoration_top, .numbers__list-decoration_middle', {
      y: '200%',
      ease: Power2.easeOut,
      duration: 1
    }, {
      y: 0,
      ease: Power2.easeOut
    });
    new ScrollMagic.Scene({
      triggerElement: '.numbers',
      triggerHook: 0.8,
      offset: 250,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(infographicsTl).addTo(controller);
    $('.numbers__item').each(function () {
      var numbersTl = gsap.timeline();
      let sideOffset = 0;
      let rotation = 0;
      const id = $(this).attr('data-id');
      if (id % 2 == 1) {
        sideOffset = "200%";
        rotation = 360;
      } else {
        sideOffset = "-200%";
        rotation = -360;
      }
      numbersTl.from($(this), {
        rotation: rotation,
        x: sideOffset,
        ease: Power2.easeOut,
        duration: 1
      });
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: "onEnter",
        offset: 50,
        // move trigger to center of element
        reverse: false // only do once
      }).setTween(numbersTl).addTo(controller);
    });
    var schemeTl = gsap.timeline();
    schemeTl.from('.scheme', {
      opacity: '0.3',
      y: '10%',
      ease: Power2.easeOut,
      duration: 1
    }).from('.scheme__decoration_pc', {
      opacity: '0',
      ease: Power2.easeOut,
      duration: 1
    });
    new ScrollMagic.Scene({
      triggerElement: '.scheme',
      triggerHook: 'onEnter',
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(schemeTl).addTo(controller);

    // VALUES SECTION

    var valuesTl = gsap.timeline();
    valuesTl.from('.values', {
      opacity: '0.3',
      y: '10%',
      ease: Power2.easeOut,
      duration: 1
    }).from('.values__image', {
      width: '30%',
      height: '30%',
      ease: Power2.easeOut,
      duration: 1
    }, "-=1");
    new ScrollMagic.Scene({
      triggerElement: '.values',
      triggerHook: 'onEnter',
      offset: 50,
      // move trigger to center of element
      reverse: false // only do once
    }).setTween(valuesTl).addTo(controller);
  }
  ;
  replaceUnderline();
  function replaceUnderline() {
    var underlinedList = $('span[style="text-decoration: underline;"');
    underlinedList.each(function () {
      $(this).css("text-decoration", "none");
      if ($(this).parents('.numbers__item_blue').length >= 1 || $(this).parents('.footer__sublogo').length >= 1) {
        $(this).addClass('yellow-underline');
      } else {
        $(this).addClass('blue-underline');
      }
    });
  }
  addValuesToCF7Email();
  function addValuesToCF7Email() {
    const inputFreq = $('#freq');
    const inputPack = $('#pack');
    const inputAmount = $('#amount');
    inputFreq.val($('.credit__frequency-item_active').text());
    $('.credit__frequency-item').click(function () {
      inputFreq.val($('.credit__frequency-item_active').text());
    });
    inputPack.val($('.level_active span:first-child').text());
    $('.level').click(function () {
      inputPack.val($('.level_active span:first-child').text());
    });
    inputAmount.val($('.level_active span:nth-child(2)').text());
    $('.level').click(function () {
      if (!$(this).hasClass('credit__custom-level')) {
        inputAmount.val($('.level_active span:nth-child(2)').text());
      } else {
        if ($('.level_active input').val() != '') {
          inputAmount.val($('.level_active input').val());
        } else {
          inputAmount.val(0);
        }
      }
    });
    $('.credit__custom-level-amount').change(function () {
      inputAmount.val($(this).val());
    });
  }
  formSubmitOnDivClick();
  function formSubmitOnDivClick() {
    $('.credit__form .form-submit-button').click(function (event) {
      if (!$(this).hasClass('form-submit-button_disabled') && event.target === this) {
        $('.wpcf7-submit').click();
        event.stopPropagation();
      }
    });
  }
});
$(document).on('reset', '.credit__form form', function (e) {
  e.preventDefault();
});
let order_id;
$(document).on('wpcf7mailsent', '.credit__form form', function (e) {
  $('.wpcf7-response-output').hide();
  const public_key = 'i2932818653';
  const currency = $('.payment__detailed-info.credit').data('currency');
  const lang = $('.payment__detailed-info.credit').data('lang');
  let first_name = $('.form-input_first-name').val();
  let last_name = $('.form-input_last-name').val();
  let phone = $('.form-input_phone').val();
  let email = $('.form-input_email').val();
  let donate_type = $('.credit__frequency-item_active').data('donate-type');
  let donate_amount;
  if ($('.credit__custom-level').hasClass('level_active')) {
    donate_amount = parseInt($('.credit__custom-level-amount').val().replace(/[^\d]/g, ''));
  } else {
    donate_amount = parseInt($('.level_active').data('donate-amount').replace(/[^\d]/g, ''));
  }
  let description;
  if (lang == "en") {
    if (donate_type == 'pay') {
      description = `One-time assistance from ${first_name} ${last_name}, tel. ${phone}, e-mail: ${email}`;
    } else {
      description = `Monthly assistance from ${first_name} ${last_name}, tel. ${phone}, e-mail: ${email}`;
    }
  } else {
    if (donate_type == 'pay') {
      description = `Одноразова допомога від ${first_name} ${last_name}, тел. ${phone}, e-mail: ${email}`;
    } else {
      description = `Щомісячна допомога від ${first_name} ${last_name}, тел. ${phone}, e-mail: ${email}`;
    }
  }
  let posted_data = {
    'first_name': first_name,
    'last_name': last_name,
    'phone': phone,
    'email': email,
    'donate_type': donate_type,
    'donate_amount': donate_amount,
    'currency': currency
  };

  // Create post
  $.ajax({
    url: ajaxurl,
    type: 'POST',
    data: {
      'action': 'donate_create',
      'posted_data': posted_data,
      "order_id": order_id
    },
    success: function (result) {
      // Liqpay
      order_id = result;
      let api;
      if (donate_type == 'pay') {
        api = {
          'action': 'pay',
          "public_key": public_key,
          "action": donate_type,
          "amount": donate_amount,
          "order_id": order_id,
          "currency": currency,
          "version": "3",
          "description": description
        };
      }
      if (donate_type == 'subscribe') {
        api = {
          'action': 'subscribe',
          'subscribe': '1',
          "public_key": public_key,
          "action": donate_type,
          "amount": donate_amount,
          "order_id": order_id,
          "currency": currency,
          "version": "3",
          "description": description,
          'subscribe_date_start': new Date().getTime(),
          'subscribe_periodicity': 'month'
        };
      }
      $.ajax({
        url: ajaxurl,
        type: 'POST',
        data: {
          'action': 'liqpay',
          'api': api
        },
        success: function (result) {
          // Liqpay checkout
          var result = JSON.parse(result);
          $('#liqpay_checkout .liqpay_frame').empty();
          LiqPayCheckout.init({
            data: result.data,
            signature: result.signature,
            embedTo: "#liqpay_checkout .liqpay_frame",
            language: lang == 'en' ? 'en' : 'uk',
            mode: "embed" // embed || popup
          }).on("liqpay.callback", function (data) {
            if (data.status == 'success' || data.status == 'failure' || data.status == 'subscribed') {
              order_id = undefined;
            }
            // Add status for donate post
            $.ajax({
              url: ajaxurl,
              type: 'POST',
              data: {
                'action': 'liqpay_post_status',
                'post_status': data.status,
                'post_id': order_id,
                'transaction_id': data.transaction_id
              },
              success: function (result) {}
            });
          }).on("liqpay.ready", function (data) {
            // Open pay form
            $('#liqpay_checkout, #liqpay_checkout-back').fadeIn();
            $('#liqpay_checkout-back, .liqpay_checkout_close').click(function () {
              $('#liqpay_checkout, #liqpay_checkout-back').fadeOut();
            });
          }).on("liqpay.close", function (data) {
            // Close pay form
            $('#liqpay_checkout .liqpay_frame').empty();
          });
        }
      });
    }
  });
});
$('.credit__custom-level').on('click', function () {
  $(this).find('.credit__custom-level-amount').focus();
});