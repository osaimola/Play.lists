import {Keys} from './Keys';
import {isRestProperty} from "@babel/types";

let userAccessToken = "";
let userID = "";
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

  getUserID(token) {
    /* return spotify user's ID if available else request from api */
    if (userID !== "") {
      return userID;
    } else {
      fetch("https://api.spotify.com/v1/me",
        {headers: {Authorization: `Bearer ${token}`}}
      ).then(
        response => {return response.json()}
      ).then(
        responseJson => { userID = responseJson.id});
      return userID
    }
    },

  savePlayList(playlistName, trackURIs) {
    const userAccessToken = Spotify.getAccessToken();
    const userID = Spotify.getUserID(userAccessToken);
    const data = {name: playlistName};
    const headers = {Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'};
    const uris = {uri: trackURIs};

    /* create the playlist with given name and store its ID */
    /* add the required tracks to the saved playlist */
    console.log(userID);
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
      {method: 'POST',
            body: JSON.stringify(data),
            headers: headers
             }).then(response => {
               return response.json()}
               ).then(responseJson => {
                   const playlistID = responseJson.id;
                   return fetch( `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                     {method: 'POST',
                       headers: headers,
                       body: JSON.stringify(uris)}).then( response => {response.json()});
                 });
    }
};

export default Spotify;
