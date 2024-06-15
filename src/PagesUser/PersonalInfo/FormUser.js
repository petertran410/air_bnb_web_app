import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataListUser } from "../../Redux/actions/actionUser";
const FormUser = ({ dataUser }) => {
  let { id } = dataUser;
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [date, setDate] = useState(null);
  const onFinish = (values) => {
    if (!date) {
      message.error("Kiểm tra lại thông tin còn thiếu");
      return;
    }
    let newData = {
      ...values,
      birthday: date + "T00:00:00.000Z",
    };

    newData.gender = newData.gender === "Male" ? "Male" : "Female";

    userServ
      .editUser(id, newData)
      .then((res) => {
        dispatch(setDataListUser(res.data.data));
        message.success("Cập nhật thành công");
        setTimeout(() => {
          window.location.reload();
          navigate("/userInfo");
        }, 1500);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại");
        console.log(err);
      });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    userServ.getInfoId(id).then((res) => {
      form.setFieldsValue({ ...res.data.data });
    });
  }, [id]);
  const onDateChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <div className="p-9">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        {" "}
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Không để trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-mail">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="birthday" label="Ngày sinh">
          <Input type="Date" onChange={onDateChange} />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: true,
                label: "Male",
              },
              {
                value: false,
                label: "Female",
              },
            ]}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>{" "}
    </div>
  );
};

export default FormUser;
