/* global angular */
"use strict";

var module = angular.module("directives");

module.directive("monthAttributes", function() {

  return function(scope, element, attrs) {
    if(attrs.monthAttributes !== "") {
      element[0].classList.add("has-month");
    }
    if(attrs.monthAttributes === scope.currentMonth) {
      element[0].id = "current-month";
    }
  };

});

module.directive("dayAttributes", function() {

  return function(scope, element, attrs) {
    if(attrs.month !== "") {
      if(attrs.day > 7) {
        element[0].classList.add("end-of-month");
      } else {
        element[0].classList.add("start-of-month");
      }
    }
    if(attrs.day === "1") {
      element[0].classList.add("first-of-month");
    }
    if(attrs.date == scope.today) {
      element[0].classList.add("current");
    }
  };

});
