import axios from "axios";
import { url } from "../config.js";
import { Card, List, Modal, Form, Input, Select, message } from "antd";
import { useState } from "react";
import TodoCard from "./TodoCard.js";

const TodoList = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState([]);
  const [todoToChangeStatus, setTodoToChangeStatus] = useState([]);

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

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
    try {
      setIsEditModalOpen(false);
      props.setIsLoadingModalOpen(true);
      props.setHidden(true);
      await axios.put(url + "/todo", todo);
      props.fetchInfo();
      success("Editado com sucesso!");
    } catch (err) {
      error("Falha ao editar.");
    } finally {
      props.setIsLoadingModalOpen(false);
      props.setHidden(false);
    }
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
    try {
      setIsDeleteModalOpen(false);
      props.setIsLoadingModalOpen(true);
      props.setHidden(true);
      await axios.delete(url + "/todo/" + idToDelete);
      props.fetchInfo();
      success("Excluído com sucesso!");
    } catch (err) {
      error("Falha ao excluir.");
    } finally {
      props.setIsLoadingModalOpen(false);
      props.setHidden(false);
    }
  };

  const handleOkStatusModal = async () => {
    try {
      setIsStatusModalOpen(false);
      props.setIsLoadingModalOpen(true);
      props.setHidden(true);
      todoToChangeStatus.done = !todoToChangeStatus.done;
      await axios.patch(url + "/todo", todoToChangeStatus);
      props.fetchInfo();
      success("Status alterado com sucesso!");
    } catch (err) {
      error("Falha ao alterar status.");
    } finally {
      props.setIsLoadingModalOpen(false);
      props.setHidden(false);
    }
  };

  const handleChange = (value) => {
    props.onChangeFilter(value);
  };

  return (
    <div>
      {contextHolder}
      <Card style={{ backgroundColor: "#2d73bd", margin: "5px" }}>
        <Select
          defaultValue="Todos"
          onChange={handleChange}
          options={[
            {
              value: "todos",
              label: "Todos",
            },
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
              <TodoCard
                key={todo.id}
                todo={todo}
                showStatusModal={(todo) => showStatusModal(todo)}
                showEditModal={(todo) => showEditModal(todo)}
                showDeleteModal={(todo) => showDeleteModal(todo)}
              />
            );
          })}
        </List>
      </Card>
      <Modal
        title="Editar"
        open={isEditModalOpen}
        onOk={form.submit}
        onCancel={handleEditCancel}
        cancelText={"Cancelar"}
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
        cancelText={"Cancelar"}
      ></Modal>
      <Modal
        title="Deseja alterar o status da tarefa?"
        open={isStatusModalOpen}
        onOk={handleOkStatusModal}
        onCancel={handleStatusCancel}
        cancelText={"Cancelar"}
      ></Modal>
    </div>
  );
};

export default TodoList;
