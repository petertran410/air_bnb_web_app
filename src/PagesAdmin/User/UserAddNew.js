import { Button, Form, Input, message, Select, notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import { setDataListUser } from "../../Redux/actions/actionUser";

const openNotification = (desc) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        notification.close(key);
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
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);

  const onFinishSign = (values) => {
    values.gender = values.gender === "Male" ? "Male" : "Female";
    console.log(date);

    if (!date) {
      message.error("Kiểm tra lại thông tin còn thiếu");
      return;
    }

    let newData = {
      ...values,
      birthday: date + "T00:00:00.000Z",
    };

    userServ
      .postSign(newData)
      .then((res) => {
        dispatch(setDataListUser(res.data.data));
        message.success("Đăng kí thành công");
        openNotification(
          `Email : ${values.email} / Password: ${values.password}`
        );
        setTimeout(() => {
          navigate("/admin/user");
        }, 1500);
      })
      .catch((err) => {
        message.error("Đăng kí thất bại, email đã tồn tại hoặc lỗi kết nối");
        console.log(err);
      });
  };

  const onDateChange = (e) => {
    setDate(e.target.value);
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
          <Input type="date" onChange={onDateChange} />
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
            type="number"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

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
