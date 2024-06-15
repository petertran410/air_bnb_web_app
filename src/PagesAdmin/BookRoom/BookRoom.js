import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { NavLink } from "react-router-dom";
import { searchBooked, setDataBooked } from "../../Redux/actions/actionsBooked";
import BookTable from "./BookTable";
import { bookSer } from "../../Services/bookService";
const { Search } = Input;
export default function BookRoom() {
  const { dataBooked } = useSelector((state) => state.bookedReducer);
  const [dataSearch, setDataSearch] = useState("");
  const [dataBook, setDataBook] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDataBooked());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(searchBooked(dataSearch));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dataSearch]);

  useEffect(() => {
    bookSer
      .getStatusRoom()
      .then((result) => {
        setDataBook(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const bookArray = Array.isArray(dataBook)
    ? dataBook
    : Object.values(dataBook);

  const onSearch = (e) => {
    setDataSearch(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Quản lý đặt chỗ</h1>
      <div>
        <NavLink to="/admin/addBook">
          <Button>Thêm đặt chỗ</Button>
        </NavLink>
      </div>
      <Search
        type={"number"}
        placeholder="Nhập mã người dùng"
        allowClear
        onChange={onSearch}
        style={{
          width: 600,
        }}
        className="py-2"
      />
      <BookTable dataListBook={bookArray} />
    </div>
  );
}
