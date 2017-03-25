mainModule
    .controller("loginCtrl", function ($scope, $window, authenticateUrl, appUrl) {
        $scope.loginMovieDB = function () {
            $scope.getRequestToken(requestTokenCallback);
        };

        $scope.login = function (user) {

        };

        function requestTokenCallback(requestToken) {
            $window.location.href = authenticateUrl + requestToken + "?redirect_to=" + "http://localhost:8080/#/login";
            $window.sessionStorage.setItem("requesttoken", requestToken);
        }

        function createSessionCallback(sessionId) {

        }
    });