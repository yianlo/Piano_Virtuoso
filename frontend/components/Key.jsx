var React = require('react');
var KeyStore = require('../stores/key_store');
var KeyActions = require('../actions/key_actions');
var Note = require('../util/Note');
var ToneMap = require('../constants/Tones');
var KeyNameMap = require('../constants/KeyNameMap');

var listenerToken;

var Key = React.createClass({
  getInitialState: function(){
    this.keyType = this.props.noteName.match(/S/) ? "black-key" : "white-key";
    this.classname = this.keyType;

    var freq = ToneMap[this.props.noteName];
    this.note = new Note(freq);

    return {
      noteNames: KeyStore.all(),
      keyPlaying: false
    };
  },

  componentWillMount: function(){
    this.firstMount = true;
  },

  componentDidMount: function(){
    listenerToken = KeyStore.addListener(this.storeChanged);
    this.firstMount = false;

    // KeyStore.fetch();
  },

  storeChanged: function(){
    this.setState( { noteNames: KeyStore.all() } );
  },

  componentWillUnmount: function(){
    listenerToken.remove();
  },

  addNote: function(){
    KeyActions.addKey(this.props.noteName);
  },

  removeNote: function(){
    KeyActions.removeKey(this.props.noteName);
  },

  checkNoteName: function(){
    if (this.state.noteNames.indexOf(this.props.noteName) > -1 ){
      this.note.start();
      this.classname = this.classname + " " + this.keyType + "-playing"
    } else {
      this.note.stop();
      this.classname = this.keyType;
    }
  },

  renderKeyText: function(){
    // if (this.mounted){
      if (this.props.noteNameShown){
        var strippedText = this.props.noteName.replace(/S/g, '#').replace(/[0-9]/g, '');
        return( <div className="key-text">{strippedText}</div> )
      } else if (this.props.keyNameShown){
        return( <div className="key-text">{KeyNameMap[this.props.noteName]}</div> )
      // } else {
        // return( <div className="hidden-key-text"></div> )
      }
    // }
  },

  render: function(){
    this.checkNoteName()

    return (
      <section
        className={this.classname}
        onMouseDown={this.addNote}
        onMouseUp={this.removeNote}>
        { this.renderKeyText() }
      </section> );
  }
});

module.exports = Key;
