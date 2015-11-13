window.onload = function(){
var taskTable = document.getElementById('tasks-list');
document.getElementById('add-task').addEventListener("click",function(event){
  event.preventDefault();
  var newTaskElement = document.createElement('tr');
  var newFirstCol = '<td> <input type="text" name="first_name"  />' ;
  var newSecondCol = document.createElement('td')
  newSecondCol.className = 'watch';
  var newWatch = document.createElement('script');
  newWatch.type = 'text/javascript';
  var watchCode='var allTD = document.getElementsByClassName("watch"); var lastTD = allTD[allTD.length-1]; new Stopwatch(lastTD);';
  newWatch.appendChild(document.createTextNode(watchCode));
  newSecondCol.appendChild(newWatch);
  newTaskElement.innerHTML=newFirstCol;
  newTaskElement.appendChild(newSecondCol);
  taskTable.appendChild(newTaskElement);
  console.log("hi");
});
};
