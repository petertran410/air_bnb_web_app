import React, { useState, useEffect } from "react";
import { Tabs, message, Popconfirm } from "antd";
import moment from "moment";
import { roomServ } from "../../Services/roomService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ModalUpdateUser from "./ModalUpdate";
import {
  HeartIconInfo,
  SetttingIcon,
  TicketIcon,
} from "../../Utilities/IconSVG";
import { setLoadingOff, setLoadingOn } from "../../Redux/actions/actionsSpiner";
import { localLike } from "../../Services/localService";
import { renderComforts } from "../../Utilities/ItemServices";
import { userServ } from "../../Services/userService";
import { bookSer } from "../../Services/bookService";
import Avatar from "./Avatar";
export default function UserInfo() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [dataBooking, setDataBooking] = useState([]);
  const [allRoom, setAllRoom] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  let { user: userInfo } = useSelector((state) => state.userReducer);
  let get_user_ID = userInfo.user.data.id;
  useEffect(() => {
    roomServ
      .getDataBooking(get_user_ID)
      .then((res) => {
        setDataBooking([res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [get_user_ID]);
  useEffect(() => {
    dispatch(setLoadingOn());
    roomServ
      .getAllDataRoom()
      .then((res) => {
        setAllRoom(res.data.data);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log(err);
      });
  }, [dispatch]);
  useEffect(() => {
    userServ
      .getInfo(get_user_ID)
      .then((res) => {
        setDataUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBooked = (id) => {
    bookSer
      .deleteBooking(id)
      .then(() => {
        message.success("Hủy đặt phòng thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  const renderData = () => {
    if (!Array.isArray(dataBooking) || dataBooking.length === 0) {
      return (
        <p className="h-56 text-left text-xl font-semibold">
          Hiện bạn vẫn chưa đặt vé phòng nào !
        </p>
      );
    }

    //fix data
    let newData = dataBooking.map((selectRoom) => {
      let index = allRoom.findIndex((item) => item.id === selectRoom.room_id);
      return { ...selectRoom, ...allRoom[index], idDelete: selectRoom.id };
    });
    return newData.length ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {newData.map((item, i) => {
          return (
            <section key={i} className="shadow-md rounded-lg p-5 space-y-5">
              <img
                onClick={() => {
                  navigate(`/room/${item.room_id}`);
                }}
                className="hover:cursor-pointer"
                src={item.photo}
                alt="selectRoom"
              />
              <div className="space-y-5">
                <span className="font-bold text-xl">{item.name}</span>
                <section>
                  {" "}
                  <span className="span-gray">
                    {moment(item.arrival).format("DD/MM/YYYY")} đến
                  </span>
                  <span className="span-gray">
                    {moment(item.departure).format("DD/MM/YYYY")} đi
                  </span>
                  <span className="span-gray">{item.guests} người</span>
                  <Popconfirm
                    title="Phòng sẽ hủy vé của bạn ?"
                    onConfirm={() => {
                      deleteBooked(item.idDelete);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="span-gray hover:cursor-pointer hover:text-blue-500 bg-red-500">
                      Hủy phòng
                    </span>
                  </Popconfirm>
                </section>
              </div>
            </section>
          );
        })}
      </div>
    ) : (
      <p className="h-56 text-left text-xl font-semibold">
        Hiện bạn vẫn chưa đặt vé phòng nào !
      </p>
    );
  };
  const renderPersonal = () => {
    let { name, email, phone, birthday, gender, role } = dataUser;
    return (
      <div className="flex space-x-3">
        <section>
          <p>
            Tên <b> {name} </b>
          </p>
          <p>
            Email <b>{email}</b>
          </p>
          <p>
            Số điện thoại <b>{phone}</b>
          </p>
          <p>
            Ngày sinh <b>{birthday}</b>
          </p>
          <p>
            Giới tính <b>{gender ? "Male" : "Female"}</b>
          </p>
          <p>
            Role: <b>{role === "Guest" ? "Khách hàng" : "Admin"}</b>
          </p>
          <ModalUpdateUser dataUser={dataUser} />
        </section>
        <Avatar />
      </div>
    );
  };
  const renderLikeRoom = () => {
    let likeRoom = localLike.like.get();
    // let newData = likeRoom.map((room) => {
    //   return allRoom.filter((item) => {
    //     return item;
    //   })[0];
    // });

    let newData = allRoom.map((room) => {
      return room;
    });
    return newData.length ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
        {newData.map((item, i) => {
          let { id, photo, name, guests, bedrooms, bathrooms, beds, price } =
            item;
          return (
            <section key={i} className="shadow-lg rounded  duration-300">
              <div className="p-3">
                <h2 className=" text-lg font-bold">{name}</h2>
                <img
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/room/${id}`);
                  }}
                  src={photo}
                  alt="mainImage"
                />
                <div className="pt-4 pb-2">
                  <span className="span-gray">{guests} khách</span>
                  <span className="span-gray">{bedrooms} phòng ngủ</span>
                  <span className="span-gray">{beds} giường</span>
                  <span className="span-gray">{bathrooms} phòng tắm</span>
                  <span className="span-gray bg-yellow-300">{price}$/đêm</span>
                  <Link
                    to={`/room/${id}`}
                    className="span-gray text-gray-50  bg-red-500"
                  >
                    Chi tiết
                  </Link>
                </div>
                <div className="flex"> {renderComforts(item, "mx-1")}</div>
              </div>
            </section>
          );
        })}
      </div>
    ) : (
      <p className="h-56 text-left text-xl font-semibold">
        Hiện bạn vẫn chưa like phòng nào !
      </p>
    );
  };
  const items = [
    {
      label: (
        <span className="flex items-center">
          Phòng đã đặt
          <TicketIcon />
        </span>
      ),
      key: "item-1",
      children: dataBooking && allRoom && renderData(),
    },
    {
      label: (
        <span className="flex items-center">
          Like Room
          <HeartIconInfo />
        </span>
      ),
      key: "item-2",
      children: allRoom && renderLikeRoom(),
    },
    {
      label: (
        <span className="flex items-center">
          Cá nhân
          <SetttingIcon />
        </span>
      ),
      key: "item-3",
      children: dataUser && renderPersonal(),
    },
  ];
  return (
    <div className="container mx-auto pt-20 pb-10">
      {" "}
      <Tabs type="card" defaultActiveKey="1" centered items={items} />
    </div>
  );
}
