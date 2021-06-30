// var redirect_uri = "http://localhost:3001"; // change this your value
// //var redirect_uri = "http://127.0.0.1:5500/index.html";
// var client_id = "fe69cc20a6e74584bce6cb310e7ad534";
// var client_secret = "ceecd22d58cc4f0abf0bfed4b420d9ea";

// var access_token = null;
// var refresh_token = null;


// const AUTHORIZE = "https://accounts.spotify.com/authorize"


// function requestAuthorization() {
//     let url = AUTHORIZE;
//     url += "?client_id=" + client_id;
//     url += "&response_type=code";
//     url += "&redirect_uri=" + encodeURI(redirect_uri);
//     url += "&scope=playlist-modify-private playlist-modify-public";
//     url += "&state" + '123'
//     window.location.href = url; // Show Spotify's authorization screen
// }



// requestAuthorization()


// const TOKEN = "https://accounts.spotify.com/api/token";
// const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
// const DEVICES = "https://api.spotify.com/v1/me/player/devices";
// const PLAY = "https://api.spotify.com/v1/me/player/play";
// const PAUSE = "https://api.spotify.com/v1/me/player/pause";
// const NEXT = "https://api.spotify.com/v1/me/player/next";
// const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
// const PLAYER = "https://api.spotify.com/v1/me/player";
// const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
// const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
// const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";


// // var currentPlaylist = "fe69cc20a6e74584bce6cb310e7ad534";
// // var radioButtons = [];

// // function onPageLoad() {
// //     if (window.location.search.length > 0) {
// //         handleRedirect();
// //     }
// //     else {
// //         access_token = localStorage.getItem("access_token");
// //         if (access_token == null) {
// //             // we don't have an access token so present token section
// //             document.getElementById("tokenSection").style.display = 'block';
// //         }
// //         else {
// //             // we have an access token so present device section
// //             document.getElementById("deviceSection").style.display = 'block';
// //             refreshDevices();
// //             refreshPlaylists();
// //             currentlyPlaying();
// //         }
// //     }
// //     refreshRadioButtons();
// // }

// // function handleRedirect() {
// //     let code = getCode();
// //     fetchAccessToken(code);
// //     window.history.pushState("", "", redirect_uri); // remove param from url
// // }

// // function getCode() {
// //     let code = null;
// //     const queryString = window.location.search;
// //     if (queryString.length > 0) {
// //         const urlParams = new URLSearchParams(queryString);
// //         code = urlParams.get('code')
// //     }
// //     return code;
// // }




// // function fetchAccessToken(code) {
// //     let body = "grant_type=authorization_code";
// //     body += "&code=" + code;
// //     body += "&redirect_uri=" + encodeURI(redirect_uri);
// //     body += "&client_id=" + client_id;
// //     body += "&client_secret=" + client_secret;
// //     callAuthorizationApi(body);
// // }

// // function refreshAccessToken() {
// //     refresh_token = localStorage.getItem("refresh_token");
// //     let body = "grant_type=refresh_token";
// //     body += "&refresh_token=" + refresh_token;
// //     body += "&client_id=" + client_id;
// //     callAuthorizationApi(body);
// // }

// // function callAuthorizationApi(body) {
// //     let xhr = new XMLHttpRequest();
// //     xhr.open("POST", TOKEN, true);
// //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// //     xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
// //     xhr.send(body);
// //     xhr.onload = handleAuthorizationResponse;
// // }

