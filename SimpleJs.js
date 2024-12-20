
function btnClick() {

    const createLi = document.createElement('li');
    const getInput = document.getElementsByClassName('todo-input')[0].value;
    const textNode = document.createTextNode(getInput);
    const checkConfirm = confirm('\" ' + getInput + ' \" 저장 하시겠습니까 ?'); 

    if (!getInput.trim()) {
        alert("공백 추가 x");
        return false;
    }

    if (checkConfirm) {
        createLi.appendChild(textNode);
        document
            .getElementById('todo-list')
            .appendChild(createLi);
    }    
    else {
        alert("저장 하지 않으셨습니다.");
    }

    
}