import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms,reset } from "../../features/room/roomSlice";
import RoomList from "../../components/RoomList/RoomList";
import "./rooms.style.scss";
const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading, isSuccess } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div>
        <h1 className="heading center">Loading....</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <h1 className="heading center">Rooms</h1>
        {rooms.length > 0 ? <RoomList data={rooms} /> : null}
      </div>
    </div>
  );
};

export default Rooms;
