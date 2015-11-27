/* global angular */
"use strict";

var app = angular.module("Agenda", ["filters"]);

angular.module("filters", []);

app.controller("MainController", ["$scope", function($scope) {

  $scope.events = {
    "2015-11-16": [{ "description": "Soirée vision" }],
    "2015-11-22": [{ "description": "Conseil d'église" }]
  };

  var today = Date.today(),
      lastMonday = null,
      firstMonday = null;

  $scope.weeks = [];

  generateMonth();

  function generateMonth() {
    var firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if(firstOfTheMonth.is().monday()) { 
      lastMonday = firstOfTheMonth;
    } else {
      lastMonday = firstOfTheMonth.last().monday();
    }

    firstMonday = angular.copy(lastMonday).last().monday();

    while(lastMonday.getMonth() !== today.getMonth() + 1) {
      nextWeek();
    }
  }

  function generateWeek(day) {
    var week = {},
        day = angular.copy(day);
    for(var i=1; i <= 7; i++) {
      var key = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      if($scope.events[key] === undefined) {
        week[key] = null;
      } else {
        week[key] = $scope.events[key];
      }
      day.next().day();
    }
    return week;
  }

  function nextWeek() {
    $scope.weeks.push(generateWeek(lastMonday));
    lastMonday.next().monday();
  }

  function previousWeek() {
    $scope.weeks.unshift(generateWeek(firstMonday));
    firstMonday.last().monday();
  }

}]);