import React from "react";
import "./RoomList.style.scss";
import { Link } from "react-router-dom";

const RoomList = ({ data }) => {
  return (
    <div id="room-list">
      {data.map((item, index) => {
        return (
          <Link to={`/rooms/all/${item._id}`} key={item._id} className="room-unit">
            <div className="img-wrapper">
              {/* <img src={item.img[0]} alt="" /> */}
              <img
              loading="lazy"
                src={
                  item.img && item.img.length > 0
                    ? item.img[0]
                    : "/not-or.png"
                }
                alt={item.name}
              />
            </div>
            <p className="name">{item.name}</p>
            <p></p>
          </Link>
        );
      })}
    </div>
  );
};

export default RoomList;
