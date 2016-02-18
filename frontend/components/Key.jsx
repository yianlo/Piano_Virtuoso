var React = require('react');
var KeyStore = require('../stores/key_store');
var KeyActions = require('../actions/key_actions');
var Note = require('../util/Note');
var ToneMap = require('../constants/Tones');

var listenerToken;

var Key = React.createClass({
  getInitialState: function(){
    return {noteNames: KeyStore.all()};
  },

  componentDidMount: function(){
    var freq = ToneMap[this.props.noteName];
    this.note = new Note(freq);
    listenerToken = KeyStore.addListener(this.storeChanged);
    // KeyStore.fetch();
  },

  storeChanged: function(){
    this.setState( { noteNames: KeyStore.all() } );
  },

  componentWillUnmount: function(){
    listenerToken.remove();
  },

  checkNoteName: function(){
    if (!this.note) { return; }
    if (this.state.noteNames.indexOf(this.props.noteName) > -1 ){
      this.note.start();
    } else {
      this.note.stop();
    }
  },

  render: function(){
    return (
      <li className = "key">{this.props.noteName} {this.checkNoteName()}</li>
      );
  }
});

module.exports = Key;
