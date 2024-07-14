/*
1. 추가 버튼을 누르면 할 일 추가
2. 삭제 버튼을 누르면 할 일 삭제
*/

document.querySelector("#add-button").addEventListener("click", function () {
  addTask();
});

document
  .querySelector("#todo-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function addTask() {
  // 텍스트박스의 값 가져오기
  let todoText = document.querySelector("#todo-input").value;
  if (todoText !== "") {
    // 텍스트박스의 값을 추가할 위치(ul)
    let todo_list_ul = document.querySelector("#todo-list");
    // li 생성
    let todo_list_li = document.createElement("li");
    todo_list_li.innerText = todoText;
    // ul에 li 추가
    todo_list_ul.append(todo_list_li);
    // textbox 내용 지우기
    document.querySelector("#todo-input").value = "";

    // 삭제버튼 생성
    let delete_button = document.createElement("button");
    delete_button.textContent = "삭제";
    // li에 button 추가
    todo_list_li.append(delete_button);
    // 삭제버튼 누르면 li 삭제
    delete_button.addEventListener("click", function () {
      todo_list_ul.removeChild(todo_list_li);
    });
  }
}
