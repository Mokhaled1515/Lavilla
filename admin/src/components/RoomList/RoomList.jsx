import React from "react";
import "./RoomList.style.scss";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const RoomList = ({ data }) => {
  return (
    <div id="room-list">
      {data.map((item, index) => {
        return (
          <Link
            to={`/rooms/all/${item._id}`}
            key={item._id}
            className="room-unit"
          >
            <div className="img-wrapper">
              {/* <Carousel data={item.img}/> */}
              <Carousel
                data={
                  item.img && item.img.length > 0 ? item.img : ["/not-or.png"]
                }
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
