import { url } from "./config.js";
import axios from "axios";
import TodoList from "./components/TodoList.js";
import NewTodo from "./components/NewTodo.js";
import { useState, useEffect } from "react";
import { Modal, Spin } from "antd";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("todos");
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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
    let shownTodos = todos;
    if (filteredStatus !== "todos") {
      shownTodos = todos.filter((todo) => {
        return todo.done.toString() === filteredStatus.toString();
      });
    }
    setShownTodos(shownTodos);
  }, [filteredStatus, todos]);

  return (
    <div>
      <div hidden={hidden}>
        <header className="header">
          <h1>Lista de Tarefas</h1>
        </header>
        <NewTodo
          setTodos={setTodos}
          setIsLoadingModalOpen={setIsLoadingModalOpen}
          setHidden={setHidden}
          fetchInfo={fetchInfo}
        ></NewTodo>
        <TodoList
          todos={shownTodos}
          setTodos={setTodos}
          onChangeFilter={filterChangeHandler}
          setIsLoadingModalOpen={setIsLoadingModalOpen}
          setHidden={setHidden}
          fetchInfo={fetchInfo}
        ></TodoList>
      </div>
      <Modal open={isLoadingModalOpen} footer={null} closable={false}>
        <Spin />
      </Modal>
    </div>
  );
}

export default App;
