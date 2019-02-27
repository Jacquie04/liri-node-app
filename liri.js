var axios = require("axios");
var moment = require("moment");
require("dotenv").config();
var fs = require("fs");

var action = process.argv[2];
var movieTitle = process.argv.slice(3).join(" ");
var artist = process.argv.slice(3).join(" ");
var song = process.argv.slice(3).join(" ");


function liri() {
  if (action === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        if (response.data.Response === "False") {
          console.log("Movie Not Found")

        } else {

          console.log("Movie Title: " + response.data.Title + "\nMovie Release Year: " + response.data.Released + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " +
            response.data.Ratings[1].Value + "\nCountry Movie Was Produced: " + response.data.Country + "\nLanguage Of The Movie: " + response.data.Language + "\nMovie Plot: " + response.data.Plot +
            "\nActors: " + response.data.Actors);
        }
      }
    );
  } else if (action === 'concert-this') {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
      function (response) {
        for (var i = 0; i < 3; i++) {
          console.log("Venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + "\nDate of Event" + moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a"))
        }
      })
  } else if (action === "spotify-this-song") {

    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
      id: "d7fd15f60ada4484a3ecac7afcfa5398",
      secret: "69b1a80c3a7c475ebdb8f042ec4b2c87"
    });

    var spotify = new Spotify(keys.spotify);

    spotify.search({
      type: 'track',
      query: song
    }, function (error, data) {
      if (error) {
        console.log('This is sign of a bad ace... ');
        return;
      } else {
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name
          + "\nPreview: " + data.tracks.items[3].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
      }
    }
    )
  };
}

if (action === "do-what-it-says") {

  var action = process.argv[3];
  var movieTitle = process.argv.slice(4).join(" ");
  var artist = process.argv.slice(4).join(" ");
  var song = process.argv.slice(4).join(" ");

  fs.appendFile("random.txt", action + process.argv.slice(4).join("\n "), function (err) {
    if (err) {
      return console.log(err);
    }

  });


  fs.readFile("random.txt", "utf8", function (err, data) {

    if (err) {
      return console.log(err);
    }
 
    liri();

  });
  
};
liri();
