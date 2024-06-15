import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { roomServ } from "../../Services/roomService";
import { dataUrlImage } from "../../Assets/dataImage";
import repair from "../../Assets/repair.png";
import "./Detail.css";
import { locationVN } from "../../Assets/dataLocation.js";
import SimpleMap from "./GGmap";
import { Link } from "react-router-dom";
import { randomNumber } from "../../Utilities/randomNumber";
import { setLoadingOn, setLoadingOff } from "../../Redux/actions/actionsSpiner";
import { renderComforts } from "../../Utilities/ItemServices";
import { positionSer } from "../../Services/positionService";
export default function Detail() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  let { state } = useLocation();
  const [currentPosition, setCurrentPosition] = useState(false);
  const [dataBook, setDataBook] = useState([]);
  useEffect(() => {
    dispatch(setLoadingOn());
    roomServ
      .getDataBook(id)
      .then((res) => {
        let newData = res.data.data.map((item) => {
          console.log(item);
          let index = randomNumber(dataUrlImage.length);
          let newHinhAnh = dataUrlImage.slice(index, index + 4);
          newHinhAnh.unshift({ urlImage: item.photo });
          let newItem = { ...item, hinhAnh: newHinhAnh };
          return newItem;
        });
        setDataBook(newData);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log("err: ", err);
      });
  }, [id]);
  useEffect(() => {
    positionSer
      .getCurrentPosition(id)
      .then((res) => {
        let { location } = res.data.data;
        let index = locationVN.findIndex(
          (item) => item.admin_name === location || item.city === location
        );
        setCurrentPosition({
          ...res.data.data,
          center: {
            lat: + locationVN[index]?.lat,
            lng: + locationVN[index]?.lng,
          },
        });
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  let renderImage = (data) =>
    data.map((item, i) => (
      <div className="" key={i}>
        <img
          className="p-2 h-64 mx-auto rounded-xl"
          src={item.urlImage}
          alt="image_detail"
        />
      </div>
    ));
  let renderContent = () =>
    dataBook?.map((item, i) => {
      let { id, hinhAnh, name, guests, bedrooms, bathrooms, beds, price } =
        item;
      return (
        <section key={i} className="shadow-lg rounded  duration-300">
          <Carousel effect="fade">{renderImage(hinhAnh)}</Carousel>
          <div className="p-3">
            {state && (
              <p className="font-medium">
                Khuyến mãi 50% nhân dịp hè đến {""}
                <span className="line-through text-xl">{price * 2}$</span>
              </p>
            )}
            <h2 className=" text-lg font-bold">{name}</h2>
            <div className="pt-4 pb-2">
              <span className="span-gray">{guests} khách</span>
              <span className="span-gray">{bedrooms} phòng ngủ</span>
              <span className="span-gray">{beds} giường</span>
              <span className="span-gray">{bathrooms} phòng tắm</span>
              <span className="span-gray bg-yellow-300  ">{price}$/đêm</span>
              <Link
                to={`/room/${id}`}
                className="span-gray text-gray-50  bg-red-500"
              >
                Chi tiết
              </Link>
            </div>
            <div className="flex">{renderComforts(item, "mx-1")}</div>
          </div>
        </section>
      );
    });

  return (
    <div className="container mx-auto pt-20 pb-10">
      <h1 className="text-3xl font-bold">
        Chỗ ở tại khu vực{" "}
        {currentPosition.center &&
          currentPosition.address +
            `,` +
            currentPosition.city +
            `,` +
            currentPosition.country}
      </h1>
      {dataBook.length == 0 ? (
        <section className="">
          <img className="block mx-auto" src={repair} alt="imgRepair" />
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="text-3xl py-5 text-center  text-blue-300 hover:cursor-pointer hover:text-blue-500 duration-300"
          >
            Hệ thống đang cập nhật
          </h1>
        </section>
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
            {renderContent()}
          </div>
          {currentPosition && (
            <SimpleMap dataBook={dataBook} currentPosition={currentPosition} />
          )}
        </div>
      )}
    </div>
  );
}
