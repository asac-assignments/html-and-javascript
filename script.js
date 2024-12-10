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
