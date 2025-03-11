import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Type for Slider Arrow Props
interface ArrowProps {
  onClick?: () => void;
}

// Custom Left Arrow
const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 text-gray-700"
  >
    <IoIosArrowBack size={24} />
  </button>
);

// Custom Right Arrow
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 text-gray-700"
  >
    <IoIosArrowForward size={24} />
  </button>
);

const ImageCarousel: React.FC = () => {
  const images: string[] = ["/hills.jpg", "/hills.jpg", "/hills.jpg"];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Main Image Section */}
      <div className="w-1/2 p-20">
        <img
          src="hills.jpg"
          alt="Mount Buzinganjwili"
          className="rounded-lg shadow-lg w-full "
        />
        <h3 className="mt-2 font-semibold text-lg">Mount Buzinganjwili</h3>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="text-green-500 mr-1" />
          <span>Gakenke, Ruli</span>
        </div>
        {/* Star Rating */}
        <div className="flex text-yellow-500 mt-1">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="w-1/2 relative">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="px-2">
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="rounded-lg shadow-md w-full"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
