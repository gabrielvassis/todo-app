import axios from "axios";
import { url } from "../config.js";
import { Card, List, Button, Space, Modal, Form, Input, Select } from "antd";
import { DeleteFilled, EditFilled, CheckCircleFilled } from "@ant-design/icons";
import { useState } from "react";

const TodoList = (props) => {
  const [form] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState([]);
  const [todoToChangeStatus, setTodoToChangeStatus] = useState([]);

  const showEditModal = (todo) => {
    form.setFieldValue("id", todo.id);
    form.setFieldValue("title", todo.title);
    form.setFieldValue("description", todo.description);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (id) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const showStatusModal = (todo) => {
    setTodoToChangeStatus(todo);
    setIsStatusModalOpen(true);
  };

  const onFinish = async (todo) => {
    const response = await axios.put(url + "/todo", todo);
    const newTodo = response.data;
    setIsEditModalOpen(false);
    props.setTodos((todos) => {
      const foundIndex = todos.findIndex((todo) => todo.id === newTodo.id);
      console.log(newTodo);
      todos[foundIndex] = newTodo;
      console.log(todos);
      return [...todos];
    });
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleStatusCancel = () => {
    setIsStatusModalOpen(false);
  };

  const handleOkDeleteModal = async () => {
    await axios.delete(url + "/todo/" + idToDelete);
    props.setTodos((todos) => {
      return todos.filter((todo) => todo.id !== idToDelete);
    });
    setIsDeleteModalOpen(false);
  };

  const handleOkStatusModal = async () => {
    todoToChangeStatus.done = !todoToChangeStatus.done;
    await axios.patch(url + "/todo", todoToChangeStatus);
    props.setTodos((todos) => [...todos]);
    setIsStatusModalOpen(false);
  };

  const handleChange = (value) => {
    props.onChangeFilter(value);
  };

  return (
    <div>
      <Card style={{ backgroundColor: "#2d73bd" }}>
        <Select
          defaultValue="Não concluídas"
          onChange={handleChange}
          options={[
            {
              value: "false",
              label: "Não concluídas",
            },
            {
              value: "true",
              label: "Concluídas",
            },
          ]}
          style={{ marginBottom: "0.5%" }}
        />
        <List>
          {props.todos.map((todo) => {
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
          })}
        </List>
      </Card>
      <Modal
        title="Editar"
        open={isEditModalOpen}
        onOk={form.submit}
        onCancel={handleEditCancel}
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
      <Modal
        title="Deseja excluir a tarefa?"
        open={isDeleteModalOpen}
        onOk={handleOkDeleteModal}
        onCancel={handleDeleteCancel}
      ></Modal>
      <Modal
        title="Deseja alterar o status da tarefa?"
        open={isStatusModalOpen}
        onOk={handleOkStatusModal}
        onCancel={handleStatusCancel}
      ></Modal>
    </div>
  );
};

export default TodoList;
