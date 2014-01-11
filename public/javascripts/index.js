var myApp = angular.module('myApp', ['toggle-switch']);

myApp.factory('Registrants', function() {
  var registrants = registrations;
  return registrants;
});

function IndexCtrl($scope, $http, Registrants) {
  $scope.registrants = Registrants;

  $scope.attending_changed = function(registrant) {
    console.log("attending_changed: " + registrant.name);
    $http.put("update", registrant)
      .success(function(data, status, headers, config){
        registrant.attending = data.new_value;
      }).
      error(function(data, status, headers, config){
        registrant.attending = !registrant.attending;
      });
  }
}