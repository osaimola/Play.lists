import React from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";

const track = {id: 5, name:"Raining Outside", artist:"Santi", album:"Mandy and the Jungle"};
const listOfTracks = [track, track, track];

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: listOfTracks.concat({id: 55, name:"Maria", artist:"Santi", album:"Mandy and the Jungle"}),
      playListName: null,
      playListTracks: listOfTracks
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
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
    console.log(trackURIs);
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
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
