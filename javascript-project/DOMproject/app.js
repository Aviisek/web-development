//Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


//load all event listeners
loadEventListeners();

function loadEventListeners(){
    
    //DOM event listener
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);
    
    taskList.addEventListener('click', removeTask);
    
    clearBtn.addEventListener('click', clearTask);
    
    filter.addEventListener('keyup', filterTask);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    tasks.forEach(function(task){
        addLiElement(task); 
    })
}


function addTask(event){
    
    if(taskInput.value === ""){
        alert("Add a task");
    }else{
        addLiElement(taskInput.value);
    }
    
    //store in localstorage
    storeTaskInLocalStorage(taskInput.value);
    
    taskInput.value = "";
    
    event.preventDefault();
}

function addLiElement(task){
    //create Li element
    const li = document.createElement("li");
    //Add materialize class
    li.className = "collection-item";
    
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    
    //create new link element
    const link = document.createElement("a");
    //add materialize class
    link.className = "delete-item secondary-content"
    //add icon html
    link.innerHTML = "<i class='fa fa-remove'</i>";
    
    li.style.fontWeight="bold";
    li.style.color = "blue";
    
    li.appendChild(link);
    
    //append li to ul
    taskList.appendChild(li);
}

function storeTaskInLocalStorage(task){
    let tasks;
    task=task.trim();
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if(task !="" && task != null){
        tasks.push(task);
    }
    
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTask(event){
    
    if(event.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
            event.target.parentElement.parentElement.remove();
            //Remove from localstorage
            removeTaskInLocalStorage(event.target.parentElement.parentElement.textContent);
        }     
    }
    
    event.preventDefault();
}

function removeTaskInLocalStorage(text){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    tasks.forEach(function(task,index){
        if(task === text){
            tasks.splice(index,1);
        }
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask(event){
    while(taskList.firstChild){
        // tasklist.removeChild(taskList.firstChild);
        taskList.firstChild.remove();
    }
    
    localStorage.clear();

    event.preventDefault();
}

function filterTask(event){
    const text = event.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(
    function(task){
        const item = task.firstChild.textContent ;
        task.style.display = "block";
        
        if(item.toLowerCase().indexOf(text) == -1){
            task.style.display= "none";
        }
    })
    
    event.preventDefault();
}