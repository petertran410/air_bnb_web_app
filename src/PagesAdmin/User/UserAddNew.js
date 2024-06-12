import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  notification,
} from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
const openNotification = (desc) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        notification.close(key);
        window.location.reload();
      }}
    >
      Close
    </Button>
  );
  notification.open({
    message: "Tài khoản của bạn",
    description: desc,
    btn,
    key,
    duration: 60,
  });
};

export const UserAddNew = () => {
  const onFinishSign = (values) => {
    values.gender == "Male"
      ? (values.gender = "Male")
      : (values.gender = "Female");

    userServ
      .postSign(values)
      .then((res) => {
        console.log(res.data);
        message.success("Đăng kí thành công");
        openNotification(
          `Email : ${values.email} / Password: ${values.password}`
        );
      })
      .catch((err) => {
        message.error("Đăng kí thất bại, email đã tồn tại hoặc lỗi kết nối");
        console.log(err);
      });
  };

  const renderSign = () => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinishSign}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Không hợp lệ",
            },
            {
              required: true,
              message: "Xin nhập Email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Hãy nhập pass",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="confirm"
          label="Confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xin nhập lại pass",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Pass nhập lại không giống"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}
        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={Date} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
          name="gender"
          label="Giới tính"
        >
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
        >
          <Input
            type={"number"}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Xin chấp nhận điều khoản")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Tôi đã đọc và <a href="">chấp nhận các điều khoản</a>
          </Checkbox>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const [form] = Form.useForm();
  return <>{renderSign()}</>;
};

export default UserAddNew;
