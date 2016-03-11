var React = require('react'),
    Track = require('../util/Track'),
    KeyStore = require('../stores/key_store');

var listenerToken;

var Recorder = React.createClass({

  getInitialState: function(){
    return {
      isRecording: false,
      Track: new Track({name: ""}),
      noteNames: ""
    };
  },

  addNotesOnChange: function(){
    this.state.Track.addNotes(this.state.noteNames);
  },

  storeChanged: function(){
    this.setState( { noteNames: KeyStore.all() } );
    this.addNotesOnChange();
  },

  componentDidMount: function(){
    listenerToken = KeyStore.addListener(this.storeChanged);
  },

  componentWillUnmount: function(){
    listenerToken.remove();
  },

  render: function(){
    var track = this.state.Track;
    return(
      <div>
        <button onClick = {track.play.bind(track)}>Play</button>
        <button onClick = {track.startRecording.bind(track)}>Record</button>
        <button onClick = {track.stopRecording.bind(track)}>Stop Recording</button>
      </div>
    );
  }
});

module.exports = Recorder;
