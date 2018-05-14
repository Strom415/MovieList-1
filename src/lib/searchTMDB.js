import TMDB_API_KEY from '../config/tmdb.js';
import $ from 'jquery';

export function searchMovieID(moviename, callback) {

  //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + window.TMDB_API_KEY + '&query=' + moviename.split(' ').join('+');

  $.get(url)
      .then(function successCallback(response) {
        callback(response);
      })
      .catch(function errorCallback(response) {
      });
}


export function searchTMDB(movieID, callback) {

  //https://api.themoviedb.org/3/movie/10428?api_key=2ede88a914f39ec687484df4a6649fc8&language=en-US
  var url = 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key='+ window.TMDB_API_KEY + '&language=en-US';

  $.get(url)
      .then(function successCallback(response) {
        callback(response);
        // this callback will be called asynchronously
        // when the response is available
      })
      .catch(function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
}

