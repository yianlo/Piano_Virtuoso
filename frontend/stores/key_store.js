var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher');

var _keys = [];
var KeyStore = new Store(AppDispatcher);


KeyStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case "ADD_KEY":
      addKey(payload.key);
      KeyStore.__emitChange();
      break;
    case "REMOVE_KEY":
      removeKey(payload.key);
      KeyStore.__emitChange();
      break;
  }

};

KeyStore.all = function(){
  return _keys.slice();
};

var addKey = function(key){
  if ( _keys[_keys.length - 1] !== key ) {
    _keys.push(key);
  }
};

var removeKey = function(key){
  var indx = _keys.indexOf(key);
  _keys.splice(indx, 1);
};

module.exports = KeyStore;
