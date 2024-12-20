function enterKey(event) {
    if(event.key === 'Enter') {
        createTodo();
    }
}

function loadLocalStorage() {
    const savedTodos = JSON.parse(localStorage.getItem('todoItem')) || [];
    savedTodos.forEach(todoData => {
        createTodo(todoData);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();
});

function getLocalStorageItem(currentItem) {
    const todos = JSON.parse(localStorage.getItem('todoItem')) || [];

    const index = Array.from(currentItem.parentNode.children).indexOf(currentItem);

    return {todos, index};
}

function saveLocalStorage(todo) {
    const existingTodo = JSON.parse(localStorage.getItem('todoItem')) || [];
    const content = todo.querySelector('.todo-text').textContent;
    const isChecked = todo.querySelector('.todo-checkbox').checked;
    const todoObject = {
        content : content,
        isChecked : isChecked,
    };
    existingTodo.push(todoObject);

    localStorage.setItem('todoItem', JSON.stringify(existingTodo));
}

function createTodo(todoData) {
    const list = document.getElementById('todo-list');
    const input = document.querySelector('.todo-input');
    const inputText = todoData ? todoData.content : input.value.trim();

    if (inputText === '') {
        alert("내용을 입력하세요.");
        return;
    }

    if (!todoData) {
        const isConfirm = confirm(`"${inputText}"를 저장하시겠습니까?`);
        if (!isConfirm) {
            return;
        }
    }

    // Create List Element
    const newTodo = document.createElement('li');
    
    // Checkbox
    const checkbox = createCheckbox('input', 'checkbox', 'todo-checkbox')
    if (todoData) checkbox.checked = todoData.isChecked;
    newTodo.appendChild(checkbox);
    
    // TextContent
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = inputText;
    newTodo.appendChild(todoText);
    
    // Button
    const editButton = createButton(BUTTON_TYPES.edit);
    newTodo.appendChild(editButton);
    const saveButton = createButton(BUTTON_TYPES.save);
    newTodo.appendChild(saveButton);
    const deleteButton = createButton(BUTTON_TYPES.delete);
    newTodo.appendChild(deleteButton);

    list.appendChild(newTodo);
    
    if (!todoData) {
        saveLocalStorage(newTodo);
        input.value = '';
    }
}

function createCheckbox(tag, type, className) {
    const checkbox = document.createElement(tag);
    checkbox.type = type;
    checkbox.classList.add(className);
    checkbox.addEventListener('change', (event) => {
        const item = event.target.parentNode;
        const {todos, index} = getLocalStorageItem(item);
        todos[index].isChecked = event.target.checked;
        localStorage.setItem('todoItem', JSON.stringify(todos));
    });

    return checkbox;
}

const BUTTON_TYPES = {
    edit: { tag: 'button', buttonText: 'Edit', className: 'edit-btn', handler: editTodo },
    save: { tag: 'button', buttonText: 'Save', className: 'save-btn', handler: saveTodo },
    delete: { tag: 'button', buttonText: 'X', className: 'delete-btn', handler: deleteTodo },
};

function createButton({tag, buttonText, className, handler}) {
    const button = document.createElement(tag);
    button.textContent = buttonText;
    button.classList.add(className);
    button.addEventListener('click', handler);

    if (buttonText === 'Save') button.style.display = 'none';

    return button;
}

function listFilter(event) {
    const filter = event.target.value;
    const todoList = document.querySelectorAll('#todo-list li');

    todoList.forEach(todo => {
        const checkbox = todo.querySelector('.todo-checkbox');
        const isChecked = checkbox.checked;
 
        const isVisible =
        filter === "all" ||
        (filter === 'todo' && !isChecked) ||
        (filter === 'done' && isChecked);

        todo.style.display = isVisible ? 'list-item' : 'none';
    });
}

function editTodo(event) {
    const item = event.target.parentNode;
    const todo = item.querySelector('.todo-text');
    const editButton = item.querySelector('.edit-btn');
    const saveButton = item.querySelector('.save-btn');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'todo-text');
    input.setAttribute('value', todo.textContent);

    item.replaceChild(input, todo);

    saveButton.style.display = 'inline';
    editButton.style.display = 'none';
}

function saveTodo(event) {
    const item = event.target.parentNode;
    const editButton = item.querySelector('.edit-btn');
    const saveButton = item.querySelector('.save-btn');

    const input = item.querySelector('.todo-text');
    if (input.value.trim() === '') {
        alert('내용을 입력하세요.');
        return;
    }
    const saveTodo = document.createElement('span');
    saveTodo.classList.add('todo-text');
    saveTodo.textContent = input.value.trim();

    item.replaceChild(saveTodo, input);

    const {todos, index} = getLocalStorageItem(item);
    todos[index].content = saveTodo.textContent;
    localStorage.setItem('todoItem', JSON.stringify(todos));
    

    editButton.style.display = 'inline';
    saveButton.style.display = 'none';
}

function deleteTodo(event) {
    const todo = event.target.parentNode;
    const {todos, index} = getLocalStorageItem(todo);

    todos.splice(index, 1);
    localStorage.setItem('todoItem', JSON.stringify(todos));
    if (todos.length === 0) {
        localStorage.removeItem('todoItem');
    }

    todo.remove();
}