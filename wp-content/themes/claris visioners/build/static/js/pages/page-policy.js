"use strict";

$(function () {
  orderedListNumbersAssign();

  function orderedListNumbersAssign() {
    var allOl = $('.content__container').find('ol');
    allOl.each(function () {
      $(this).find('li').each(function (index) {
        let styledIndex;

        if (index < 9) {
          styledIndex = `0${index + 1}`;
        } else {
          styledIndex = index + 1;
        }

        const number = $("<span>");
        number.addClass("ordered-list-number");
        number.text(styledIndex);
        $(this).prepend(number);
      });
    });
  }

  ;
  donateButtonLinkChange();

  function donateButtonLinkChange() {
    $('.header__donation-button').attr('href', `${window.location.origin}/#donate`);
  }

  ;
});