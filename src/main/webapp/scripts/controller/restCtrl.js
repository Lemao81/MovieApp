mainModule
    .controller("restCtrl", function ($scope, $http, baseUrl, baseUrlMovies, apiKey) {
        $scope.getGenreList = function () {
            $http.get(appendApiKey(baseUrl + "/genre/movie/list"))
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
            $http.get(appendApiKey(baseUrlMovies + path))
                .then(function (data) {
                    $scope.movies = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getImages = function (id) {
            $http.get(appendApiKey(getMovieUrl(id, "images")))
                .then(function (data) {
                    $scope.images = data.data.posters;
                    $scope.showCarousel = true;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getReviews = function (id) {
            $http.get(appendApiKey(getMovieUrl(id, "reviews")))
                .then(function (data) {
                    $scope.reviews = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        $scope.getSimilarMovies = function (movie) {
            $scope.selectedMovie = movie;
            $http.get(appendApiKey(getMovieUrl(movie.id, "similar")))
                .then(function (data) {
                    $scope.similarMovies = data.data.results;
                }, function (data) {
                    handleError(data);
                });
        };

        function appendApiKey(url) {
            var apiParameter = url.indexOf("?") > 0 ? "&api_key=" : "?api_key=";
            return url + apiParameter + apiKey;
        }

        function getMovieUrl(id, type) {
            return baseUrlMovies + id + "/" + type;
        }

        function handleError(data) {
            $scope.error = data;
        }
    });