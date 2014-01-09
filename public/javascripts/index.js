var myApp = angular.module('myApp', []);

myApp.factory('Registrants', function() {
  var registrants = registrations;
  return registrants;
});

function IndexCtrl($scope, Registrants) {
  console.log("Executed");
  console.log(Registrants);
  $scope.registrants = Registrants;
}