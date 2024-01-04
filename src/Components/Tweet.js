import React from "react";
import { Link } from "react-router-dom";

const Tweet = ({ tweetData }) => {
  return (
    <div className="flex gap-2 p-3 border-b border-gray-800">
      <Link to={"/profile/"+tweetData.authorUID}>
        <div className="w-10 h-10">
        <img
          src={tweetData.authorPhotoURL}
          className="w-full h-full object-cover rounded-full"
          alt=""
        />
        </div>
      </Link>
      <div className="flex flex-col gap-2 break-words min-w-0">
        <h2 className="font-bold">{tweetData.authorName}</h2>
        <h3 className="">{tweetData.title}</h3>
        <img
          src={tweetData.imageURL}
          alt=""
          className="md:w-[80%] w-[100%] rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Tweet;
