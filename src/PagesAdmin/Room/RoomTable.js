import React, { Fragment } from "react";
import { message, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roomServ } from "../../Services/roomService";
import { setDataRoom } from "../../Redux/actions/actionRoom";
export default function RoomTable({ dataRoom }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã vị trí",
      dataIndex: "location_id",
      key: "location_id",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (url) => {
        return <img className="w-80" src={url} alt="image" />;
      },
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
                  roomServ
                    .deleteRoom(item.id)
                    .then((res) => {
                      message.success("Xóa thành công");
                      dispatch(setDataRoom());
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
                  navigate(`/admin/editRoom/${item.id}`);
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
      dataSource={dataRoom}
      rowKey={(record) => record.id}
    />
  );
}
