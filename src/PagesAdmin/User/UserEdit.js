import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import { setDataListUser } from "../../Redux/actions/actionUser";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
export const UserEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [defaultDate, setDefaultDate] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    userServ.getInfoId(id).then((res) => {
      let { birthday } = res.data.data;
      setDefaultDate([dayjs(birthday)]);
      form.setFieldsValue({ ...res.data.data });
    });
  }, [id]);
  const [date, setDate] = useState(null);
  const onFinishSign = (values) => {
    values.gender = String(values.gender);
    console.log("Form values before submission:", values);

    if (!date) {
      message.error("Kiểm tra lại thông tin còn thiếu");
      return;
    }

    let newData = {
      ...values,
      birthday: date + "T00:00:00.000Z",
    };

    console.log(newData);

    newData.gender = newData.gender === "Male" ? "Male" : "Female";
    userServ
      .editUser(id, newData)
      .then((res) => {
        dispatch(setDataListUser(res.data.data));
        message.success("Cập nhật thành công");
        setTimeout(() => {
          navigate("/admin/user");
        }, 1500);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại");
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
          <Input type="Date" onChange={onDateChange} />
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
