var AppDispatcher = require('../dispatcher/Dispatcher');

var KeyActions = {
  groupUpdate: function (notes) {
    AppDispatcher.dispatch({
      actionType: "GROUP_UPDATE",
      notes: notes
    });
  },

  addKey: function(key) {
    AppDispatcher.dispatch({
      actionType: "ADD_KEY",
      key: key
    });
  },

  removeKey: function(key) {
    AppDispatcher.dispatch({
      actionType: "REMOVE_KEY",
      key: key
    });
  }
};


module.exports = KeyActions;
