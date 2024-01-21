import React, { useState } from "react";

const LazyLoadImage = ({ imgURL, height, width }) => {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };

  const aspectRatio = (height / width) * 100;
  console.log(aspectRatio);
  return (
    <div
      className={`md:w-[${aspectRatio < 100 ? "100%" : "80%"}] w-[${
        aspectRatio < 100 ? "100%" : "95%"
      }] h-[${aspectRatio<100? "20rem":"30rem"}] rounded-2xl overflow-hidden border-gray-800 border relative`}
    >
      <div
        className={`bg-gray-950 animate-pulse transition-opacity duration-1000 ease-in-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <img
        onLoad={handleImageLoad}
        src={imgURL}
        className={` object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        alt=""
        style={{ visibility: loaded ? "visible" : "hidden" }}
      />
    </div>
  );
};

export default LazyLoadImage;
