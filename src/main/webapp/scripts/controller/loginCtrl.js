mainModule
    .controller("loginCtrl", function ($scope, $window, authenticateUrl, appUrl) {
        $scope.login = function (user) {
            $scope.getRequestToken(requestTokenCallback);
        };

        function requestTokenCallback(requestToken) {
            $window.location.href = authenticateUrl + requestToken + "?redirect_to=" + appUrl;
        }
    });