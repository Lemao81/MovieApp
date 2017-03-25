mainModule
    .filter("rowCount", function () {
        return function (data, columnCount) {
            if (angular.isArray(data) && angular.isNumber(columnCount)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / columnCount); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    })
    .filter("itemsOfRow", function ($filter) {
        return function (data, row, columnCount) {
            if (angular.isArray(data) && angular.isNumber(row) && angular.isNumber(columnCount)) {
                var startIndex = row * columnCount;
                return $filter("limitTo")(data.slice(startIndex), columnCount);
            } else {
                return data;
            }
        }
    })
    .filter("genreSelection", function () {
        return function (data, selectedGenres) {
            if (angular.isArray(data) && angular.isArray(selectedGenres)) {
                var result = [];
                data.forEach(function (movie) {
                    movie.genre_ids.some(function (genreId) {
                        if (selectedGenres.includes(genreId)) {
                            result.push(movie);
                            return true;
                        }
                    });
                });
                return result;
            } else {
                return data;
            }
        }
    });