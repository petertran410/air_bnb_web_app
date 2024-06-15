import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { roomServ } from "../../Services/roomService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";

export const EditRoom = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [form] = Form.useForm();

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

  useEffect(() => {
    roomServ.getDataRoom(id).then((res) => {
      const roomData = res.data.data;

      // Update form fields
      form.setFieldsValue({
        ...roomData,
      });

      // Update checkbox states
      const updatedDataBox = {
        washing_machine: roomData.washing_machine ? "true" : "false",
        television: roomData.television ? "true" : "false",
        parking: roomData.parking ? "true" : "false",
        swimming_pool: roomData.swimming_pool ? "true" : "false",
        air_conditioner: roomData.air_conditioner ? "true" : "false",
        electric_iron: roomData.electric_iron ? "true" : "false",
        stove: roomData.stove ? "true" : "false",
        wifi: roomData.wifi ? "true" : "false",
      };
      setDataBox(updatedDataBox);
    });
  }, [id, form]);

  const onFinishSign = (values) => {
    let dataSend = { ...values, ...dataBox };
    roomServ
      .editRoom(id, dataSend)
      .then((res) => {
        message.success("Update thành công");
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
    const checkedValues = Object.keys(dataBox).filter(
      (key) => dataBox[key] === "true"
    );
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinishSign}
        scrollToFirstError
      >
        <Form.Item name="name" label="Tên phòng">
          <Input />
        </Form.Item>
        <Form.Item name="guests" label="Số khách">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="bedrooms" label="Số phòng ngủ">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="beds" label="Số giường">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="bathrooms" label="Phòng tắm">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="price" label="Giá tiền 1 đêm">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="location_id" label="Mã vị trí">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="photo" label="Hình ảnh khách sạn (URL)">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả về phòng thuê">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Checkbox.Group
          style={{
            width: "100%",
          }}
          onChange={onChange}
          value={checkedValues}
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <>{renderSign()}</>;
};

export default EditRoom;
