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
  import { setLogin } from "../../Redux/actions/actionUser";
  import { userServ } from "../../Services/userService";
  import { tailFormItemLayout, formItemLayout } from "../../Utilities/FormLayout";
  const openNotification = (desc) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
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
  export const LoginSign = ({ isLogin }) => {
    let dispatch = useDispatch();
    const onFinishLogin = (values) => {
      let onSuccess = () => {
        message.success("Đăng nhập thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      };
      let onFailed = () => {
        message.error("Đăng nhập thất bại");
      };
      dispatch(setLogin(values, onSuccess, onFailed));
    };
    const onFinishSign = (values) => {
      values.gender == "nam" ? (values.gender = true) : (values.gender = false);
  
      userServ
        .postSign(values)
        .then((res) => {
          console.log(res.data.content);
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
  