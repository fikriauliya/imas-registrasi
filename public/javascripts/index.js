var myApp = angular.module('myApp', []);

console.log("Executed");

myApp.factory('Registrants', function() {
  var registrants = [{
      name: "Irma Detia Rini",
      address: "Segar road",
      phone: 93725561
    },
    {
      name: "Pahlevi Fikri Auliya",
      address: "NTU",
      phone: 91765956
    }];
  return registrants;
});

function IndexCtrl($scope, Registrants) {
  console.log("Executed");
  console.log(Registrants);
  $scope.registrants = Registrants;
}