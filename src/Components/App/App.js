import React from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: "New Playlist",
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let check = false;
    const tracks = this.state.playListTracks;
    tracks.forEach(song => {
      if(song.id === track.id) {
        check = true
      }
    });

    if (!check) {
      const list = tracks.concat(track);
      this.setState({playListTracks: list})
    }
  }

  removeTrack(track) {
    let newPlayListTracks = this.state.playListTracks.filter(song =>
    {return song.id !== track.id});
    this.setState({playListTracks: newPlayListTracks})
  }

  updatePlayListName(name) {
    this.setState({playListName: name});
  }

  savePlayList() {
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs).then( responseJson => {
      if (responseJson.hasOwnProperty("snapshot_id")){
      this.setState({playListTracks: [], playListName: "New Playlist"});}
    });
    console.log(trackURIs);
  }

  search(term) {
    Spotify.search(term).then(newSearchResults => {
      this.setState({searchResults: newSearchResults})
    })
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playListName={this.state.playListName}
                      playListTracks={this.state.playListTracks}
                      onRemove={this.removeTrack}
                      onUpdatePlayListName={this.updatePlayListName}
                      onSave={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
