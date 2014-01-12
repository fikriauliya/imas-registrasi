var myApp = angular.module('myApp', ['toggle-switch']);

myApp.factory('Registrants', function() {
  var registrants = registrations;
  return registrants;
});

function IndexCtrl($scope, $http, Registrants) {
  $scope.registrants = Registrants;
  $scope.search = "";

  $scope.attending_changed = function(registrant) {
    console.log("attending_changed: " + registrant.name);
    $http.put("update", registrant)
      .success(function(data, status, headers, config){
        registrant.attending = data.new_value;
        $scope.search = "";
      }).
      error(function(data, status, headers, config){
        registrant.attending = !registrant.attending;
        alert("Error");
      });
  };

  $scope.clear = function() {
    $scope.search = "";
  };

  $scope.create = function(new_name, new_email, new_phone) {
    console.log("New registrant: " + new_name + " | " + new_email + " | " + new_phone);
    var new_registrant = {
      name: new_name,
      email: new_email,
      phone: new_phone
    }
    $http.post("create", new_registrant)
      .success(function(data, status, headers, config){
        if (data.status == "created"){
          $scope.registrants.push(data.doc);
        } else {
          alert("Error");
        }
      }).
      error(function(data, status, headers, config){
        alert("Error");
      });
  };

  $scope.search_changed = function() {
    $scope.new_name = $scope.search;
  }
}