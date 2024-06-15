import React, { Fragment } from "react";
import { message, Popconfirm, Table, Tag } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookSer } from "../../Services/bookService";
import { setDataBooked } from "../../Redux/actions/actionsBooked";
export default function BookTable({ dataListBook }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã phòng",
      dataIndex: "room_id",
      key: "maPhong",
    },
    {
      title: "Mã người dùng",
      dataIndex: "reserved_by.id",
      key: "maNguoiDung",
      render: (text, record) => record.reserved_by.id,
    },

    {
      title: "Ngày đến",
      dataIndex: "arrival",
      key: "ngayDen",
    },
    {
      title: "Ngày đi",
      dataIndex: "departure",
      key: "ngayDi",
    },
    {
      title: "Số khách",
      dataIndex: "guests",
      key: "soLuongKhach",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, item) => {
        return (
          <Fragment>
            <div className="space-x-2">
              <Popconfirm
                title="Dữ liệu sẽ bị xóa?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  bookSer
                    .deleteBooking(item.id)
                    .then((res) => {
                      message.success("Xóa thành công");
                      dispatch(setDataBooked());
                      window.location.reload();
                    })
                    .catch((err) => {
                      message.error(err.response.data);
                      console.log(err);
                    });
                }}
              >
                <span className="hover:cursor-pointer font-bold text-red-500">
                  Delete
                </span>
              </Popconfirm>
              <span
                onClick={() => {
                  navigate(`/admin/editBooked/${item.id}`);
                }}
                className="hover:cursor-pointer font-bold text-green-500"
              >
                Edit
              </span>
            </div>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataListBook}
      rowKey={(record) => record.id}
    />
  );
}
