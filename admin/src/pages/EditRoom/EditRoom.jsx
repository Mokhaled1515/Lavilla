import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoom } from "../../features/room/roomSlice";
import { reset } from "../../features/auth/authSlice";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomsNumbers: "",
  });
  const { name, price, desc, roomsNumbers } = formData;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        const { roomsNumbers, ...reset } = data;
        const roomMap = roomsNumbers.map((item) => item.number);

        const roomString = roomMap.join(",");
        setFormData({
          ...reset,
          roomsNumbers: roomString,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      //navigate to rooms
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !roomsNumbers) {
      return;
    }
    const roomArray = roomsNumbers.split(",").map((item) => {
      return {
        number: parseInt(item),
        unavailableDates: [],
      };
    });

    const dataToSubmit = {
      name,
      price,
      desc,
      roomsNumbers: roomArray,

      roomId: id,
    };

    dispatch(updateRoom(dataToSubmit));
  };
  return (
    <div className="container">
      <h1 className="heading center">Edit Room</h1>
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="desc">Room Numbers</label>
            <textarea
              name="roomsNumbers"
              onChange={handleChange}
              value={roomsNumbers}
              placeholder="enter room numbers seperated by commas eg: 202, 203, 204, 400"
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
