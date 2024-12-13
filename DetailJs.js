function insertTodo(event) {
    if(event.key === 'Enter') {
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
    const inputValue = document.querySelector('.todo-input').value.trim();
    if (inputValue == '') return;

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

    return todoList;
}

function todoFilter() {
    const checkboxList = document.getElementsByClassName('todoCheckBoxList');
    const todoList = document.querySelectorAll('#todo-list li');
    const checkValues = document.getElementById("todo-filter").value;

    for(let i = 0; i < todoList.length; i++) {
        const tdcheck = checkboxList[i];
        
        if (checkValues == "all") {
            todoList[i].style.display = "list-item";
        }
        else if (checkValues == "todo" && !tdcheck.checked) {
            todoList[i].style.display = "list-item";
            }
        else if (checkValues == "done" && tdcheck.checked) {
            todoList[i].style.display = "list-item";
        }
        else {
            todoList[i].style.display = "none";
        }
    }
}

function clickXBtn(event) {
    const topNode = findTopNode(event);
    topNode.remove();
};

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

}