const APIController = (function() {

  const clientId = 'fe69cc20a6e74584bce6cb310e7ad534';
  const clientSecret = 'ceecd22d58cc4f0abf0bfed4b420d9ea';

  // private methods
  const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await result.json();
    return data.categories.items;
  }

  const _getPlaylistByGenre = async (token, genreId) => {

    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await result.json();
    return data.playlists.items;
  }

  const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await result.json();
    return data.items;
  }

  const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await result.json();
    return data;
  }

  const _createPlaylist = async () => {
    // Create empty playlist and retrieve endpoint
    const emptyPlaylist = await fetch(`https://api.spotify.com/v1/users/21doakiooz7smngjx7nkifqui/playlists`, {
      method: 'POST',
      body: JSON.stringify({
        'name': 'Your New Playlist',
        'public': true,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'BQCdwwsw3fwAAvPc7kqSSQx_01ZwnFWqBgh_rBSD7Ib70MLPDVFp13orepQ37rw7ss8vtore-8_t6giK9PdCeKzLFqwCNQF50w5pMpGNi0YkGeUqLzqyNCrZQMLLwRr_iH5lqyWHH3-GwUx5nXN9mKw6cROQ90dJ5FTEBhYVKOVxbInGzpboN9f5JDKqpY9XDjZk_4YFcCzYxDFfgrD3aDzhEk-zme3iht2UbDz2AeeoI3zGlQjs0mwCZAU'

      }
    })

    const data = await emptyPlaylist.json();
    url = data.external_urls.spotify
    id = url.split('/').slice(4, 5).join('/')
    return id
  }


  const _addSongs = async (id, uris) => {
    //const tracks = ["spotify:track:1i1fxkWeaMmKEB4T7zqbzK", "spotify:track:2VKqMKKCFhTPczQb10TMKB", "spotify:track:7Gl9cKtVjRN6KHNMfV1gD3"];
    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'BQCs-IvOoqayeiVp4RG62rank7F6L-284GyEAQHYmifQ0zkhmuJgG5tK7_DH6KnrMZRXLzy2EKj3uQaIof1d4reYZ9D2hcfDlWFfEKfKwwTgPJG4L2cL3E8PjN5pro22S31VDkvQpoSI0Uoh4lgh1rwUBLRL5aGzAsYKSHA46rPx42xiFxwxABzSgBkPv-lh07hgaxs-eczzrwnXGIflGbX7m4vY5CIyKj5QElZ4ilFxeCMGJtiCOqsyjiU'

      },
      body: JSON.stringify({
        'uris': uris
      })
    })

    const data = await result.json();
    return data[data.length - 1]

  }

  return {
    requestAuthorization() {
      return _requestAuthorization();

    },
    getToken() {
      return _getToken();
    },
    getGenres(token) {
      return _getGenres(token);
    },
    getPlaylistByGenre(token, genreId) {
      return _getPlaylistByGenre(token, genreId);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    },
    createnewPlaylist() {
      return _createPlaylist()
    },
    addSongs(id, uris) {
      return _addSongs(id, uris);
    }
  }
})();


