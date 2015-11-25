/*
*   This function goes through all of the 
*   links on the page and finds the stop buttons.
*   It clicks all of them in order stop all the stopwatches
*   So that we can store their values in a database
*/

function stopAllWatches(){
    var body = document.body;
    //Grab every link on the page
    var allLinks = body.getElementsByTagName('a');
    //Loop through the links and find all the stop links (buttons) 
    var allStopButtons = [];
    for (var i = 0; i < allLinks.length; i++){
        if (allLinks[i].innerText === "stop "){
            allStopButtons.push(allLinks[i]);
        }
    }
    //Click all the stop buttons in order to stop all of the stopwatches
    for (var i = 0; i < allStopButtons.length; i++){
        allStopButtons[i].click();
    }
}
/*
*   Takes the table of task, time pairs and turns them into 
*   A JSON object so that it can be sent to the server for 
*   database storage
*/
function tableToJson(){
    var body = document.body;
    //Stop all the watches so we can obtain their values
    stopAllWatches();
    //Grab all the rows in the table
    var rows = body.getElementsByTagName('tr');
    var tableJson = [];
    var columnsOfCurrRow, nameOfTask, timeOfTask;
    //Start at one to ignore column headers
    for (var i = 1; i < rows; i++){
        //For each row grab the task name and time and put into JSON object
        columnsOfCurrRow = rows[i].children
        nameOfTask = getNameOfTask(columnsOfCurrRow); 
        timeOfTask = getTimeOfTask(columnsOfCurrRow); 
        tableJson.push({"task":nameOfTask, "time":timeOfTask};
    }
    return tableJson;
}


/*
 *    Functions used to obtain 
 *    task name and time of the task from the
 *    DOM tree
 */   
function getNameOfTask(columns){
    return columns[0].firstChild.nextSibling.value;
}

function getTimeOfTask(columns){
    return timeOfTask = columns[1].firstChild.nextSibling.nextSibling.innerText
}
