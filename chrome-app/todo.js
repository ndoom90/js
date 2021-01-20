const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function filterFn(toDo) {
    return toDo.id === 1;
}

function deleteToDo(text) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
function checkSameValue(id) {
    for (i=0; i<toDos.length; i++) {
        if (toDos[i].id === id) {            
            return true;
        }                            
    }
    return false;
}
function makeId() {    
    let id = 1;
    while(checkSameValue(id)){   
        id++;                    
    }
    return id;    
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "X";    
    const span = document.createElement("span");
    const newId = makeId();
    // const newId = toDos.length + 1;
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const paredToDos = JSON.parse(loadedToDos);
        paredToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();