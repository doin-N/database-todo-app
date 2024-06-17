import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import ButtonContainer from "./ButtonContainer";
import "./TodoContainer.css";

function TodoContainer({ theme, toggleTheme }) {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // 4.1 데이터베이스의 TodoItem 렌더링
  useEffect(() => {
    // - 서버에서 데이터를 가져오는 함수 fetchTodos를 작성합니다.
    // - axios를 사용하여 서버의 /api/todos 엔드포인트에서 데이터를 가져옵니다.
    // - 데이터를 성공적으로 가져오면 setTodos를 호출하여 상태를 업데이트합니다.
    // - 데이터를 가져오는 동안 또는 실패 시 오류를 콘솔에 기록합니다.
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  // 4.2 새로운 TodoItem 생성
  const createTodo = async () => {
    // - axios를 사용하여 서버의 /api/todos 엔드포인트에 POST 요청을 보냅니다.
    // - 요청 본문에는 새로운 TodoItem의 제목과 초기 완료 상태를 포함합니다.
    // - 새로운 TodoItem이 성공적으로 생성되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다. 36~43까지
    // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
    try {
      const newTodoItem = {
        title: "타이틀2",
        completed: false,
      };
      const response = await axios.post(
        "http://localhost:8080/api/todos",
        newTodoItem
      );
      //   console.log(response);

      setTodos([...todos, response.data]);
      //   console.log(response.data);
      console.log(todos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-app-container">
      <ButtonContainer createTodo={createTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoContainer;
