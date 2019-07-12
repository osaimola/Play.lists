import React from 'react';
import {TrackList} from "../TrackList/TrackList";
import './Playlist.css';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdatePlayListName = this.handleUpdatePlayListName.bind(this);
  }

  handleUpdatePlayListName(e) {
    let name = e.target.value;
    this.props.onUpdatePlayListName(name);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playListName} onChange={this.handleUpdatePlayListName}/>
        <TrackList trackList={this.props.playListTracks}
                   onRemove={this.props.onRemove}
                   isRemoval={true} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
