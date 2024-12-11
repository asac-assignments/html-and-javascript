function dropDownList() {
	var selectElem = document.getElementById("todo-filter");
	var selectValue = selectElem.value;
	var notFinish = document.querySelectorAll(".cbox");
	if (selectValue == "todo") {
		notFinish.forEach(element => {
			// check되어있으면
			if(element.checked) {
				element.parentElement.setAttribute('hidden', '');
			} else {
				element.parentElement.removeAttribute('hidden');
			}
		})
	} else if (selectValue == "done") {
		notFinish.forEach(element => {
			// check 안되어있으면
			if(element.checked) {
				element.parentElement.removeAttribute('hidden');
			} else {
				element.parentElement.setAttribute('hidden', '');
			}
		})
	} else {
		notFinish.forEach(element => {
				element.parentElement.removeAttribute('hidden');
		})
	}
}

function addTodoList() {
	if (window.event.keyCode == 13) {
		var todo_input = document.getElementsByClassName("todo-input");
		var input_value = todo_input[0].value;
		if (input_value != 0) {
			var parentElem = document.getElementById("todo-list");
			var todoListElem = createTodoElement(input_value, parentElem);
			parentElem.appendChild(todoListElem);
			todo_input[0].value = null;
		}
	}
}

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
	checkBox.setAttribute('class', 'cbox');
	return checkBox;
}

function editElement() {
	var editBtn = document.createElement('input');
	editBtn.setAttribute('type', 'button');
	editBtn.setAttribute('value', 'Edit');
	editBtn.addEventListener("click", () => {
		var parentElem = editBtn.parentElement;
		var inputText = document.createElement('input');
		inputText.setAttribute('type', 'text');
		var saveBtn = document.createElement('input');
		saveBtn.setAttribute('type', 'button');		
		saveBtn.setAttribute('value', 'Save');
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

function delElement() {
	var delBtn = document.createElement('input');
	delBtn.setAttribute('type', 'button');
	delBtn.setAttribute('value', 'X');
	return delBtn;
}

