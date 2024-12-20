window.addEventListener("load" , function() {
    const getLocalStorageData = getLocalStorage();
    if (getLocalStorageData) {
        for (let i = 0; i < getLocalStorageData.length; i++) {
            showLocalStorage(getLocalStorageData[i]);
        }
    }
});

function insertTodo(event) {
    if(event.key === 'Enter') {
        setLocalStorage();
        createdValue();
    }
}

function createdButton (inner , className) {
    const createbutton = document.createElement("button");
    createbutton.innerHTML = inner;
    createbutton.className = className;
    
    return createbutton;
}

function createdInput (inner , type , className) {
    const createdInput = document.createElement("input");
    createdInput.inner = inner;
    createdInput.type = type;
    createdInput.className = className;

    return createdInput;
    
}

function createdElement (element , inner , className) {
    const createdElement = document.createElement(element);
    createdElement.inner = inner;
    createdElement.className = className;
    
    return createdElement;
}

function findTopNode (event) {
    const topNode = event.target.parentElement;
    return topNode;
}

function createdValue() {
    const input = document.querySelector('.todo-input');
    const inputValue = input.value.trim();

    if (inputValue === '') return;

    const newLi = createdElement("li" , "newLi" , "newLi");
    
    const createdCheckBox = createdInput("checkBox" , "checkBox" , "todoCheckBoxList");
    newLi.append(createdCheckBox)
    
    const newSpan = createdElement("span" , "newSpan" , "newSpan");
    newSpan.append(inputValue);
    newLi.append(newSpan)
    
    const createdEdit = createdButton("Edit" , "editBtn");
    createdEdit.addEventListener('click' , (event) => {clickEditBtn(event)});
    
    const createdXBtn = createdButton("X" , "xBtn");
    createdXBtn.addEventListener('click', (event) => {clickXBtn(event);});
    
    const createdSave = createdButton("Save" , "saveBtn");
    createdSave.style.display = "none";
    createdSave.addEventListener('click', (event) => {clickSaveBtn(event);});
    
    newLi.append(createdEdit , createdSave , createdXBtn);
    
    const todoList = document.getElementById('todo-list')
    todoList.append(newLi);
    
    input.value = '';
    
    return todoList;
}

function changeFilter () {
    const checkValues = document.getElementById("todo-filter").value;
    todoFilter(checkValues);
}

function todoFilter(checkValues) {
    const todoList = document.querySelectorAll('#todo-list li');
    const checkboxList = document.getElementsByClassName('todoCheckBoxList');

    for(let i = 0; i < todoList.length; i++) {
        const tdcheck = checkboxList[i];
        
        if (checkValues === "all") {
            todoList[i].style.display = "list-item";
        }
        else if (checkValues === "todo" && !tdcheck.checked) {
            todoList[i].style.display = "list-item";
            }
        else if (checkValues === "done" && tdcheck.checked) {
            todoList[i].style.display = "list-item";
        }
        else {
            todoList[i].style.display = "none";
        }
    }
}

function clickXBtn(event) {
    const topNode = findTopNode(event);
    const getNumber = parseInt(topNode.querySelector("span").id, 10);
    const getLocalStorageData = getLocalStorage();

    const updateLocalStorageData = getLocalStorageData.filter(item => item.Number !== getNumber);
    saveLocalStorage(updateLocalStorageData);

    topNode.remove();

}

function clickEditBtn(event) {
    const topNode = findTopNode(event);

    const editInput = createdInput("editInput" , "text" , "editInput");
    const editSpan = createdElement("span" , "editSpan" , "editSpan");
    editSpan.append(editInput);

    const findSaveBtn = topNode.querySelector(".saveBtn");
    findSaveBtn.style.display = "inline";
    
    const findEditBtn = topNode.querySelector(".editBtn");
    findEditBtn.style.display = "none";
    
    const findXBtn = topNode.querySelector(".xBtn");
    findXBtn.style.display = "none";
    
    const changeSpan = topNode.querySelector("span");
    topNode.replaceChild(editSpan , changeSpan);

}

function clickSaveBtn (event) {
    const topNode = findTopNode(event);
    const saveEdit = topNode.querySelector(".editSpan");
    const saveInput = saveEdit.querySelector(".editInput");
    saveEdit.innerText = saveInput.value;
    
    const findSaveBtn = topNode.querySelector(".saveBtn");
    findSaveBtn.style.display = "none";
    
    const findEditBtn = topNode.querySelector(".editBtn");
    findEditBtn.style.display = "inline";
    
    const findXBtn = topNode.querySelector(".xBtn");
    findXBtn.style.display = "inline";

    setLocalStorage();

}

function setLocalStorage () {
    const saveDataArray = []
    const todoList = document.querySelector('.todo-list');

    for (let i = 0; i < todoList.children.length; i++) {
        const getSpan = todoList.children[i].querySelector('span');

        const saveDataObj = {
            Text : getSpan.innerHTML,
            Number : parseInt(i , 10)
        };
        getSpan.id = i;
        saveDataArray.push(saveDataObj);
    }
    saveLocalStorage(saveDataArray);
}

function saveLocalStorage(data) {
    localStorage.setItem("Save" , JSON.stringify(data));
}

function showLocalStorage (getLocalStorageData) {
    const newLi = createdElement("li" , "newLi" , "newLi");

    const createdCheckBox = createdInput("checkBox" , "checkBox" , "todoCheckBoxList");
    newLi.append(createdCheckBox)

    const newSpan = createdElement("span" , "newSpan" , "newSpan");
    newSpan.append(getLocalStorageData.Text);
    newSpan.id = parseInt(getLocalStorageData.Number);
    newLi.append(newSpan);

    const createdEdit = createdButton("Edit" , "editBtn");
    createdEdit.addEventListener('click' , (event) => {clickEditBtn(event)});
    
    const createdXBtn = createdButton("X" , "xBtn");
    createdXBtn.addEventListener('click', (event) => {clickXBtn(event);});
    
    const createdSave = createdButton("Save" , "saveBtn");
    createdSave.style.display = "none";
    createdSave.addEventListener('click', (event) => {clickSaveBtn(event);});
    
    newLi.append(createdEdit , createdSave , createdXBtn);

    const todoList = document.getElementById('todo-list')
    todoList.append(newLi);
    
}

function getLocalStorage () {
    const getLocalStorageData = JSON.parse(localStorage.getItem('Save'));
    return getLocalStorageData;
}