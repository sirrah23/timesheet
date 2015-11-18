window.onload = function(){
    /*
     *  This script adds functionality to the Add Task link on the page
     *  so that when it is clicked a row is added the task table 
     */
    //Grab the table 
    var taskTable = document.getElementById('tasks-list');
    //When the button is clicked, append a row to the table
    document.getElementById('add-task').addEventListener("click",function(event){
        //Make it so that the link doesn't redirect us anywhere
        event.preventDefault();
        //Create the new row element to be appended to the table
        var newTaskElement = document.createElement('tr');
        //This is the html that goes in the left column, where the name of the task is inputted
        var newFirstCol = '<td> <input type="text" name="first_name"  />' ;
        //Create the td element that will contain the stopwatch for the right column 
        var newSecondCol = document.createElement('td')
        //The new class will tell the new stopwatch where to attach itself
        newSecondCol.className = 'watch';
        //Create a script tag in which to place the stopwatch creation code
        var newWatch = document.createElement('script');
        //The script will contain javascript to be run
        newWatch.type = 'text/javascript';
        //This code appends a stopwatch to the most recent 'watch' class column
        var watchCode='var allTD = document.getElementsByClassName("watch"); +
                      'var lastTD = allTD[allTD.length-1]; new Stopwatch(lastTD);';
        //Append the javascript text to the script tag
        newWatch.appendChild(document.createTextNode(watchCode));
        //Append the stopwatch to the second column 
        newSecondCol.appendChild(newWatch);
        //Append the first column to the new table row
        newTaskElement.innerHTML=newFirstCol;
        //Append the second column to the new table row
        newTaskElement.appendChild(newSecondCol);
        //Add the new row to the table
        taskTable.appendChild(newTaskElement);
    });
};
