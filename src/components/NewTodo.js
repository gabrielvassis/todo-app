import axios from "axios";
import { url } from "../config.js";
import { Card, Button, Form, Input, message } from "antd";

const NewTodo = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Adicionado com sucesso!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Erro ao adicionar.",
    });
  };

  const onFinish = async (todo) => {
    try {
      props.setIsLoadingModalOpen(true);
      props.setHidden(true);
      await axios.post(url + "/todo", todo);
      props.fetchInfo();
      form.resetFields();
      success();
    } catch (err) {
      error();
    } finally {
      props.setIsLoadingModalOpen(false);
      props.setHidden(false);
    }
  };
  return (
    <div>
      {contextHolder}
      <Card style={{ margin: "5px" }}>
        <Form form={form} name="newTodo" onFinish={onFinish}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewTodo;
