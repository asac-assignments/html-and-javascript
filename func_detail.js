function enterKey(event) {
    if(event.key === 'Enter') {
        createTodo();
    }
}

function createTodo() {
    const list = document.getElementById('todo-list');
    const input = document.querySelector('.todo-input');
    const inputText = input.value.trim();

    if (inputText === '') {
        alert("내용을 입력하세요.");
        return;
    }

    const isConfirm = confirm(`"${inputText}"를 저장하시겠습니까?`);
    if (!isConfirm) {
        return;
    }

    // 피드백) Element Create하는 부분들 모듈화(함수를 모듈화해서 객체로 전달하는 것이 좋다. 버튼을 생성할때, 생성 함수는 1개에 인자를 다르게 해서 생성하는 느낌)

    // Create List Element
    const newTodo = document.createElement('li');
    
    // Checkbox
    const checkbox = createCheckbox('input', 'checkbox', 'todo-checkbox')
    newTodo.appendChild(checkbox);
    
    // TextContent
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = inputText;
    newTodo.appendChild(todoText);
    
    // Button
    const editButton = createButton('button', 'Edit', 'edit-btn');
    newTodo.appendChild(editButton);
    const saveButton = createButton('button', 'Save', 'save-btn');
    newTodo.appendChild(saveButton);
    const deleteButton = createButton('button', 'X', 'delete-btn');
    newTodo.appendChild(deleteButton);

    // // 피드백) eventListener는 이벤트를 통해서 조작해야하기 때문에 editTodo ParentNode정돈 허용해야한다.
    // // -> eventListener는 이벤트가 발생한 요소에 대한 파라미터를 제공함.
    list.appendChild(newTodo);

    input.value = '';
}

function createCheckbox(tag, type, className) {
    const checkbox = document.createElement(tag);
    checkbox.type = type;
    checkbox.classList.add(className);

    return checkbox;
}

function createButton(tag, buttonText, className) {
    const button = document.createElement(tag);
    button.textContent = buttonText;
    button.classList.add(className);
    button.addEventListener('click', (e) => { handleButtonEvent(e) } );

    if (buttonText === 'Save') button.style.display = 'none';

    return button;
}

function handleButtonEvent(e) {
    const buttonName = e.target.className;
    switch (buttonName) {
        case 'edit-btn' :
            editTodo(e);
            break;
        case 'save-btn' :
            saveTodo(e);
            break;
        case 'delete-btn' :
            deleteTodo(e);
            break;
        default :
            console.warn('Unknown Button Action');
            break;
    }
}

function listFilter(event) {
    const filter = event.target.value;
    const todoList = document.querySelectorAll('#todo-list li');

    todoList.forEach(todo => {
        const checkbox = todo.querySelector('.todo-checkbox');
        const isChecked = checkbox.checked;
 
        if (filter === "all") {
            console.log(filter);
            todo.style.display = 'list-item';
        } else if (filter === 'todo' && !isChecked) {
            todo.style.display = 'list-item';
        } else if (filter === 'done' && isChecked) {
            todo.style.display = 'list-item';
        } else {
            todo.style.display = 'none';
        }
    })
}

function editTodo(event) {
    // 피드백) 하나의 컴포넌트가 두 개 이상의 작업을 수행하게 되어있음.
    // 역할을 나눠놓는 것이 좋다. Edit, Save
    const item = event.target.parentNode;
    const todo = item.querySelector('.todo-text');
    const editBtn = item.querySelector('.edit-btn');
    const saveBtn = item.querySelector('.save-btn');
    saveBtn.style.display = 'inline';
    editBtn.style.display = 'none';

    const input = document.createElement('input');
    // Map으로 중앙화도 가능
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'todo-text');
    input.setAttribute('value', todo.textContent);
    item.replaceChild(input, todo);
}

function saveTodo(event) {
    const item = event.target.parentNode;
    const editBtn = item.querySelector('.edit-btn');
    const saveBtn = item.querySelector('.save-btn');

    const input = item.querySelector('.todo-text');
    if (input.value.trim() === '') {
        alert('내용을 입력하세요.');
        return;
    }
    const saveTodo = document.createElement('span');
    saveTodo.classList.add('todo-text');
    saveTodo.textContent = input.value.trim();

    item.replaceChild(saveTodo, input);
    editBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
}

// 주어진 걸 최대한 쓰자 이벤트리스너의 파라미터.
function deleteTodo(event) {
    const todo = event.target.parentNode;
    todo.remove();
}