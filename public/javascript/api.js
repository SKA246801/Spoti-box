var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'fe69cc20a6e74584bce6cb310e7ad534',
    clientSecret: 'ceecd22d58cc4f0abf0bfed4b420d9ea',
    redirectUri: 'http://localhost:3001'
});


var scopes = ['playlist-modify-private', 'playlist-modify-public'],
    redirectUri = 'http://localhost:3001',
    clientId = 'fe69cc20a6e74584bce6cb310e7ad534',
    state = '123';


// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

spotifyApi.setAccessToken('BQDy8oCYX_BH8umm88qGmTbdUaQwGtuK2g7Wa0zK-osAafzoct7HCwFY6TVgcbwJ5yi-90i9eSIa95mpVhLDk4qmqSG1dSbasYksWEZS8T6-VqwypDkhFNmW66xf35I2hte8ji6Scn6Z2511dwfiPjoCj5Z6PHY9KwhtMEm12xyUGE3P9Gf5BvZX3p5368of01bq80JxcyYM7nEC18PJKHe6VzsIWSsC6KDnOtXIqk8qyQlWdX2tdkgM');


spotifyApi
    .createPlaylist('My playlist', { 'description': 'My description', 'public': true })
    .then(function (data) {
        url = data.body.external_urls.spotify
        return address = url.split('/').slice(4, 5).join('/')
    })
    .then(function (add) {
        return spotifyApi.addTracksToPlaylist(add, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:track:5wANPM4fQCJwkGd4rN57mH", "spotify:track:59HjlYCeBsxdI0fcm3zglw"])
    })
    .catch(function (error) {
        console.error(error);
    });

// spotifyApi.removeTracksFromPlaylistByPosition('5ieJqeLJjjI8iJWaxeBLuK', [0, 2, 130], "0wD+DKCUxiSR/WY8lF3fiCTb7Z8X4ifTUtqn8rO82O4Mvi5wsX8BsLj7IbIpLVM9")
//     .then(function (data) {
//         console.log('Tracks removed from playlist!');
//     }, function (err) {
//         console.log('Something went wrong!', err);
//     });

// spotifyApi.pause()
//     .then(function () {
//         console.log('Playback paused');
//     }, function (err) {
//         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//         console.log('Something went wrong!', err);
//     });

// spotifyApi.setRepeat('track')
//     .then(function () {
//         console.log('Repeat track.');
//     }, function (err) {
//         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//         console.log('Something went wrong!', err);
//     });

// spotifyApi.skipToNext()
//     .then(function () {
//         console.log('Skip to next');
//     }, function (err) {
//         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//         console.log('Something went wrong!', err);
//     });

// spotifyApi.play()
//     .then(function () {
//         console.log('Playback started');
//     }, function (err) {
//         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//         console.log('Something went wrong!', err);
//     });


    
