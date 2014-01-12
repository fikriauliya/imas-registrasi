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
        $("#myModal").modal("show");
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
          $("#myModal").modal("show");
          $scope.registrants.push(data.doc);
        } else {
          alert("Error");
        }
      }).
      error(function(data, status, headers, config){
        alert("Error");
      });
  };

  $scope.edit = function(registrant){
    registrant.state = "edit";
  }

  $scope.update = function(registrant){
    $http.put("update", registrant)
      .success(function(data, status, headers, config){
        console.log("Updated!");
        registrant.state = "normal";
      }).
      error(function(data, status, headers, config){
        alert("Error");
      });
  }

  $scope.search_changed = function() {
    $scope.new_name = $scope.search;
  }

  var myModal = $('#myModal').on('shown.bs.modal', function () {
      clearTimeout(myModal.data('hideInteval'))
      var id = setTimeout(function(){
        myModal.modal('hide');
        scope = angular.element($("#index_ctrl")).scope();
        scope.$apply(function() {
          scope.search = "";
        });
      }, 1000);
      myModal.data('hideInteval', id);
  });
}