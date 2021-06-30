// import { SpotifyWebApi } from "../../node_modules/spotify-web-api-node/src/server";

// var credentials = {
//     clientId: 'fe69cc20a6e74584bce6cb310e7ad534',
//     clientSecret: 'ceecd22d58cc4f0abf0bfed4b420d9ea',
//     redirectUri: 'http://localhost:3001'
// };

// var spotifyApi = new SpotifyWebApi(credentials);



// var scopes = ['playlist-modify-private', 'playlist-modify-public'],
//     redirectUri = 'http://localhost:3001',
//     clientId = 'fe69cc20a6e74584bce6cb310e7ad534',
//     state = '123';

// // Create the authorization URL
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);



// async function songSearch(event) {
//     event.preventDefault();

//     const song = document.querySelector('#select_song').value.trim();
//     if (song) {
//         await spotifyApi.clientCredentialsGrant().then(
//             function (data) {
//                 console.log('The access token is ' + data.body['access_token']);
//                 spotifyApi.setAccessToken(data.body['access_token']);

//                 spotifyApi.searchTracks(`${song}`)
//                     .then(function (data) {
//                         console.log('Search by "Love"', data.body);
//                     }, function (err) {
//                         console.error(err);
//                     })

//             },
//             function (err) {
//                 console.log('Something went wrong!', err);
//             }
//         )
//     }

//     document.querySelector('.container').addEventListener('change', songSearch);

// }



// // spotifyApi
// //     .createPlaylist('My playlist', { 'description': 'My description', 'public': true })
// //     .then(function (data) {
// //         url = data.body.external_urls.spotify
// //         return address = url.split('/').slice(4, 5).join('/')
// //     })
// //     .then(function (add) {
// //         return spotifyApi.addTracksToPlaylist(add, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:track:5wANPM4fQCJwkGd4rN57mH", "spotify:track:59HjlYCeBsxdI0fcm3zglw"])
// //     })
// //     .catch(function (error) {
// //         console.error(error);
// //     });



