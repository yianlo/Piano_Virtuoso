var React = require('react');
var ToneMap = require('../constants/Tones');
var Key = require('./Key');

var Recorder = require('./Recorder');


var Organ = React.createClass({
  getInitialState: function(){
    return {
      noteNameShown: false,
      showNotesText: "Show notes",
      keyNameShown: false,
      showKeysText: "Show keys"
    }

  },

  toggleNoteNames: function(){
    if (this.state.noteNameShown){
      this.setState( {
        noteNameShown: false,
        showNotesText: "Show notes"
      } );
    } else {
      if (this.state.keyNameShown) {
        this.setState( {
          keyNameShown: false,
          showKeysText: "Show keys" });
      }

      this.setState( {
        noteNameShown: true,
        showNotesText: "Hide notes"
      });
    }
  },

  toggleKeyNames: function(){
    if (this.state.keyNameShown){
      this.setState( {
        keyNameShown: false,
        showKeysText: "Show keys"
      } );
    } else {
      if (this.state.noteNameShown) {
        this.setState( {
          noteNameShown: false,
          showNotesText: "Show notes"
        })
      }

      this.setState( {
        keyNameShown: true,
        showKeysText: "Hide keys"
      });
    }
  },

  renderKeys: function(){
    var keysArray = Object.keys(ToneMap);
      return(
        keysArray.map(function(key, idx){
          return <Key
                  noteNameShown={this.state.noteNameShown}
                  keyNameShown={this.state.keyNameShown}
                  key={idx}
                  noteName = {key}/>;
        }.bind(this))
      );
  },

  render: function(){
    return(
      <div className="container">
        <section className="keyboards">
          {this.renderKeys()}
        </section>
        <section className="buttons">
          <section className="links">
            <p className="show-link" onClick={this.toggleNoteNames}>{this.state.showNotesText}</p>
            <p className="show-link" onClick={this.toggleKeyNames}>{this.state.showKeysText}</p>
          </section>
          <Recorder />
        </section>

      </div>
    );
  }
});

module.exports = Organ;
