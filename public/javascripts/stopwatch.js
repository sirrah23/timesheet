var Stopwatch = function(elem, options) {

  var timer     = createTimer(),
    startButton = createButton("start", start),
    stopButton  = createButton("stop", stop),
    resetButton = createButton("reset", reset),
    offset,
    clock,
    interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(document.createElement("br"));
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action+' ';
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render(0);
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    var time = formatTime();
    timer.innerHTML = time; 
  }

  function delta() {
  var now = Date.now(),
    d   = now - offset;

    offset = now;
    return d;
  }

  /*Refactor at some point*/
  function formatTime(){
    //convert current time to from ms to s
    var secondsToConvert = clock/1000;
    var secondsPerMin = 60
    var minutesPerHour = 60
    //get hours, minutes, and seconds out of current seconds
    var seconds = Math.floor(secondsToConvert%secondsPerMin);
    var minutes = Math.floor(secondsToConvert/secondsPerMin);
    var hours = Math.floor(minutes/minutesPerHour);
    minutes = Math.floor(minutes%minutesPerHour);
    var formattedTimeString = '';
    if (hours < 10){
      formattedTimeString = formattedTimeString + '0';
    }
    formattedTimeString = formattedTimeString + hours.toString() + ':';
    if (minutes < 10){
      formattedTimeString = formattedTimeString + '0';
    }
    formattedTimeString = formattedTimeString + minutes.toString() + ':';
    if (seconds < 10){
      formattedTimeString = formattedTimeString + '0';
    }
    formattedTimeString = formattedTimeString + seconds.toString();
    return formattedTimeString;
  }
  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};