// UI Module
const UIController = (function() {

  //object to hold references to html selectors
  const DOMElements = {
    selectGenre: '#select_genre',
    selectPlaylist: '#select_playlist',
    generatedPlaylist: '#generated_playlist',
    buttonGenerated: '#btn_playlist',
    buttonSubmit: '#btn_submit',
    divSongDetail: '#song-detail',
    hfToken: '#hidden_token',
    divSonglist: '.song-list'
  }

  //public methods
  return {

    //method to get input fields
    inputField() {
      return {
        genre: document.querySelector(DOMElements.selectGenre),
        playlist: document.querySelector(DOMElements.selectPlaylist),
        genplaylist: document.querySelector(DOMElements.generatedPlaylist),
        tracks: document.querySelector(DOMElements.divSonglist),
        submit: document.querySelector(DOMElements.buttonSubmit),
        songDetail: document.querySelector(DOMElements.divSongDetail),
        generated: document.querySelector(DOMElements.buttonGenerated)
      }
    },

    // need methods to create select list option
    createGenre(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
    },

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
    },

    // need method to create a track list group item
    createTrack(id, name) {
      // const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`
      const html = `<a href="#" class="nes-btn is-pink" id="${id}">${name}</a>`
      document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html)
    },


    createGenrePlaylist(title, artist) {
      // const detailPlaylist = document.querySelector(DOMElements.generatedPlaylist);
      const detailPlaylist = document.createElement('p');
      detailPlaylist.innerHTML =
        `
            <div class="nes-btn is-pink">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class="nes-btn is-pink">
                <label for="artist" class="form-label col-sm-12">By ${artist}</label>
            </div>
            `

      document.getElementById('generatedPlaylist').appendChild(detailPlaylist)

    },

    spotifyPopup(id) {
      // const detailPlaylist = document.querySelector(DOMElements.generatedPlaylist);
      const generatedPlaylist = document.createElement('div');
      generatedPlaylist.innerHTML =
        `
            <div class="container">
            <iframe src="https://open.spotify.com/embed/playlist/${id}" width="300" height="380"
            frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;

      document.body.appendChild(generatedPlaylist);

    },


    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = '';
    },

    resetTracks() {
      this.inputField().tracks.innerHTML = '';
      this.resetTrackDetail();
    },

    resetPlaylist() {
      this.inputField().playlist.innerHTML = '';
      this.resetTracks();
    },

    storeToken(value) {
      document.querySelector(DOMElements.hfToken).value = value;
    },

    getStoredToken() {
      return {
        token: document.querySelector(DOMElements.hfToken).value
      }
    }
  }

})();

const APPController = (function(UICtrl, APICtrl) {

  // get input field object ref
  const DOMInputs = UICtrl.inputField();

  // get genres on page load
  const loadGenres = async () => {
    //get the token
    const token = await APICtrl.getToken();
    //store the token onto the page
    UICtrl.storeToken(token);
    //get the genres
    const genres = await APICtrl.getGenres(token);
    //populate our genres select element
    genres.forEach(element => UICtrl.createGenre(element.name, element.id));
  }

  // create genre change event listener
  DOMInputs.genre.addEventListener('change', async () => {
    // reset the playlist
    UICtrl.resetPlaylist();
    // get the token that's stored on the page
    const token = UICtrl.getStoredToken().token;
    // get the genre select field
    const genreSelect = UICtrl.inputField().genre;
    // get the genre id associated with the selected genre
    const genreId = genreSelect.options[genreSelect.selectedIndex].value;
    // ge the playlist based on a genre
    const playlist = await APICtrl.getPlaylistByGenre(token, genreId);
    // create a playlist list item for every playlist returned
    playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
  });


  // create submit button click event listener
  DOMInputs.submit.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    // clear tracks
    UICtrl.resetTracks();
    // get the token
    const token = UICtrl.getStoredToken().token;
    // get the playlist field
    const playlistSelect = UICtrl.inputField().playlist;
    // get track endpoint based on the selected playlist
    const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
    // get the list of tracks
    const tracks = await APICtrl.getTracks(token, tracksEndPoint);
    // create a track list item
    tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))
  })



  uris = []

  // create song selection click event listener
  DOMInputs.tracks.addEventListener('click', async (e) => {

    // prevent page reset
    e.preventDefault();
    UICtrl.resetTrackDetail();
    // get the token
    const token = UICtrl.getStoredToken().token;
    // get the track endpoint
    const trackEndpoint = e.target.id;
    // get the track object
    const track = await APICtrl.getTrack(token, trackEndpoint);
    // load the track details
    UICtrl.createGenrePlaylist(track.name, track.artists[0].name)


    DOMInputs.generated.addEventListener('click', async (e) => {
      // prevent page reset
      e.preventDefault();
      // clear tracks
      UICtrl.resetTracks();
      const id = await APICtrl.createnewPlaylist()
      UICtrl.spotifyPopup(id)
      uris.push(track.uri)
      APICtrl.addSongs(id, uris)
    });
  });

  return {
    init () {
      loadGenres();
    }
  }

})(UIController, APIController);

APPController.init();
