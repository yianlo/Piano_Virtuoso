var KeyActions = require('../actions/key_actions');

var Track = function(attrHash){
  this.name = attrHash.name;
  this.roll = attrHash.roll || [];
};

Track.prototype.addNotes = function (notes) {
  console.log("note added");
  var timeSlice = new Date() - this.currentTime;
  this.roll.push( {timeSlice: timeSlice, notes: notes} );
};

Track.prototype.startRecording = function () {
  console.log(this);
  console.log("recording started");
  this.roll = [];
  this.currentTime = new Date();
};

Track.prototype.stopRecording = function() {
  console.log(this);
  console.log("recording stopped");
  this.addNotes([]);
};

Track.prototype.play = function() {
  var playBackStartTime = new Date();
  var playingNotes = [];

  this.roll.forEach(function(noteTime){
    if(noteTime.notes.length === 0){ //IF we hit a blank
      playingNotes.forEach(function(playingNote){
        var duration = noteTime.timeSlice - playingNote.startTime;
        setTimeout(KeyActions.removeKey.bind(playingNote.noteName), duration);
      });
    } else {
      playingNotes.forEach(function(playingNote, idx){
        if(noteTime.notes.indexOf(playingNote) === -1){
          var duration = noteTime.timeSlice - playingNote.startTime;
          setTimeout(KeyActions.removeKey.bind(playingNote.noteName), duration);

          playingNotes.splice(idx, 1);
        }
      });
    }

    noteTime.notes.forEach(function(noteName){
      if (playingNotes.indexOf(noteName) !== -1){
        playingNotes.push({noteName: noteName, startTime: noteTime.timeSlice});
        KeyActions.addKey(noteName);
      }
    });

      // var intervalId = setInterval(function(){
      //   if ( new Date() - playBackStartTime < noteTime.timeSlice){
      //   KeyActions.addKey(noteName);
      //   } else {
      //   KeyActions.removeKey(noteName);
      //   clearInterval(intervalId);
      //   }
      // }, 10);
  });
};


module.exports = Track;
