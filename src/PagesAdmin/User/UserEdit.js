import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
export const UserEdit = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    userServ.getInfoId(id).then((res) => {
      let newData = [];

      for (const key in res.data.data) {
        const element = res.data.data[key];
        if (element === true) {
          newData.push(key);
        }
      }
      form.setFieldsValue({ ...res.data.data });
    });
  }, [id]);

  const onFinishSign = (values) => {
    values.gender = String(values.gender);
    console.log("Form values before submission:", values);

    values.gender = values.gender === "Male" ? "Male" : "Female";
    userServ
      .editUser(id, values)
      .then((res) => {
        console.log(res.data);
        message.success("Cập nhật thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại");
        console.log(err);
      });
  };

  const validateBirthday = (rule, value, callback) => {
    // Kiểm tra nếu giá trị rỗng thì bỏ qua
    if (!value) {
      callback("Vui lòng nhập ngày sinh");
      return;
    }

    // Kiểm tra định dạng YYYY-MM-DDTHH:mm:ss.sssZ
    if (
      !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.test(value)
    ) {
      callback("Ngày sinh không đúng định dạng YYYY-MM-DDTHH:mm:ss.sssZ");
    } else {
      callback();
    }
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
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
            {
              validator: validateBirthday,
            },
          ]}
        >
          <Input placeholder="2002-04-10T00:00:00.000Z" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: false,
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
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
          name="role"
          label="Quản trị"
        >
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "Admin",
                label: "Admin",
              },
              {
                value: "Guest",
                label: "Guest",
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return <>{renderSign()}</>;
};

export default UserEdit;
