import { DeleteFilled, EditFilled, CheckCircleFilled } from "@ant-design/icons";
import { Card, Button, Space } from "antd";

const TodoCard = (props) => {
  const { todo, showDeleteModal, showEditModal, showStatusModal } = props;
  return (
    <Card
      key={todo.id}
      title={todo.title}
      done={todo.done.toString()}
      style={{ marginBottom: "1%" }}
    >
      {todo.description}
      <Button.Group style={{ float: "right" }}>
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleFilled />}
            onClick={() => {
              showStatusModal(todo);
            }}
            style={{ background: "green" }}
          ></Button>
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => {
              showEditModal(todo);
            }}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<DeleteFilled />}
            onClick={() => {
              showDeleteModal(todo.id);
            }}
          ></Button>
        </Space>
      </Button.Group>
    </Card>
  );
};

export default TodoCard;
