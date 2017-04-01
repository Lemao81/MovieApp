mainModule
    .service("REST", function ($rootScope, $http, Url, Session, Logger, Broadcast, ON_GENRES, ON_SELECTEDGENRES, ON_MOVIES, ON_IMAGES, ON_CAROUSEL, ON_REVIEWS, ON_SELECTEDMOVIE,
                               ON_SIMILARMOVIES, ON_ASSOCIATEDMOVIES, ON_RECOMMANDEDMOVIES, ON_ACCOUNTDETAILS, ON_VIDEOS) {
        function handleError(data) {
            Logger.loge("Something went wrong! Status: " + data.status + ", Text: " + data.statusText);
            Logger.loge("Inner:  StatusCode: " + data.data.status_code + ", Message: " + data.data.status_message);
        }

        return {
            getGenreList: function () {
                $http.get(Url.base("/genre/movie/list").apiKey().build())
                    .then(function (data) {
                        var selectedGenres;
                        var storedSelectedGenres = Session.get("genres");
                        if (storedSelectedGenres) {
                            selectedGenres = storedSelectedGenres;
                        } else {
                            var ids = [];
                            data.data.genres.forEach(function (genre) {
                                ids.push(genre.id);
                            });
                            selectedGenres = ids;
                        }
                        Broadcast.send(ON_GENRES, data.data.genres);
                        Broadcast.send(ON_SELECTEDGENRES, selectedGenres);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getMovieList: function (path) {
                $http.get(Url.baseMovie(path).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_MOVIES, data.data.results);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getImages: function (id) {
                $http.get(Url.baseMovie("images", id).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_IMAGES, data.data.posters);
                        Broadcast.send(ON_CAROUSEL, true);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getReviews: function (movie) {
                $http.get(Url.baseMovie("reviews", movie.id).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_REVIEWS, data.data.results);
                        Broadcast.send(ON_SELECTEDMOVIE, movie);
                    }, function (data) {
                        handleError(data);
                    });
            },
            createSession: function (requestToken, callback) {
                $http.get(Url.base("/authentication/session/new").param("request_token", requestToken).apiKey().build())
                    .then(function (data) {
                        if (data.data.success) {
                            callback(data.data.session_id);
                        } else {
                            Logger.loge("Retrieving session id failed");
                        }
                    }, function (data) {
                        handleError(data);
                    });
            },
            getSimilarMovies: function (movie) {
                $http.get(Url.baseMovie("similar", movie.id).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_SIMILARMOVIES, data.data.results);
                        Broadcast.send(ON_ASSOCIATEDMOVIES, data.data.results);
                        Broadcast.send(ON_SELECTEDMOVIE, movie);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getRecommendedMovies: function (movie) {
                $http.get(Url.baseMovie("recommendations", movie.id).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_RECOMMANDEDMOVIES, data.data.results);
                        Broadcast.send(ON_SELECTEDMOVIE, movie);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getRequestToken: function (callback) {
                $http.get(Url.base("/authentication/token/new").apiKey().build())
                    .then(function (data) {
                        if (data.data.success) {
                            callback(data.data.request_token);
                        } else {
                            Logger.loge("Retrieving request token failed");
                        }
                    }, function (data) {
                        handleError(data);
                    });
            },
            getAccountDetails: function (sessionId) {
                $http.get(Url.base("/account").param("session_id", sessionId).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_ACCOUNTDETAILS, data.data);
                    }, function (data) {
                        handleError(data);
                    });
            },
            getVideos: function (movie) {
                $http.get(Url.baseMovie("videos", movie.id).apiKey().build())
                    .then(function (data) {
                        Broadcast.send(ON_VIDEOS, data.data.results);
                        Broadcast.send(ON_SELECTEDMOVIE, movie);
                    }, function (data) {
                        handleError(data);
                    });
            }
        }
    });