import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { NavLink } from "react-router-dom";
import UserTable from "./UserTable";
import { searchUser, setDataListUser } from "../../Redux/actions/actionUser";
import { userServ } from "../../Services/userService";
const { Search } = Input;
export default function User() {
  const { user: userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState("");
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    dispatch(setDataListUser());
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(searchUser(dataSearch));
    }, 1500);
    return () => clearTimeout(timeout);
  }, [dataSearch]);

  useEffect(() => {
    userServ
      .getDataUser()
      .then((result) => {
        setDataUser(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearch = (e) => {
    setDataSearch(e.target.value);
  };

  const userArray = Array.isArray(dataUser)
    ? dataUser
    : Object.values(dataUser);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Quản lý người dùng</h1>
      <div>
        <NavLink to="/admin/user/addnew">
          <Button>Thêm người dùng</Button>
        </NavLink>
      </div>
      <Search
        placeholder="Nhập người dùng muốn tìm"
        allowClear
        onChange={onSearch}
        style={{
          width: 600,
        }}
        className="py-2"
      />
      <UserTable dataListUser={userArray} />
    </div>
  );
}
