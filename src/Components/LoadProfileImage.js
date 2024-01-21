import React, { useState } from 'react'

const LoadProfileImage = ({ imgURL}) => {
    const [loaded, setLoaded] = useState(false);
    const handleImageLoad = () => {
      setLoaded(true);
    };
    return (
      <div
      className="w-10 h-10"
      >
        <div
          className={` bg-gray-800 w-full h-full rounded-full animate-pulse transition-opacity duration-1000 ease-in-out ${
            loaded ? "hidden":"block"
          }`}
        ></div>
        <img
          onLoad={handleImageLoad}
          src={imgURL}
          className="w-10 h-10 object-cover rounded-full"
          alt=""
          style={{ visibility: loaded ? "visible" : "hidden" }}
        />
      </div>
    );
  };

export default LoadProfileImage