import "./App.css";
import { url } from "./config.js";
import axios from "axios";
import TodoList from "./components/TodoList.js";
import NewTodo from "./components/NewTodo.js";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const fetchInfo = async () => {
    const response = await axios.get(url + "/todo");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <NewTodo setTodos={setTodos}></NewTodo>
      <TodoList todos={todos} setTodos={setTodos}></TodoList>
    </div>
  );
}

export default App;
