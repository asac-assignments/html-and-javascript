document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.todo-input');
    const saveButton = document.querySelector('.input-container input[type="button"]');
    const list = document.getElementById('todo-list');

    saveButton.addEventListener('click', function () {
        const inputText = input.value.trim();
        if (inputText === '') {
            alert("내용을 입력하세요.");
            return;
        }

        const isConfirm = confirm(`"${inputText}"를 저장하시겠습니까?`);
        if (!isConfirm) {
            return;
        }

        const newTodo = document.createElement('li');
        newTodo.textContent = inputText;

        list.appendChild(newTodo);

        input.value = '';
    });
});
