mainModule
    .controller("bootstrapCtrl", function (REST, Broadcast, Watchlist, Session, ON_CAROUSEL) {
        REST.getGenreList();
        REST.getMovieList("upcoming");
        Broadcast.send(ON_CAROUSEL, false);

        var requestToken = Session.get("requesttoken");
        if (requestToken) {
            REST.createSession(requestToken, createSessionCallback);
        }

        function createSessionCallback(sessionId) {
            REST.getAccountDetails(sessionId);
        }

        Watchlist.updateFromSession();
    });