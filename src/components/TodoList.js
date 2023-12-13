import { Card, List } from "antd";

const TodoList = (props) => {
  return (
    <List>
      {props.todos.map((todo) => {
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
