import React, { useState } from "react";
import { Modal, Image } from "antd";
import { Rate } from "antd";
import "./ServicesRoom.css";
import {
  CalendarIcon,
  FlashIcon,
  HomeIcon,
  StarIcon,
  SuperIcon,
  SuperIconDesc,
} from "../../Utilities/IconSVG";
import BookRoom from "./BookRoom";
import MapRoom from "./MapRoom";
import BookMark from "./BookMark";
import { renderComforts } from "../../Utilities/ItemServices";
export default function ServicesRoom({
  dataSer,
  isStatus,
  totalPeople,
  averageStar,
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  let {
    photo,
    guests,
    bedrooms,
    bathrooms,
    description,
    name,
    price,
    id,
    positionRoom,
    rated,
  } = dataSer;
  console.log(dataSer);
  console.log(averageStar);
  console.log(totalPeople);
  return (
    <>
      {" "}
      <div className="">
        <span className="text-2xl font-medium mx-1">{name}</span>
        <div className="my-2">
          {" "}
          {totalPeople ? (
            <>
              {" "}
              <section className="flex text-lg">
                <StarIcon />
                <b> {rated}</b>/
                <span className="mx-1">{totalPeople} đánh giá</span>
                <BookMark id={id} />
              </section>
            </>
          ) : (
            <BookMark id={id} />
          )}
        </div>
        <Image
          alt="main_Img"
          preview={{
            visible: false,
          }}
          src={photo}
          onClick={() => setVisible(true)}
        />
        <div
          style={{
            display: "none",
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            {dataSer.newImage.map((item, i) => {
              return (
                <Image key={i} src={item.urlImage} alt={`room_${i + 1}`} />
              );
            })}
          </Image.PreviewGroup>
        </div>
      </div>
      <div className="py-10 flex flex-col-reverse md:flex-row">
        <section>
          <div className="flex justify-between items-center">
            <p className="text-base">
              <b>Căn hộ chủ nhà {name}</b>
              {positionRoom && (
                <>
                  {" "}
                  <>
                    <Modal
                      footer={false}
                      centered
                      open={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      width={1000}
                    >
                      <MapRoom positionRoom={positionRoom} />
                    </Modal>
                  </>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    {" "}
                    (Bản đồ)
                  </button>
                </>
              )}
              <br />
              {guests} khách - {bedrooms} phòng ngủ - {bathrooms} phòng tắm
            </p>
            <div className="flex">
              {" "}
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/80"
                alt="avatar_random"
              />
              <SuperIcon />
            </div>
          </div>
          <hr />
          <div className="desc py-3">
            <section className="flex">
              <HomeIcon />
              <p className="mx-2">
                <b> Toàn bộ nhà.</b>
                <br />
                Bạn sẽ có chung cư cao cấp cho riêng mình.
              </p>
            </section>
            <section className="flex">
              <FlashIcon />
              <p className="mx-2">
                <b> Vệ sinh tăng cường.</b>
                <br />
                Chủ nhà cam kết thực hiện vệ sinh tăng cường theo 5 bước tiêu
                chuẩn AirBnb.
              </p>
            </section>
            <section className="flex">
              <SuperIconDesc />
              <p className="mx-2">
                <b>Huy hiệu chủ nhà uy tín</b>
                <br />
                Những chủ nhà có kinh nghiệm được đánh gía cao và cam kết mang
                lại sự hài lòng cho quí khách.
              </p>
            </section>
            <section className="flex">
              <CalendarIcon />
              <p className="mx-2">
                <b> Miễn phí hủy trong vòng 24 giờ.</b>
              </p>
            </section>
          </div>
          <hr />
          <p className="py-4 font-medium">{description}</p>
          <hr />
          <div className="pt-5">
            <h2 className="text-lg font-semibold">Tiện Nghi</h2>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
              {renderComforts(dataSer, "flex", "isRoom")}
            </div>
          </div>
        </section>
        <BookRoom isStatus={isStatus} khach={guests} id={id} giaTien={price} />
      </div>
      <hr />
      {totalPeople ? (
        <>
          {" "}
          <Rate disabled allowHalf defaultValue={averageStar} />
          <span className="mx-2">{averageStar}/5</span>
        </>
      ) : (
        "Hãy là người bình luận đầu tiên"
      )}
    </>
  );
}
