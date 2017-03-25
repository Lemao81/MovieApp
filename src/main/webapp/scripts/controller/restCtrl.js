mainModule
    .controller("restCtrl", function ($scope, $http, Logger, Url) {
        $scope.getGenreList = function () {
            $http.get(Url.base("/genre/movie/list").apiKey().build())
                .then(function (data) {
                    $scope.genres = data.data.genres;
                    var ids = [];
                    $scope.genres.forEach(function (genre) {
                        ids.push(genre.id);
                    });
                    $scope.selectedGenres = ids;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getMovieList = function (path) {
            $http.get(Url.baseMovie(path).apiKey().build())
                .then(function (data) {
                    $scope.movies = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getImages = function (id) {
            $http.get(Url.baseMovie("images", id).apiKey().build())
                .then(function (data) {
                    $scope.images = data.data.posters;
                    $scope.showCarousel = true;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getReviews = function (id) {
            $http.get(Url.baseMovie("reviews", id).apiKey().build())
                .then(function (data) {
                    $scope.reviews = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getSimilarMovies = function (movie) {
            $scope.selectedMovie = movie;
            $http.get(Url.baseMovie("similar", movie.id).apiKey().build())
                .then(function (data) {
                    $scope.similarMovies = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getRequestToken = function (callback) {
            $http.get(Url.base("/authentication/token/new").apiKey().build())
                .then(function (data) {
                    if (data.data.success) {
                        callback(data.data.request_token);
                        $scope.requestToken = data.data.request_token;
                    } else {
                        Logger.loge("Retrieving request token failed");
                    }
                }, function (data) {
                    handleError(data);
                })
        };

        $scope.createSession = function (requestToken) {
            $http.get(Url.base("/authentication/session/new").param("request_token", requestToken).apiKey().build());
        };

        function handleError(data) {
            $scope.error = data;
        }
    });