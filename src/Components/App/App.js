import React from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";

const track = {id: 5, name:"Gully", artist:"Santi", album:"Mandy"};
const listOfTracks = [track, track, track];

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: listOfTracks,
      playListName: "Wavy Songs",
      playListTracks: listOfTracks
    };
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playListName={this.state.playListName}
                      playListTracks={this.state.playListTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
