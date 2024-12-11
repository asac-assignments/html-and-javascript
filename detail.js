// 많이 어거지 스럽지만, 돌아는 갑니다.. 
// map 대신 객체로 저장하는 게 더 바람직할 것 같습니다.


const todoList = document.getElementById('todo-list');
const input = document.querySelector('.todo-input');
const filter = document.getElementById('todo-filter');
const items = new Map();

filter.onchange = () => {showFilteredList()};

function enterKey(e) {
    if (e.key === 'Enter') {
        insertItem();
    }
}

// 추가 기능
function insertItem() {
    const inputText = input.value.trim();
    if (inputText === '') {
        alert('값을 입력해주세요!');
        return;
    }
    items.set(inputText, false);

    showFilteredList();
    input.value = '';
}

// 조회 기능 - 필터
function showFilteredList() {
    const filtered = new Map(items);
    if (filter.value === 'todo') {
        filtered.forEach((value, key,map)=> {
            if (value) map.delete(key);
        })
    } else if (filter.value === 'done') {
        filtered.forEach((value, key,map)=> {
            if (!value) map.delete(key);
        })
    }

    showList(filtered);
}

// 조회 기능 - 화면에 표시
function showList(list) {
    todoList.innerHTML = '';

    for (const [key, value] of list) {
        const item = document.createElement('li');
        const box = document.createElement('input');
        box.setAttribute('type', 'checkbox');
        box.checked = value;
        // 완료 기능
        box.addEventListener('click', () => {
            items.set(key,
                (items.get(key)) ? false : true
            );
        });
        const text = document.createElement('span');
        text.textContent = key;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editItem(item)
        });
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        // 삭제 기능
        removeButton.addEventListener('click', () => {
            items.delete(key);
            showFilteredList();
        });
        
        item.appendChild(box);
        item.appendChild(text);
        item.appendChild(editButton);
        item.appendChild(removeButton);
        todoList.appendChild(item);
    }
}

// 수정 기능
function editItem(item) {
    const oldText = item.querySelector('span').textContent;
    item.innerHTML = '';
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = oldText;
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', ()=>{
        const newText = input.value.trim();
        if (newText === '') {
            alert('값을 입력해주세요!');
            return;
        } else if (newText === oldText) {
            showFilteredList();
            return;
        }
        items.set(newText, items.get(oldText));
        items.delete(oldText);
        showFilteredList();
    });
    item.appendChild(input);
    item.appendChild(saveButton);
}