mainModule
    .controller("movieCtrl", function ($scope, Watchlist, imageBaseUrl, imageSizeList, imageSizeCarousel) {
        $scope.selectGenre = function (id) {
            if ($scope.selectedGenres.includes(id)) {
                $scope.selectedGenres.splice($scope.selectedGenres.indexOf(id), 1);
            } else {
                $scope.selectedGenres.push(id);
            }
        };

        $scope.genreIdsToString = function (ids) {
            var result = "";
            ids.forEach(function (id) {
                var genre = $scope.genres.find(function (genre) {
                    return genre.id == id;
                });
                if (genre) {
                    if (result.length > 0) {
                        result += ", ";
                    }
                    result += genre.name;
                }
            });
            return result;
        };

        $scope.addToWatchlist = function (movie) {
            Watchlist.addToWatchlist(movie)
        };

        $scope.removeFromWatchlist = function (movie) {
            Watchlist.removeFromWatchlist(movie)
        };

        $scope.watchlistContainsMovie = function (movie) {
            return Watchlist.watchlistContainsMovie(movie);
        };

        $scope.getWatchlistCount = function () {
            return Watchlist.getWatchlist().length;
        };

        $scope.showWatchlist = function () {
            $scope.$parent.movies = Watchlist.getWatchlist();
        };

        $scope.getImageUrl = function (size, path) {
            return imageBaseUrl + size + path;
        };

        $scope.hideCarousel = function () {
            $scope.showCarousel = false;
        };

        $scope.imageSizeList = imageSizeList;
        $scope.imageSizeCarousel = imageSizeCarousel;
        $scope.$parent.showCarousel = false;
        $scope.$parent.selectedMovie = null;

        $scope.getGenreList();
        $scope.getMovieList("upcoming");
    });