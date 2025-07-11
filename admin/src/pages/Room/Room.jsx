import "./room.style.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, reset } from "../../features/room/roomSlice";
import Carousel from "../../components/Carousel/Carousel";

const Room = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      //navigate to rooms
      navigate("/rooms");
      //dispatch reset
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);

        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getRoom();
  }, []);

  const handleDelete = (e) => {
    dispatch(deleteRoom(id));
  };

  return (
    <div id="room">
      <div className="container">
        {room ? (
          <div>
            <div className="img-wrapper">
              <Carousel
                data={
                  room.img && room.img.length > 0 ? room.img : ["/not-or.png"]
                }
              />
            </div>
            <div className="text-wrapper">
              <h1 className="heading center">{room.name}</h1>
              <p>{room.desc}</p>
              <h2>${room.price.toFixed(2)}</h2>
            </div>

            {user && user.isAdmin ? (
              <div className="cta-wrapper">
                <Link to={`/edit/rooms/${room._id}`}>Edit Room</Link>
                <button onClick={handleDelete}>Delete Room</button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Room;
