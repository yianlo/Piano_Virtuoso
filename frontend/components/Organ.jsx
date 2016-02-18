var React = require('react');
var ToneMap = require('../constants/Tones');
var Key = require('./Key');

var Organ = React.createClass({
  render: function(){
    return(
      <ul>
        {this.renderKeys()}
      </ul>
    );
  },
  renderKeys: function(){
    var keysArray = Object.keys(ToneMap);
    
    return(
      keysArray.map(function(key, idx){
        return <Key key = {idx} noteName = {key}/>;
      })
    );
  }
});

module.exports = Organ;
