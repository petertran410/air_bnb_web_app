import React, { useState } from "react";
import { StarIcon } from "../../Utilities/IconSVG";
import AddComment from "./AddComment";
export default function CommentRoom({ dataComment, idRoom }) {
  const [moreComment, setMoreComment] = useState(-4);
  let newData = dataComment.slice(moreComment);
  const allComment = () => {
    moreComment ? setMoreComment() : setMoreComment(-4);
  };
  const renderContent = () => {
    return newData.map((item, i) => {
      let { rated, date, content, created_by } = item;
      return (
        <div
          key={i}
          className="container flex flex-col p-3 mx-auto divide-y rounded-md divide-gray-100 text-black"
        >
          <div className="flex justify-between p-4">
            <div className="flex space-x-4">
              <div>
                <img
                  src={created_by.avatar}
                  alt="avatar_random"
                  className="object-cover w-12 h-12 rounded-full bg-gray-500"
                />
              </div>
              <div>
                <h4 className="font-bold">Ẩn danh</h4>
                <span className="text-xs text-gray-400">{date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <StarIcon />
              <span className="text-xl font-bold">{rated}</span>
            </div>
          </div>
          <div className="p-4 pb-0 space-y-2 text-sm text-black">
            <p>{content}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 py-10">
        {renderContent()}
        {moreComment && dataComment.length > 3 && (
          <a
            className="px-5"
            onClick={() => {
              allComment();
            }}
          >
            Xem thêm
          </a>
        )}
        {!moreComment && dataComment.length > 3 && (
          <a
            className="px-5"
            onClick={() => {
              allComment();
            }}
          >
            Ẩn
          </a>
        )}
        <AddComment idRoom={idRoom} />
      </div>
    </>
  );
}
