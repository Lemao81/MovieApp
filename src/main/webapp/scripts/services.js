mainModule
    .factory("Watchlist", function () {
        var watchlist = [];

        return {
            addToWatchlist: function (movie) {
                watchlist.push(movie);
            },
            removeFromWatchlist: function (movie) {
                watchlist.splice(watchlist.indexOf(movie), 1);
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
            }
        }
    });