// // function handleAuthorizationResponse() {
// //     if (this.status == 200) {
// //         var data = JSON.parse(this.responseText);
// //         console.log(data);
// //         var data = JSON.parse(this.responseText);
// //         if (data.access_token != undefined) {
// //             access_token = data.access_token;
// //             localStorage.setItem("access_token", access_token);
// //         }
// //         if (data.refresh_token != undefined) {
// //             refresh_token = data.refresh_token;
// //             localStorage.setItem("refresh_token", refresh_token);
// //         }
// //         onPageLoad();
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function refreshDevices() {
// //     callApi("GET", DEVICES, null, handleDevicesResponse);
// // }

// // function handleDevicesResponse() {
// //     if (this.status == 200) {
// //         var data = JSON.parse(this.responseText);
// //         console.log(data);
// //         removeAllItems("devices");
// //         data.devices.forEach(item => addDevice(item));
// //     }
// //     else if (this.status == 401) {
// //         refreshAccessToken()
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function addDevice(item) {
// //     let node = document.createElement("option");
// //     node.value = item.id;
// //     node.innerHTML = item.name;
// //     document.getElementById("devices").appendChild(node);
// // }

// // function callApi(method, url, body, callback) {
// //     let xhr = new XMLHttpRequest();
// //     xhr.open(method, url, true);
// //     xhr.setRequestHeader('Content-Type', 'application/json');
// //     xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
// //     xhr.send(body);
// //     xhr.onload = callback;
// // }

// // function refreshPlaylists() {
// //     callApi("GET", PLAYLISTS, null, handlePlaylistsResponse);
// // }

// // function handlePlaylistsResponse() {
// //     if (this.status == 200) {
// //         var data = JSON.parse(this.responseText);
// //         console.log(data);
// //         removeAllItems("playlists");
// //         data.items.forEach(item => addPlaylist(item));
// //         document.getElementById('playlists').value = currentPlaylist;
// //     }
// //     else if (this.status == 401) {
// //         refreshAccessToken()
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function addPlaylist(item) {
// //     let node = document.createElement("option");
// //     node.value = item.id;
// //     node.innerHTML = item.name + " (" + item.tracks.total + ")";
// //     document.getElementById("playlists").appendChild(node);
// // }

// // function removeAllItems(elementId) {
// //     let node = document.getElementById(elementId);
// //     while (node.firstChild) {
// //         node.removeChild(node.firstChild);
// //     }
// // }

// // function play() {
// //     let playlist_id = document.getElementById("playlists").value;
// //     let trackindex = document.getElementById("tracks").value;
// //     let album = document.getElementById("album").value;
// //     let body = {};
// //     if (album.length > 0) {
// //         body.context_uri = album;
// //     }
// //     else {
// //         body.context_uri = "spotify:playlist:" + playlist_id;
// //     }
// //     body.offset = {};
// //     body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
// //     body.offset.position_ms = 0;
// //     callApi("PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse);
// // }

// // function shuffle() {
// //     callApi("PUT", SHUFFLE + "?state=true&device_id=" + deviceId(), null, handleApiResponse);
// //     play();
// // }

// // function pause() {
// //     callApi("PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse);
// // }

// // function next() {
// //     callApi("POST", NEXT + "?device_id=" + deviceId(), null, handleApiResponse);
// // }

// // function previous() {
// //     callApi("POST", PREVIOUS + "?device_id=" + deviceId(), null, handleApiResponse);
// // }

// // function transfer() {
// //     let body = {};
// //     body.device_ids = [];
// //     body.device_ids.push(deviceId())
// //     callApi("PUT", PLAYER, JSON.stringify(body), handleApiResponse);
// // }

// // function handleApiResponse() {
// //     if (this.status == 200) {
// //         console.log(this.responseText);
// //         setTimeout(currentlyPlaying, 2000);
// //     }
// //     else if (this.status == 204) {
// //         setTimeout(currentlyPlaying, 2000);
// //     }
// //     else if (this.status == 401) {
// //         refreshAccessToken()
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function deviceId() {
// //     return document.getElementById("devices").value;
// // }

// // function fetchTracks() {
// //     let playlist_id = document.getElementById("playlists").value;
// //     if (playlist_id.length > 0) {
// //         url = TRACKS.replace("{{PlaylistId}}", playlist_id);
// //         callApi("GET", url, null, handleTracksResponse);
// //     }
// // }

// // function handleTracksResponse() {
// //     if (this.status == 200) {
// //         var data = JSON.parse(this.responseText);
// //         console.log(data);
// //         removeAllItems("tracks");
// //         data.items.forEach((item, index) => addTrack(item, index));
// //     }
// //     else if (this.status == 401) {
// //         refreshAccessToken()
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function addTrack(item, index) {
// //     let node = document.createElement("option");
// //     node.value = index;
// //     node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
// //     document.getElementById("tracks").appendChild(node);
// // }

// // function currentlyPlaying() {
// //     callApi("GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
// // }

// // function handleCurrentlyPlayingResponse() {
// //     if (this.status == 200) {
// //         var data = JSON.parse(this.responseText);
// //         console.log(data);
// //         if (data.item != null) {
// //             document.getElementById("albumImage").src = data.item.album.images[0].url;
// //             document.getElementById("trackTitle").innerHTML = data.item.name;
// //             document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
// //         }


// //         if (data.device != null) {
// //             // select device
// //             currentDevice = data.device.id;
// //             document.getElementById('devices').value = currentDevice;
// //         }

// //         if (data.context != null) {
// //             // select playlist
// //             currentPlaylist = data.context.uri;
// //             currentPlaylist = currentPlaylist.substring(currentPlaylist.lastIndexOf(":") + 1, currentPlaylist.length);
// //             document.getElementById('playlists').value = currentPlaylist;
// //         }
// //     }
// //     else if (this.status == 204) {

// //     }
// //     else if (this.status == 401) {
// //         refreshAccessToken()
// //     }
// //     else {
// //         console.log(this.responseText);
// //         alert(this.responseText);
// //     }
// // }

// // function saveNewRadioButton() {
// //     let item = {};
// //     item.deviceId = deviceId();
// //     item.playlistId = document.getElementById("playlists").value;
// //     radioButtons.push(item);
// //     localStorage.setItem("radio_button", JSON.stringify(radioButtons));
// //     refreshRadioButtons();
// // }

// // function refreshRadioButtons() {
// //     let data = localStorage.getItem("radio_button");
// //     if (data != null) {
// //         radioButtons = JSON.parse(data);
// //         if (Array.isArray(radioButtons)) {
// //             removeAllItems("radioButtons");
// //             radioButtons.forEach((item, index) => addRadioButton(item, index));
// //         }
// //     }
// // }

// // function onRadioButton(deviceId, playlistId) {
// //     let body = {};
// //     body.context_uri = "spotify:playlist:" + playlistId;
// //     body.offset = {};
// //     body.offset.position = 0;
// //     body.offset.position_ms = 0;
// //     callApi("PUT", PLAY + "?device_id=" + deviceId, JSON.stringify(body), handleApiResponse);
// //     //callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId, null, handleApiResponse );
// // }

// // function addRadioButton(item, index) {
// //     let node = document.createElement("button");
// //     node.className = "btn btn-primary m-2";
// //     node.innerText = index;
// //     node.onclick = function () { onRadioButton(item.deviceId, item.playlistId) };
// //     document.getElementById("radioButtons").appendChild(node);
// // }