mainModule
    .controller("loginCtrl", function ($scope, $window, Session, authenticateUrl, appUrl, REST) {
        $scope.loginMovieDB = function () {
            REST.getRequestToken(requestTokenCallback);
        };

        $scope.login = function (user) {

        };

        function requestTokenCallback(requestToken) {
            $window.location.href = authenticateUrl + requestToken + "?redirect_to=" + appUrl;
            Session.set("requesttoken", requestToken);
        }


    });