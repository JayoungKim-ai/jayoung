// 버튼을 클릭하면 할 일이 입력되었는지 확인 후 할 일 추가
//1. 버튼 클릭 이벤트 받기(이벤트리스너)
//2. 입력값이 있는지 확인하기
//3. 입력값이 있다면 목록 추가 함수 호출
const addButton = document.querySelector(".btn.btn-outline-secondary");
addButton.addEventListener("click", () => {
  if (hasInputValue()) {
    addTodoList();
  }
});

// 키(Enter) 이벤트를 받으면 할 일이 입력되었는지 확인 후 할 일 추가
//1. 키(Enter) 이벤트 받기(이벤트리스너)
//2. 입력값이 있는지 확인하기
//3. 입력값이 있다면 목록 추가 함수 호출
const inputBox = document.querySelector(".form-control");
inputBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (hasInputValue()) {
      addTodoList();
    }
  }
});

//입력값이 있는지 확인하는 함수
function hasInputValue() {
  const inputBoxValue = document.querySelector(".form-control").value.trim();
  // console.log(inputBoxValue);
  if (inputBoxValue) {
    return true;
  } else {
    return false;
  }
}

function addTodoList() {
  //////////////////////////////////////////////////
  // <li>보험청구<button class="del">X</button></li>
  //////////////////////////////////////////////////

  // <li></li>
  // 1. li 요소 생성하기
  // 2. ul의 자식으로 추가
  const li = document.createElement("li"); //1
  const ul = document.querySelector("ul");
  ul.appendChild(li); //2

  //보험청구
  //1. inputBox의 텍스트 가져오기
  //2. 텍스트노드 만들기
  //3. li의 자식으로 추가
  const inputTextValue = document.querySelector(".form-control").value; //1
  const textNode = document.createTextNode(inputTextValue); //2
  li.appendChild(textNode); //3

  //<button></button>
  //1. button 요소 만들기
  //2. li의 자식으로 추가하기
  const btn = document.createElement("button");
  li.appendChild(btn);

  //button에 속성 추가하기(class="del")
  btn.setAttribute("class", "del");

  //X
  //1. 텍스트노드 만들기('X')
  //2. 버튼의 자식으로 추가하기
  const textX = document.createTextNode("X");
  btn.appendChild(textX);

  // 다음 입력을 위해 inputBox의 내용 지우기
  inputBox.value = "";
  // inputBox에 포커스 주기
  inputBox.focus();

  // X버튼 클릭하면 해당 li 삭제
  btn.addEventListener("click", () => {
    // 삭제되는 li의 인덱스를 찾습니다.
    const parentUl = li.parentNode;
    const index = Array.from(parentUl.children).indexOf(li);
    removeLocalStorage(index);
    console.log(`${index}번 li가 삭제되었습니다.`);
    li.remove();
  });

  // 할 일 추가
  setLocalStorage(inputTextValue);
}

// 로컬스토리지에서 할 일 불러오기
function getLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

// 로컬 스토리지에 할 일 저장하기
function setLocalStorage(todo) {
  let todos = getLocalStorage("todos");
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 로컬스토리지에서 데이터 불러와 렌더링하기
function loadTodos() {
  const todos = getLocalStorage();
  for (let idx in todos) {
    const li = document.createElement("li");
    const ul = document.querySelector("ul");
    ul.appendChild(li);

    const todoText = todos[idx];
    const textNode = document.createTextNode(todoText);
    li.appendChild(textNode);

    const btn = document.createElement("button");
    btn.setAttribute("class", "del");
    li.appendChild(btn);

    const textX = document.createTextNode("X");
    btn.appendChild(textX);

    btn.addEventListener("click", () => {
      // 삭제되는 li의 인덱스를 찾습니다.
      const parentUl = li.parentNode;
      const index = Array.from(parentUl.children).indexOf(li);
      removeLocalStorage(index);
      console.log(`${index}번 li가 삭제되었습니다.`);
      li.remove();
    });
  }
}
loadTodos();

// 로컬스토리지에서 데이터 삭제
function removeLocalStorage(idx) {
  let todos = getLocalStorage();
  todos.splice(idx, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
