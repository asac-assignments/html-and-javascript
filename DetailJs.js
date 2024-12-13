function show_text(event) {
    //Li 생성
    const createLi = document.createElement('li');

    //set text value
    const setInput = document.getElementsByClassName('todo-input')[0].value;
    
    // Check Box 생성
    const checkBox = document.createElement("input");
    checkBox.type ="checkbox";
    checkBox.classList.add('todoCheck');

    // Edit 버튼 생성
    const createEdit = document.createElement("button");
    createEdit.innerHTML = 'Edit';
    createEdit.classList.add("editBtn");

    // Save 버튼 생성
    const createSave = document.createElement("button");
    createSave.innerHTML = 'Save';
    createSave.classList.add("saveBtn");
    createSave.style.display = "none";

    // X 버튼 생성
    const createXbtn = document.createElement("button");
    createXbtn.innerHTML = 'X';
    createXbtn.type = "button";

    // 기본 Span 생성
    const createSpan = document.createElement("span");
    createSpan.append(setInput);

    // 수정 시 사용되는 Input text 생성
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.id = 'editInput';

    // 수정 시 사용되는 Span 생성
    const editSpan = document.createElement("span");
    editSpan.append(editInput);

    if (!setInput.trim()) {
        alert("공백 추가 x");
        return false;
    }

    if(event.key === 'Enter') {
        createLi.append(checkBox)
        createLi.append(createSpan)
        document
            .getElementById('todo-list')
            .appendChild(createLi)
            .append(createEdit , createSave , createXbtn)
        }

    createXbtn.addEventListener('click', function() {
        createLi.remove();
    });
    
    createEdit.addEventListener('click' , function() {
        createEdit.style.display = "none";
        createSave.style.display = "inline";
        
        createLi.replaceChild(editSpan , createSpan);

    });
    
    createSave.addEventListener('click' , function() {
        const saveInput = document.getElementById('editInput').value;
        
        if (!saveInput.trim()) {
            alert("수정 시 공백 x");
            return false;
        }

        createSpan.innerText = saveInput;
        createLi.replaceChild(createSpan , editSpan);
        
        createSave.style.display = "none";
        createEdit.style.display = "inline";
    });


}

function todoFilter() {
    const checkboxList = document.getElementsByClassName('todoCheck');
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