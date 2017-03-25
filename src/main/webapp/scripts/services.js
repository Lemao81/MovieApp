mainModule
    .factory("Watchlist", function ($window) {
        var watchlist = [];

        var storeWatchlist = function () {
            $window.sessionStorage.setItem("watchlist", angular.toJson(watchlist));
        };

        return {
            addToWatchlist: function (movie) {
                watchlist.push(movie);
                storeWatchlist();
            },
            removeFromWatchlist: function (movie) {
                watchlist.splice(watchlist.indexOf(movie), 1);
                storeWatchlist();
            },
            watchlistContainsMovie: function (movie) {
                var result = false;
                watchlist.some(function (item) {
                    if (item.id == movie.id) {
                        result = true;
                        return true;
                    }
                });
                return result;
            },
            getWatchlist: function () {
                return watchlist;
            },
            updateFromSession: function () {
                var watchlistStringified = $window.sessionStorage.getItem("watchlist");
                if (watchlistStringified) {
                    watchlist = angular.fromJson(watchlistStringified);
                }
            }
        };
    })
    .factory("Logger", function () {
        function withTimePrefix(msg) {
            return new Date().toLocaleTimeString() + ": " + msg;
        }

        return {
            loge: function (msg) {
                console.error(withTimePrefix(msg));
            },
            logi: function (msg) {
                console.info(withTimePrefix(msg));
            },
            log: function (msg) {
                console.log(withTimePrefix(msg));
            }
        }
    })
    .factory("Url", function (baseUrl, baseUrlMovie, apiKey) {
        var url;

        function appendApiKey(url) {
            return appendQueryParameter(url, "api_key", apiKey);
        }

        function appendQueryParameter(url, key, value) {
            var separator = url.indexOf("?") > 0 ? "&" : "?";
            return url + separator + key + "=" + value;
        }

        return {
            base: function (path) {
                url = baseUrl + path;
                return this;
            },
            baseMovie: function (path, id) {
                url = baseUrlMovie + (angular.isDefined(id) ? id + "/" : "") + path;
                return this;
            },
            param: function (key, value) {
                url = appendQueryParameter(url, key, value);
                return this;
            },
            apiKey: function () {
                url = appendApiKey(url);
                return this;
            },
            build: function () {
                return url;
            }
        }
    });