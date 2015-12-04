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
 *    Functions used to obtain 
 *    task name and time of the task from the
 *    DOM tree
 */   
function getNameOfTask(columns){
    return columns[0].getElementsByTagName('input')[0].value
}

function getTimeOfTask(columns){
    return timeOfTask = columns[1].getElementsByTagName('span')[0].innerText
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
    for (var i = 1; i < rows.length; i++){
        //For each row grab the task name and time and put into JSON object
        columnsOfCurrRow = rows[i].children
        nameOfTask = getNameOfTask(columnsOfCurrRow); 
        timeOfTask = getTimeOfTask(columnsOfCurrRow); 
        tableJson.push({"task":nameOfTask, "time":timeOfTask});
    }
    return tableJson;
}

/*
*   This function takes the JSON table
*   and posts it to /archive
*/
function postTableToServer(){
    var form = {};
    /*Post via ajax*/
    form.method = 'post';
    form.action = '/ajaxarchive';
    /*Convert our table to JSON to send to server*/
    var tableJson = tableToJson();
   
    /*Create the request to send to server*/    
    var xhr = new XMLHttpRequest();
    xhr.open(form.method,form.action,true);
    xhr.setRequestHeader('Content-Type','application/json; charset=UTF-8');

    /*Alert user how the server responds*/
    xhr.onreadystatechange = function(event){
        var serverResponse = event.target
        
        /*If the request went through and the server is done responding then... */
        if (serverResponse.readyState === 4 && serverResponse.status === 200 ){
            /*Alert the user as to what the response was*/
            alert(serverResponse.responseText);
        }
    }

    /*Send the JSON to the server*/
    xhr.send(JSON.stringify(tableJson));
}

/*Make it so that when the link is clicked the archiving occurs*/
window.addEventListener("load", function(){
    var archiveTasksLink = document.getElementById('archive-tasks');
    archiveTasksLink.addEventListener("click",postTableToServer);
})
