import axios from "axios";
import { url } from "../config.js";
import { Card, List, Button, Space, Modal, Form, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";

const TodoList = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (todo) => {
    form.setFieldValue("id", todo.id);
    form.setFieldValue("title", todo.title);
    form.setFieldValue("description", todo.description);
    setIsModalOpen(true);
  };

  const onFinish = async (todo) => {
    const response = await axios.put(url + "/todo", todo);
    const newTodo = response.data;
    props.setTodos((todos) => {
      const foundIndex = todos.findIndex((todo) => todo.id == newTodo.id);
      todos[foundIndex] = newTodo;
      return todos;
    });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClickDeleteHandler = async (id) => {
    await axios.delete(url + "/todo/" + id);
    props.setTodos((todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div>
      <List>
        {props.todos.map((todo) => {
          return (
            <Card key={todo.id} title={todo.title}>
              {todo.description}
              <Button.Group style={{ float: "right" }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<EditFilled />}
                    onClick={() => {
                      showModal(todo);
                    }}
                  ></Button>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteFilled />}
                    onClick={() => {
                      onClickDeleteHandler(todo.id);
                    }}
                  ></Button>
                </Space>
              </Button.Group>
            </Card>
          );
        })}
      </List>
      <Modal
        title="Editar"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} name="editTodo" onFinish={onFinish}>
          <Form.Item name="id" hidden></Form.Item>
          <Form.Item
            label="Título"
            name="title"
            rules={[
              {
                required: true,
                message: "Insira um título!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Descrição" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
