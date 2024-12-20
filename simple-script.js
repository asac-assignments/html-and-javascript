function confirmSave() {
	var todo_input = document.getElementsByClassName("todo-input");
	var input_value = todo_input[0].value;
	if (!input_value) {
		alert("내용을 입력해주세요.");
	} else if (confirm(input_value + "를 저장하시겠습니까?")) {
		var newList = document.createElement('li');
		newList.innerHTML += input_value;
		document.getElementById("todo-list").appendChild(newList);
		todo_input[0].value = null;
	} else {
		alert("저장을 취소하셨습니다.");
		todo_input[0].value = null;
	}
	
}