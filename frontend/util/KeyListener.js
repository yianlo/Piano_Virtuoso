var KeyAction = require('../actions/key_actions');
var KeyMap = require('../constants/KeyMap');

var KeyListener = function(){
  $(document).on( "keydown", function(e){
    var noteName = KeyMap[e.keyCode];
    KeyAction.addKey(noteName);
  } );
  $(document).on( "keyup", function(e){
    var noteName = KeyMap[e.keyCode];
    KeyAction.removeKey(noteName);
  });
};

module.exports = KeyListener();
