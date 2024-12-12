/* geElementbyId: id 속성을 사용해 해당태그에 접근 */
/* addEventListener: 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정 */
/**
 * 저장 버튼 클릭시
 * todo-input에 있는 값을 input 이라는 변수에 저장
 * input이 있을경우 task-name를 갖고 있는 노드와 그 자손의 텍스트 콘텐츠에 저장
 * input이 없을경우 modal을 hidden 속성을 제거
 */
document.getElementById("save-button").addEventListener("click", () => {
  const input = document.getElementById("todo-input").value.trim();
  if (input) {
    document.getElementById("task-name").textContent = input;
    document.getElementById("modal").classList.remove("hidden");
  } else {
    alert("할 일을 입력하세요.");
  }
});

/* 취소 버튼 누를경우 modal에 hidden 속성 추가 */
document.getElementById("cancel-button").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

/* 확인버튼 누를경우
  task-name의 textContent를 task 변수에 대입
  todo-list의 id를 가진 속성의 값을 todoList라는 변수에 대입
  createElement를 통해 li라는 HTML요소를 만들어 listItem에 반환
  task-name의 textContent를 listItem의 textContent에 대입
  todoList의 appendChild를 통해 자식 노드 객체인 listItem 추가
  modal에는 hidden속성을 부여해 사라지게 함
  todo-input 값은 초기화
*/
document.getElementById("confirm-button").addEventListener("click", () => {
  const todoList = document.getElementById("todo-list");
  const listItem = document.createElement("li");
  listItem.textContent = document.getElementById("task-name").textContent;
  todoList.appendChild(listItem);

  document.getElementById("modal").classList.add("hidden");
  document.getElementById("todo-input").value = "";
});
