mainModule
    .controller("movieCtrl", function ($scope, $window, Url, Logger, Broadcast, Watchlist, Session, baseUrlImage, imageSizeList, imageSizeCarousel,
                                       youtubeWatchUrl, REST, ON_GENRES, ON_SELECTEDGENRES, ON_MOVIES, ON_IMAGES, ON_CAROUSEL, ON_REVIEWS, ON_SELECTEDMOVIE, ON_SIMILARMOVIES,
                                       ON_RECOMMANDEDMOVIES, ON_ASSOCIATEDMOVIES, ON_ACCOUNTDETAILS, ON_VIDEOS) {
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

        $scope.getMovieList = function (path) {
            REST.getMovieList(path);
        };

        $scope.getImages = function (id) {
            REST.getImages(id);
        };

        $scope.getReviews = function (movie) {
            REST.getReviews(movie);
        };

        $scope.getVideos = function (movie) {
            REST.getVideos(movie);
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
            Broadcast.send(ON_MOVIES, Watchlist.getWatchlist());
        };

        $scope.getImageUrl = function (size, path) {
            return baseUrlImage + size + path;
        };

        $scope.hideCarousel = function () {
            Broadcast.send(ON_CAROUSEL, false);
        };

        $scope.setAssociatedMovies = function (type) {
            $scope.associatedMovies = type == "similar" ? $scope.similarMovies : $scope.recommendedMovies;
        };

        $scope.getAssociatedMovies = function (movie) {
            REST.getSimilarMovies(movie);
            REST.getRecommendedMovies(movie);
        };

        $scope.startVideo = function (key) {
            $window.open(Url.init(youtubeWatchUrl).param("v", key).build(), "_blank");
        };

        $scope.showErrorRequired = function (element) {
            return element.$dirty && element.$error.required;
        };

        $scope.imageSizeList = imageSizeList;
        $scope.imageSizeCarousel = imageSizeCarousel;
        $scope.$parent.selectedMovie = null;

        Broadcast.register($scope, ON_GENRES, "genres");
        Broadcast.register($scope, ON_SELECTEDGENRES, "selectedGenres");
        Broadcast.register($scope, ON_MOVIES, "movies");
        Broadcast.register($scope, ON_IMAGES, "images");
        Broadcast.register($scope, ON_CAROUSEL, "showCarousel");
        Broadcast.register($scope, ON_REVIEWS, "reviews");
        Broadcast.register($scope, ON_SELECTEDMOVIE, "selectedMovie");
        Broadcast.register($scope, ON_SIMILARMOVIES, "similarMovies");
        Broadcast.register($scope, ON_ASSOCIATEDMOVIES, "associatedMovies");
        Broadcast.register($scope, ON_RECOMMANDEDMOVIES, "recommendedMovies");
        Broadcast.register($scope, ON_ACCOUNTDETAILS, ["username", "name", "avatar"]);
        Broadcast.register($scope, ON_VIDEOS, "videos");
    });