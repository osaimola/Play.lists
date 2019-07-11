import React from 'react';
import {Track} from "../Track/Track";
import './TrackList.css';

export class TrackList extends React.Component{
  render() {
    const trackList = this.props.trackList;
    const tracks = trackList.map(result => <Track key={result.id}
                                                  trackInfo={result}
                                                  onAdd={this.props.onAdd}
                                                  onRemove={this.props.onRemove}
                                                  isRemoval={this.props.isRemoval}/>);

    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }

}
