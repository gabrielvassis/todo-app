import axios from "axios";
import { url } from "../config.js";
import { Card, List, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const TodoList = (props) => {
  const onClickHandler = async (id) => {
    await axios.delete(url + "/todo/" + id);
    props.setTodos((todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <List>
      {props.todos.map((todo) => {
        return (
          <Card key={todo.id} title={todo.title}>
            {todo.description}
            <Button
              style={{ float: "right" }}
              type="primary"
              danger
              icon={<DeleteFilled />}
              onClick={() => {
                onClickHandler(todo.id);
              }}
            ></Button>
          </Card>
        );
      })}
    </List>
  );
};

export default TodoList;
