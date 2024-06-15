import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roomServ } from "../../Services/roomService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";

export const AddRoom = () => {
  let navigate = useNavigate();
  const [dataBox, setDataBox] = useState({
    washing_machine: "false",
    television: "false",
    parking: "false",
    swimming_pool: "false",
    air_conditioner: "false",
    electric_iron: "false",
    stove: "false",
    wifi: "false",
  });

  const onFinishSign = (values) => {
    let dataSend = { ...values, ...dataBox };
    roomServ
      .createRoom(dataSend)
      .then((res) => {
        console.log(res.data.data);
        message.success("Đăng kí thành công");
        setTimeout(() => {
          navigate("/admin/room");
        }, 1500);
      })
      .catch((err) => {
        message.error("Thất bại xin kiểm tra lại");
        console.log(err);
      });
  };

  const onChange = (checkedValues) => {
    let updatedDataBox = {
      washing_machine: "false",
      television: "false",
      parking: "false",
      swimming_pool: "false",
      air_conditioner: "false",
      electric_iron: "false",
      stove: "false",
      wifi: "false",
    };
    checkedValues.forEach((item) => {
      updatedDataBox[item] = "true";
    });
    setDataBox(updatedDataBox);
    console.log(updatedDataBox);
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
          name="name"
          label="Tên phòng"
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
          name="guests"
          label="Số khách"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="bedrooms"
          label="Số phòng ngủ"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="beds"
          label="Số giường"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="Phòng tắm"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá tiền 1 đêm"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="location_id"
          label="Mã vị trí"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Hình ảnh khách sạn (URL)"
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
          name="description"
          label="Mô tả về phòng thuê"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Checkbox.Group
          style={{
            width: "100%",
          }}
          onChange={onChange}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="washing_machine">Máy Giặt</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="electric_iron">Bàn Ủi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="television">Ti vi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="air_conditioner">Máy Lạnh</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="stove">Bếp</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="parking">Đỗ Xe</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="swimming_pool">Hồ Bơi</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="wifi">Wi fi</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Form.Item {...tailFormItemLayout}>
          <Button className="mt-5" type="primary" htmlType="submit">
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const [form] = Form.useForm();
  return <>{renderSign()}</>;
};

export default AddRoom;
