// 함수 이름 좀 더 직관적으로.
// if-for-if 말고 for-if-if로, 이런 구조일때는 항상 생각하기
// 비슷한 기능을 가진 함수를 재사용 가능하게 나눠보기.
// function HandleOnChange() {
// 	var selectElem = document.getElementById("todo-filter");
// 	var selectValue = selectElem.value;
// 	var notFinish = document.querySelectorAll(".check-box");
// 	if (selectValue == "todo") {
// 		notFinish.forEach(element => {
// 			// check되어있으면
// 			if(element.checked) {
// 				element.parentElement.setAttribute('hidden', '');
// 			} else {
// 				element.parentElement.removeAttribute('hidden');
// 			}
// 		})
// 	} else if (selectValue == "done") {
// 		notFinish.forEach(element => {
// 			// check 안되어있으면
// 			if(element.checked) {
// 				element.parentElement.removeAttribute('hidden');
// 			} else {
// 				element.parentElement.setAttribute('hidden', '');
// 			}
// 		})
// 	} else {
// 		notFinish.forEach(element => {
// 				element.parentElement.removeAttribute('hidden');
// 		})
// 	}
// }


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

// if문 쓸 때는 성공 케이스가 아니라 실패 케이스일 때를 체크하도록
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

// function addTodoList() {
// 	if (window.event.keyCode == 13) {
// 		var todo_input = document.getElementsByClassName("todo-input");
// 		var input_value = todo_input[0].value;
// 		if (input_value != 0) {
// 			var parentElem = document.getElementById("todo-list");
// 			var todoListElem = createTodoElement(input_value, parentElem);
// 			parentElem.appendChild(todoListElem);
// 			todo_input[0].value = null;
// 		}
// 	}
// }

function createTodoElement(input_value, parentElem) {
	var newList = document.createElement('li');
	var checkBox = checkBoxElement();
	var editBtn = editElement();
	var delBtn = delElement();

	newList.appendChild(checkBox);

	newList.innerHTML += input_value;
	
	newList.appendChild(editBtn);
	
	delBtn.addEventListener("click", () => {
		parentElem.removeChild(newList);
	})
	newList.appendChild(delBtn);
	return newList;
}

function checkBoxElement() {
	var checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.setAttribute('class', 'check-box');
	return checkBox;
}

// function editElement() {
// 	var editBtn = document.createElement('input');
// 	editBtn.setAttribute('type', 'button');
// 	editBtn.setAttribute('value', 'Edit');
// 	editBtn.addEventListener("click", () => {
// 		// 함수로 나눠서 줄이기
// 		// createEditButton = createButton({....})
// 		// createinputText = createInputTesxt({....})
// 		// createCheckBox = createCheckBox({....})

// 		var parentElem = editBtn.parentElement;
// 		var inputText = document.createElement('input');
// 		inputText.setAttribute('type', 'text');
// 		var saveBtn = document.createElement('input');
// 		saveBtn.setAttribute('type', 'button');		
// 		saveBtn.setAttribute('value', 'Save');
// 		var prevElem = parentElem.getElementsByTagName('input');
// 		var prevCheckBox = prevElem[0];
// 		var prevEdit = prevElem[1];
// 		var prevDel = prevElem[2];
// 		parentElem.replaceChildren(inputText, saveBtn);
// 		saveBtn.addEventListener("click", () => {
// 			parentElem.replaceChildren(prevCheckBox, inputText.value, prevEdit, prevDel);
// 		})
// 	})
// 	return editBtn;
// }

function editElement() {
	var editBtn = createInputButton('Edit');
	editBtn.addEventListener("click", () => {
		var parentElem = editBtn.parentElement;

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
function delElement() {
	var delBtn = document.createElement('input');
	delBtn.setAttribute('type', 'button');
	delBtn.setAttribute('value', 'XXX');
	return delBtn;
}

