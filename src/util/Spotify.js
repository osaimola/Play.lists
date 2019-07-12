import {Keys} from './Keys';

let userAccessToken = "";
let clientID = Keys.clientId;
let redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken(){
    if(userAccessToken !== "") {
      return userAccessToken;
    } else {
      let url = window.location.href;
      let aToken = url.match(/access_token=([^&]*)/);
      let eTime = url.match(/expires_in=([^&]*)/);

      /* if acc token and exp time aren't set & aren't null, set them and use exp time to determine when to delete
       * else retrieve access token from Spotify
       */
      if (aToken && eTime) {
        userAccessToken = aToken[1];
        window.setTimeout(() => userAccessToken = "", eTime[1] * 1000);
        window.history.pushState("Access Token", null, "/");
        return userAccessToken;
      } else {
        /* retrieve access token */
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      }
    }
  },

  search(term) {
    /* get access token and use search term return a list of matching songs */
    const userAccessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,
      {headers: {Authorization: `Bearer ${userAccessToken}`}}
      ).then(
        response => {return response.json()
        }).then( jsonResponse => {
          if (jsonResponse.hasOwnProperty("tracks")) {
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              album: track.album.name,
              artist: track.artists[0].name,
              uri: track.uri}))
          } else{
            return [];
          }});
    },

  savePlayList(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    let userID;
    const userAccessToken = Spotify.getAccessToken();
    const data = {name: playlistName};
    const headers = {Authorization: `Bearer ${userAccessToken}`};
    const uris = {uris: trackURIs};

    /* create the playlist with given name and store its ID */
    /* add the required tracks to the saved playlist */
    return fetch("https://api.spotify.com/v1/me",
      {headers: headers}
    ).then(
      response => {return response.json()}
    ).then(
      responseJson => {
        userID = responseJson.id;

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          {method: 'POST',
            body: JSON.stringify(data),
            headers: headers
          }).then(response => {
          return response.json()}
        ).then(responseJson => {
          const playlistID = responseJson.id;

          return fetch( `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            {method: 'POST',
              headers: headers,
              body: JSON.stringify(uris)}).then( response => {return response.json()});
        });
      });

    }
};

export default Spotify;
