import React from "react";
import axios from "axios";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  setTodos,
  editingTodo,
  setEditingTodo,
  newTitle,
  setNewTitle,
}) => {
  // 4.3 TodoItem 업데이트
  const updateTodo = async (id, completed) => {
    // - axios를 사용하여 서버의 /api/todos/:id 엔드포인트에 PUT 요청을 보냅니다.
    // - 요청 본문에는 TodoItem의 완료 상태를 포함합니다.
    // - 완료 상태가 성공적으로 업데이트되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다.
    // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
    try {
      const updatTodoItem = {
        completed: completed,
        title: todo.title,
      };
      await axios.put(`http://localhost:8080/api/todos/${id}`, updatTodoItem);
      const updateResponse = await axios.get("http://localhost:8080/api/todos");
      setTodos(updateResponse.data);
    } catch (error) {
      console.error("not update", error);
    }
  };

  // 4.4 TodoItem 제목 변경
  const saveEdit = async (id) => {
    // - axios를 사용하여 서버의 /api/todos/:id 엔드포인트에 PUT 요청을 보냅니다.
    // - 요청 본문에는 수정된 TodoItem의 제목과 완료 상태를 포함합니다.
    // - 제목이 성공적으로 수정되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다.
    // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
    try {
      const saveTodoItem = {
        title: newTitle,
        completed: todo.completed,
      };
      await axios.put(`http://localhost:8080/api/todos/${id}`, saveTodoItem);
      //   setTodos(response);
      const fetchResponse = await axios.get("http://localhost:8080/api/todos");
      setTodos(fetchResponse.data);
      setEditingTodo();
    } catch (error) {
      console.error("Error saving edit", error);
    }
  };

  // 4.5 TodoItem 삭제
  const deleteTodo = async (id) => {
    // - axios를 사용하여 서버의 /api/todos/:id 엔드포인트에 DELETE 요청을 보냅니다.
    // - TodoItem이 성공적으로 삭제되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다.
    // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      const deleteResponse = await axios.get("http://localhost:8080/api/todos");
      setTodos(deleteResponse.data);
    } catch (error) {
      console.error("Error delet error", error);
    }
  };

  const startEditing = (todo) => {
    // startEditing 함수는 사용자가 특정 TodoItem을 편집하려고 할 때 호출됩니다.
    // 이 함수는 두 가지 상태를 업데이트합니다:
    // 1. setEditingTodo(todo.id):
    // console.log(todo);
    setEditingTodo(todo.id);
    //    - 현재 편집 중인 TodoItem의 ID를 상태로 설정합니다.
    //    - 이 상태는 편집 UI를 표시하는 데 사용됩니다.
    // 2. setNewTitle(todo.title || ''):
    setNewTitle(todo.title || "");
    //    - 현재 편집 중인 TodoItem의 제목을 상태로 설정합니다.
    //    - 만약 TodoItem의 제목이 존재하지 않는 경우, 초기값을 빈 문자열로 설정합니다.
    //    - 이 상태는 입력 필드에 표시될 값을 결정합니다.
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      key={todo.id}
    >
      <input
        type="checkbox"
        checked={todo.completed ? true : false}
        onChange={() => updateTodo(todo.id, !todo.completed)}
      />
      {editingTodo === todo.id ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span>{todo.title ? todo.title : `할 일 #${todo.id}`}</span>
      )}
      {editingTodo === todo.id ? (
        <button className="save-btn" onClick={() => saveEdit(todo.id)}>
          저장
        </button>
      ) : (
        <button className="edit-btn" onClick={() => startEditing(todo)}>
          수정
        </button>
      )}
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
