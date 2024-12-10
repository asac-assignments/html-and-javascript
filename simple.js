const list = document.getElementById('todo-list');
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', appendList);

function appendList() {
    const item = document.getElementById('item');
    if (confirm(item.value + ' 저장하시겠습니까?') != true) {
        item.value = null;
        return;
    }
    
    const node = document.createElement('li');
    const textnode = document.createTextNode(item.value);
    node.appendChild(textnode);
    list.appendChild(node);
    item.value = null;
}