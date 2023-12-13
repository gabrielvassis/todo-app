import axios from "axios";
import { useState, useEffect } from "react";
import { Card, List } from "antd";

const TodoList = () => {
  const url = "https://todo-api-js0h.onrender.com";
  const [todos, setTodos] = useState([]);

  const fetchInfo = async () => {
    const response = await axios.get(url + "/todo");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <List>
      {todos.map((todo, index) => {
        return (
          <Card key={todo.id} title={todo.title}>
            {todo.description}
          </Card>
        );
      })}
    </List>
  );
};

export default TodoList;
