function enterKey(event) {
    if(event.key === 'Enter') {
        craeteTodo();
    }
}

function craeteTodo() {
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
    // Create List Element
    const newTodo = document.createElement('li');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    // Checkbox
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');
    newTodo.appendChild(checkbox);

    // TextContent
    todoText.classList.add('todo-text');
    todoText.textContent = inputText;
    newTodo.appendChild(todoText);

    // Button
    editButton.textContent = "Edit";
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => { editTodo(newTodo) });
    newTodo.appendChild(editButton);

    deleteButton.textContent = "X";
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => { deleteTodo(newTodo) });
    newTodo.appendChild(deleteButton);

    list.appendChild(newTodo);

    input.value = '';
}

function listFilter(event) {
    const filter = event.target.value;
    const todoList = document.querySelectorAll('#todo-list li')
    
    todoList.forEach(todo => {
        const checkbox = todo.querySelector('.todo-checkbox');

        if (filter === "all") {
            todo.style.display = 'list-item';
        } else if (filter === 'todo' && !checkbox.checked) {
            todo.style.display = 'list-item';
        } else if (filter === 'done' && checkbox.checked) {
            todo.style.display = 'list-item';
        } else {
            todo.style.display = 'none';
        }
    })
}

function editTodo(item) {
    const todo = item.querySelector('.todo-text');
    const editBtn = item.querySelector('.edit-btn');

    if (editBtn.textContent === 'Edit') {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'todo-text');
        input.setAttribute('value', todo.textContent);
        item.replaceChild(input, todo);
        editBtn.textContent = 'Save';
    } else {
        const input = item.querySelector('.todo-text');
        if (input.value.trim() === '') {
            alert('내용을 입력하세요.');
            return;
        }
        const editTodo = document.createElement('span');
        editTodo.classList.add('todo-text');
        editTodo.textContent = input.value.trim();

        item.replaceChild(editTodo, input);
        editBtn.textContent = 'Edit';
    }
}

function deleteTodo(item) {
    item.remove();
}