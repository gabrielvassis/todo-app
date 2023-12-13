import axios from "axios";
import { url } from "../config.js";
import { Card, Button, Form, Input } from "antd";

const NewTodo = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (todo) => {
    const response = await axios.post(url + "/todo", todo);
    const newTodo = response.data;
    props.setTodos((todos) => {
      return [...todos, newTodo];
    });
    form.resetFields();
  };
  return (
    <div>
      <Card>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewTodo;
