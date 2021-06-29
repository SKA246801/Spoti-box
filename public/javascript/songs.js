const searchSong = (function () {


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
    console.log(data.access_token)
    return data.access_token;
}


const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data.items)
    return data.items;
}

const _getTrack = async (token, trackEndPoint) => {

    const result = await fetch(`${trackEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data)
    return data;
}

    return {
        getToken() {
            return _getToken();
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();




// const UIController = (function () {

//     //object to hold references to html selectors
//     const DOMElements = {
//         selectSong: '#select_song',
//         buttonSubmit: '#btn_submit',
//         divSongDetail: '#song-detail',
//         hfToken: '#hidden_token',
//         divSonglist: '.song-list'
//     }

//     //public methods
//     return {

//         //method to get input fields
//         inputField() {
//             return {
//                 song: document.querySelector(DOMElements.selectSong),
//                 tracks: document.querySelector(DOMElements.divSonglist),
//                 submit: document.querySelector(DOMElements.buttonSubmit),
//                 songDetail: document.querySelector(DOMElements.divSongDetail)
//             }
//         },

       

//         // need method to create a track list group item 
//         createTrack(id, name) {
//             const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
//             document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
//         },

//         // need method to create the song detail
//         createTrackDetail(img, title, artist) {

//             const detailDiv = document.querySelector(DOMElements.divSongDetail);
//             // any time user clicks a new song, we need to clear out the song detail div
//             detailDiv.innerHTML = '';

//             const html =
//                 `
//             <div class="row col-sm-12 px-0">
//                 <img src="${img}" alt="">        
//             </div>
//             <div class="row col-sm-12 px-0">
//                 <label for="Genre" class="form-label col-sm-12">${title}:</label>
//             </div>
//             <div class="row col-sm-12 px-0">
//                 <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
//             </div> 
//             `;

//             detailDiv.insertAdjacentHTML('beforeend', html)
//         },

//         resetTrackDetail() {
//             this.inputField().songDetail.innerHTML = '';
//         },

//         resetTracks() {
//             this.inputField().tracks.innerHTML = '';
//             this.resetTrackDetail();
//         },


//         storeToken(value) {
//             document.querySelector(DOMElements.hfToken).value = value;
//         },

//         getStoredToken() {
//             return {
//                 token: document.querySelector(DOMElements.hfToken).value
//             }
//         }
//     }

// })();


// const APPController = (function (UICtrl, APICtrl) {
//     const DOMInputs = UICtrl.inputField();

//     // create submit button click event listener
//     DOMInputs.submit.addEventListener('click', async (e) => {
//         // prevent page reset
//         e.preventDefault();
//         // clear tracks
//         UICtrl.resetTracks();
//         //get the token
//         const token = UICtrl.getStoredToken().token;
//         // get the playlist field
//         const playlistSelect = UICtrl.inputField().playlist;
//         // get track endpoint based on the selected playlist
//         const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
//         // get the list of tracks
//         const tracks = await APICtrl.getTracks(token, tracksEndPoint);
//         // create a track list item
//         tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))

//     });

//     // create song selection click event listener
//     DOMInputs.tracks.addEventListener('click', async (e) => {
//         // prevent page reset
//         e.preventDefault();
//         UICtrl.resetTrackDetail();
//         // get the token
//         const token = UICtrl.getStoredToken().token;
//         // get the track endpoint
//         const trackEndpoint = e.target.id;
//         //get the track object
//         const track = await APICtrl.getTrack(token, trackEndpoint);
//         // load the track details
//         UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
//     });

//     return {
//         init() {
//             console.log('App is starting');
//         }
//     }

// }) (UIController, searchSong);

// APPController.init();


