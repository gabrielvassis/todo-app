import "./App.css";
import { url } from "./config.js";
import axios from "axios";
import TodoList from "./components/TodoList.js";
import NewTodo from "./components/NewTodo.js";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(false);
  const [shownTodos, setShownTodos] = useState([]);

  const fetchInfo = async () => {
    const response = await axios.get(url + "/todo");
    setTodos(response.data);
  };

  const filterChangeHandler = (selectedStatus) => {
    setFilteredStatus(selectedStatus);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    setShownTodos(
      todos.filter((todo) => {
        return todo.done.toString() === filteredStatus.toString();
      })
    );
  }, [filteredStatus, todos]);

  return (
    <div>
      <header className="header">
        <h1>Lista de Tarefas</h1>
      </header>
      <NewTodo setTodos={setTodos}></NewTodo>
      <TodoList
        todos={shownTodos}
        setTodos={setTodos}
        onChangeFilter={filterChangeHandler}
      ></TodoList>
    </div>
  );
}

export default App;
