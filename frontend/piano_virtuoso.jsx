var React = require('react'),
    ReactDom = require('react-dom'),
    Organ = require('./components/Organ'),
    Recorder = require('./components/Recorder');

window.KeyListener = require('./util/KeyListener');

ReactDom.render( <Organ />, root);



//
// window.Notes = require('./util/Note');
// window.Tones = require('./constants/Tones');
//
// window.AppDispatcher = require('./dispatcher/Dispatcher');
// window.KeyAction = require('./actions/key_actions');
// window.Store = require('./stores/key_store');
//
