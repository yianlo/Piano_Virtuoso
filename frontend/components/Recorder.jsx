var React = require('react'),
    Track = require("../util/Track"),
    KeyStore = require('../stores/key_store');

var Recorder = React.createClass({
  componentDidMount: function () {
    KeyStore.addListener(this._keysChanged);
  },

  getInitialState: function () {
    return {
      recording: false, track: new Track() };
  },

  isDoneRecording: function () {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording: function () {
    return this.state.recording;
  },

  isTrackNew: function () {
    return this.state.track.isBlank();
  },

  playClass: function () {
    var className = ("play-button" + this.isTrackNew() ? "" : " disabled");
    console.log(className);
    return ("play-button" + this.isTrackNew() ? "" : " disabled");
  },

  playClick: function (e) {
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  recordClick: function (e) {
    if (this.state.recording) {
      this.state.track.completeRecording();
      this.setState({ recording: false });
    } else {
      this.setState({ recording: true });
      this.state.track.startRecording();
    }
  },

  saveTrack: function (e) {
    this.state.track.set('name', prompt("please enter name"));
    this.state.track.save();
  },

  trackSavingElements: function () {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} className="control">
          Save Track
        </button>
      );
    }
  },

  _keysChanged: function () {
    if (this.state.recording){
      this.state.track.addNotes(KeyStore.all());
    }
  },

  render: function () {
    var hasTrack = this.isTrackNew();
    var recordingStatus = this.state.recording ? " is-recording" : " not-recording";

    return (
      <section className="controls">
        <p className="recorder">  Recorder</p>
        <p onClick={this.recordClick} className={"button record-button" + recordingStatus}>
          {"\u25CF"}
        </p>
        <p onClick={this.playClick} className="button play-button">
          {"▶"}
        </p>
      </section>
    );
  }
});

module.exports = Recorder;
