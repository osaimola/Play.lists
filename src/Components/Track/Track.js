import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval){
    if(isRemoval) {
      return <button className="Track-action"
                     onClick={this.removeTrack}>-</button>;
    } else{
      return <button className="Track-action"
                     onClick={this.addTrack}> + </button>;
    }
  }

  addTrack(e) {
    this.props.onAdd(this.props.trackInfo);
  }

  removeTrack(e) {
    this.props.onRemove(this.props.trackInfo);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.trackInfo.name}</h3>
          <p>{this.props.trackInfo.artist} | {this.props.trackInfo.album}</p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
    );
  }
}
