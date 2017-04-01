mainModule
    .controller("genreCtrl", function ($scope, Broadcast, Session, ON_GENRES) {
        Broadcast.register($scope, ON_GENRES, "genres");
        Broadcast.register($scope, ON_SELECTEDGENRES, "selectedGenres");

        $scope.selectGenre = function (id) {
            if ($scope.selectedGenres.includes(id)) {
                $scope.selectedGenres.splice($scope.selectedGenres.indexOf(id), 1);
            } else {
                $scope.selectedGenres.push(id);
            }
            Session.set("genres", $scope.selectedGenres);
        };
    });