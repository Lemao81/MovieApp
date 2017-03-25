mainModule
    .controller("loginCtrl", function ($scope) {
        $scope.login = function (user) {
            alert("Name: " + user.name + ", Passwort: " + user.password);
        };
    });