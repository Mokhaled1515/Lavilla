import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { reset } from "../features/room/roomSlice";
import { createRoom } from "../features/room/roomSlice";
import { MdDelete } from "react-icons/md";

//create room
const CreateRoom = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "test",
    price: 2000,
    desc: "sjpsjspo",
    roomsNumbers: "401, 203, 232, 234",
  });

  const { name, price, desc, roomsNumbers } = formData;

  useEffect(() => {
    if (!user) {
      //navigate to login
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);
  const handleChange = (e) => {
    setFormData((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    const newPreviews = previewImages.filter(
      (_, index) => index !== indexToRemove
    );

    setFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   // setFiles(files);
  //   // // توليد صور للعرض المؤقت
  //   // const previews = Array.from(files).map((file) => URL.createObjectURL(file));
  //   // setPreviewImages(previews);

  //   const filesArray = Array.from(files);
  //   setFiles(filesArray);
  //   setPreviewImages(filesArray.map((file) => URL.createObjectURL(file)));
  // };

  const handleFileChange = (e) => {
    const maxSize = 10 * 1024 * 1024; // 2MB
    const filesArray = Array.from(e.target.files);

    const validFiles = filesArray.filter((file) => file.size <= maxSize);
    const previews = validFiles.map((file) => URL.createObjectURL(file));

    const rejectedFiles = filesArray.filter((file) => file.size > maxSize);
    if (rejectedFiles.length > 0) {
      alert(`${rejectedFiles.length} صورة مرفوضة لأنها أكبر من 10 ميجا.`);
    }

    setFiles(validFiles);
    setPreviewImages(previews);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !roomsNumbers) return;

    setUploading(true); // يبدأ التحميل

    const roomArray = roomsNumbers.split(",").map((item) => ({
      number: parseInt(item),
      unavailableDates: [],
    }));

    let list = [];
    try {
      list = await Promise.all(
        files.map(async (file) => {
          const url = await uploadImage(file);
          return url;
        })
      );
    } catch (err) {
      console.log("Upload error", err);
      setUploading(false);
      return;
    }

    const dataToSubmit = {
      name,
      price,
      desc,
      roomsNumbers: roomArray,
      img: list,
    };

    dispatch(createRoom(dataToSubmit));
    setUploading(false); // بعد التحميل
  };

  return (
    <div className="container">
      <h1 className="heading center">Create Room</h1>
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

          <div className="input-group">
            <label htmlFor="file-upload">Images</label>

            <label
              htmlFor="file-upload"
              style={{ cursor: "pointer", display: "inline-block" }}
            >
              <img
                src="/not-found.jpg"
                alt="Upload"
                style={{
                  width: "200px",
                  height: "100px",
                  objectFit: "cover",
                  border: "2px dashed purple",
                  borderRadius: "8px",
                }}
              />
            </label>

            {/* input file مخفي */}
            <input
              id="file-upload"
              type="file"
              name="file"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              flexWrap: "wrap",
            }}
          >
            {previewImages.map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "100px",
                  height: "60px",
                  marginBottom: "1rem",
                }}
              >
                <img
                  src={src}
                  alt={`preview-${i}`}
                  onClick={() => setSelectedImage(src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "2px solid rgb(201, 38, 104)",
                    cursor: "pointer",
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(i);
                  }}
                  style={{
                    position: "absolute",
                    top: "1px",
                    right: "1px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "1px",
                    borderRadius: "2px",
                    width: "20px",
                    height: "30px",
                    fontSize: "19px",
                    fontFamily: "cursive",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div
              onClick={() => setSelectedImage(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={selectedImage}
                  alt="Large Preview"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    borderRadius: "10px",
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  style={{
                    position: "absolute",
                    top: "-28px",
                    right: "-24px",
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    width: "50px",
                    height: "50px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  X
                </button>
              </div>
            </div>
          )}
          {uploading && (
            <p style={{ color: "purple", fontWeight: "bold" }}>
              Uploading images...
            </p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
