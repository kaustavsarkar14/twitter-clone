import React from "react";

const Tweet = ({ tweetData }) => {
  return (
    <div className="flex gap-2 p-3 border-b border-gray-800">
      <img
        src={tweetData.authorPhotoURL}
        className="h-10 w-10 rounded-full"
        alt=""
      />
      <div className="flex flex-col gap-2 break-words min-w-0">
        <h2 className="font-bold">{tweetData.authorName}</h2>
        <h3 className="">{tweetData.title}</h3>
        <img src={tweetData.imageURL} alt="" className="w-[80%] rounded-2xl" />
      </div>
    </div>
  );
};

export default Tweet;
