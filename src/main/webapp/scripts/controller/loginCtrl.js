mainModule
    .controller("loginCtrl", function ($scope, $window, Session, authenticateUrl, appUrl) {
        $scope.loginMovieDB = function () {
            $scope.getRequestToken(requestTokenCallback);
        };

        $scope.login = function (user) {

        };

        function requestTokenCallback(requestToken) {
            $window.location.href = authenticateUrl + requestToken + "?redirect_to=" + "http://localhost:8080/#/login";
            Session.set("requesttoken", requestToken);
        }

        function createSessionCallback(sessionId) {

        }
    });