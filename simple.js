function keyCodeCheck(){
    // 엔터키를 사용하거나, 빈 내용이 아니면 아래 코드를 실행
    if(window.event.keyCode === 13 && document.querySelector('.todo-input').value.trim() !== ''){
        // 생성하는 메서드
        addToDo();
    }
}

function buttonCheck(){
    // 버튼클릭시 입력창의 요소가 빈 내용이 아니면 아래 코드를 실행
    if(document.querySelector('.todo-input').value.trim() !== ''){
        // 생성하는 메서드
        addToDo();
    }
}

function addToDo(){
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    
    if(confirm(`"${todoInput.value.trim()}" 저장하시겠습니까?`)){
        // li 요소 생성
        const newLi = document.createElement('li');
        
        // 생성된 li 요소에 내용 추가
        newLi.textContent = todoInput.value;
        
        // todoList에 li요소 추가
        todoList.appendChild(newLi);
    }
    
    // input값 초기화
    todoInput.value = '';
}