const storageDate = getStorageTodo();

if (storageDate) {
	console.log("storage");
	const todo_list = document.getElementById("todo-list");
	storageDate.forEach(item => {
		addStroageTodo(item, todo_list);
	})
}

function addStroageTodo(item, parent) {
	const newList = document.createElement("li");
	const checkBox = checkBoxElement();
	const editBtn = editElement();
	// const delBtn = delElement();
	const delBtn = createInputButton("X");
	delBtn.addEventListener("click", () => {
		deleteStorageElement(newList.textContent);
		parent.removeChild(newList);
	});
	checkBox.addEventListener('click', () => {
		if (checkBox.checked) {
			checkStorageElement(newList.textContent, true);
		} else {
			checkStorageElement(newList.textContent, false);
		}
	});
	if (item[0] === true) {
		checkBox.checked = true;
	} else {
		checkBox.checked = false;
	}
	newList.replaceChildren(checkBox, item[1], editBtn, delBtn);
	parent.appendChild(newList);
}

function setHiddenOrNot(parent, isShow) {
	if (isShow) {
		parent.setAttribute('hidden', '');
	} else {
		parent.removeAttribute('hidden');
	}
}

function HandleOnChange(event) {
	const selectValue = event.target.value;
	const notFinish = document.querySelectorAll(".check-box");
	notFinish.forEach(element => {
		const parentList = element.parentElement;
		const isChecked = element.checked;
		if (selectValue === "todo") {
			// check되어 있으면(true면) 숨겨야된다
			setHiddenOrNot(parentList, isChecked)
		} else if (selectValue === "done") {
			// check되어 있으면(true면) 보여야된다
			setHiddenOrNot(parentList, !isChecked);
		} else {
			// 항상 보여야된다
			setHiddenOrNot(parentList, false);
		}
	});
}

function addTodoList() {
	if (window.event.keyCode !== 13) {
		return ;
	}
	var todo_input = document.getElementsByClassName("todo-input");
	var input_value = todo_input[0].value;
	/*
		input_value == 0 이랑 input_value === 0이랑 기대값이 다르게 나온다.
		입력값 없이 엔터치면 return 되게 하고싶은데, ===0으로 하면 안된다. 왜일까?
	*/
	if (input_value == 0) {
		return ;
	}
	var parentElem = document.getElementById("todo-list");
	var todoListElem = createTodoElement(input_value, parentElem);
	parentElem.appendChild(todoListElem);
	todo_input[0].value = null;
}

function createTodoElement(input_value, parentElem) {
	var newList = document.createElement('li');
	var checkBox = checkBoxElement();
	var editBtn = editElement();
	// var delBtn = delElement();
	const delBtn = createInputButton("X");
	const arr = getStorageTodo();
	
	delBtn.addEventListener("click", () => {
		deleteStorageElement(newList.textContent);
		parentElem.removeChild(newList);
	});
	checkBox.addEventListener('click', () => {
		if (checkBox.checked) {
			checkStorageElement(newList.textContent, true);
		} else {
			checkStorageElement(newList.textContent, false);
		}
	});
	newList.replaceChildren(checkBox, input_value, editBtn, delBtn);
	const check_value_arr = [checkBox.checked, input_value];
	arr.push(check_value_arr);
	localStorage.setItem('storagedTodo', JSON.stringify(arr));
	return newList;
}

// LocalStorage로 부터 데이터를 받아와서 배열로 반환
function getStorageTodo() {
	const storagedTodo = localStorage.getItem('storagedTodo');
	let arr = storagedTodo === null ? [] : JSON.parse(storagedTodo);
	return arr;
}

// 배열이 비어있는지 확인
function isStroageEmpty(arr) {
	if (arr === null || arr.length === 0) {
		return true;
	}
	return false;
}

// 배열로부터 해당 값에 대한 인덱스가 존재하는 확인
function getStorageIndex(value, arr) {
	for (let index = 0; index < arr.length; index++) {
		if (arr[index][1] === value) {
			return index;
		}
	}
	return -1;
}

// 삭제버튼 누를경우 localstorage에서도 삭제
function deleteStorageElement(value) {
	const arr = getStorageTodo();
	if (isStroageEmpty(arr)) {
		return ;
	}
	const index = getStorageIndex(value, arr);
	if (index === -1) {
		return ;
	}
	arr.splice(index, 1);
	localStorage.setItem('storagedTodo', JSON.stringify(arr));
}

// 수정버튼 누를경우 localstorage에서도 값을 수정
function editStroageElement(prev_value, after_value) {
	const arr = getStorageTodo();
	if (isStroageEmpty(arr)) {
		return ;
	}
	const index = getStorageIndex(prev_value, arr);
	if (index === -1) {
		return ;
	}
	const temp = arr[index];
	temp[1] = after_value;
	arr.splice(index, 1, temp);
	localStorage.setItem('storagedTodo', JSON.stringify(arr));
}

// 체크버튼 누를경우 localstorage에서도 check를 변경
function checkStorageElement(value, checked) {
	const arr = getStorageTodo();
	if (isStroageEmpty(arr)) {
		return ;
	}
	const index = getStorageIndex(value, arr);
	if (index === -1) {
		return ;
	}
	const temp = arr[index];
	temp[0] = checked;
	arr.splice(index, 1, temp);
	localStorage.setItem('storagedTodo', JSON.stringify(arr));
}

/*
checkStroage, editStroage, deleteStorage 모두 중복되는 함수부분이 존재한다.
하나로 묶으면 좋을듯.
*/

function checkBoxElement() {
	var checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.setAttribute('class', 'check-box');
	return checkBox;
}

function editElement() {
	var editBtn = createInputButton('Edit');
	editBtn.addEventListener("click", () => {
		var parentElem = editBtn.parentElement;
		const prev_value = parentElem.textContent;

		var inputText = createInputText();
		var saveBtn = createInputButton('Save');

		// 이전에 자식element로 존재했던 체크박스, 수정버튼, 삭제버튼을 미리 저장.
		var prevElem = parentElem.getElementsByTagName('input');
		var prevCheckBox = prevElem[0];
		var prevEdit = prevElem[1];
		var prevDel = prevElem[2];
		parentElem.replaceChildren(inputText, saveBtn);
		saveBtn.addEventListener("click", () => {
			parentElem.replaceChildren(prevCheckBox, inputText.value, prevEdit, prevDel);
			editStroageElement(prev_value, inputText.value);
		})
	})
	return editBtn;
}

function createInputButton(inputValue) {
	const btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.setAttribute('value', inputValue);
	return btn;
}

function createInputText() {
	const inputText = document.createElement('input');
	inputText.setAttribute('type', 'text');
	return inputText;
}

// 이것도 createInputButton으로 대신할 수 있다.
// function delElement(newList, parentElem) {
// 	var delBtn = document.createElement('input');
// 	delBtn.setAttribute('type', 'button');
// 	delBtn.setAttribute('value', 'X');
// 	return delBtn;
// }

