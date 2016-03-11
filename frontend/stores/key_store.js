var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher');

var _keys = [];
var KeyStore = new Store(AppDispatcher);


KeyStore.__onDispatch = function(payload){
  switch (payload.actionType){
    case "ADD_KEY":
      _addKey(payload.key);
      KeyStore.__emitChange();
      break;
    case "REMOVE_KEY":
      _removeKey(payload.key);
      KeyStore.__emitChange();
      break;
    case "GROUP_UPDATE":
      _groupUpdate(payload.notes);
      this.__emitChange();
      break;
  }

};

KeyStore.all = function(){
  return _keys.slice();
};

var _groupUpdate = function (keys) {
  _keys = keys.slice();
};

var _addKey = function(key){
  if ( _keys[_keys.length - 1] !== key ) {
    _keys.push(key);
  }
};

var _removeKey = function(key){
  var indx = _keys.indexOf(key);
  _keys.splice(indx, 1);
};

module.exports = KeyStore;
