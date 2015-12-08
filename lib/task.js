module.exports = Task;

function Task(name){
  this.name = name;
  this.hours = 0;
  this.minutes=0;
  this.seconds=0;
}

Task.prototype.update = function(hours,minutes,seconds){
  this.hours = hours;
  this.minutes=minutes;
  this.seconds=seconds;
}
