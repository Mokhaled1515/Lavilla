import { useEffect, useState } from "react";
import "./carousel.style.scss";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="carousel-wrapper">
      <img
        src={data[currentIndex]}
        alt={`room-${currentIndex}`}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
    </div>
  );
};

export default Carousel;
