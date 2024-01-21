import React from "react";
import { Link } from "react-router-dom";
import TweetStats from "./TweetStats";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import TweetMenu from "./TweetMenu";
import VerifiedIcon from '@mui/icons-material/Verified';
import LazyLoadImage from "./LazyLoadImage";
import LoadProfileImage from "./LoadProfileImage";


const Tweet = ({ tweetData }) => {
  return (
    <div className="flex flex-col gap-2 p-3 relative border-b border-gray-800">
      <div className="absolute right-3">
        <TweetMenu tweetData={tweetData} />
      </div>
      {tweetData.isRetweet && (
        <div className="pl-6">
          <p className="text-gray-500 text-sm flex gap-2 items-center">
            <SyncRoundedIcon sx={{ width: "1.2rem" }} />
            {tweetData.retweeterName} retweeted
          </p>
        </div>
      )}
      <div className="flex gap-2 w-full">
        <Link to={"/profile/" + tweetData.authorUID}>
          <LoadProfileImage imgURL={tweetData.authorPhotoURL} />
        </Link>
        <div className="w-full flex flex-col gap-2 break-words min-w-0">
          <h2 className="font-bold flex gap-1">
            {tweetData.authorName}
            {tweetData && (
              <span>
                <VerifiedIcon sx={{ width: "1rem", color: "#3B82F6" }} />
              </span>
            )}
          </h2>
          <h3 className="">{tweetData.title}</h3>
          {/* <img
            src={tweetData.imageURL}
            alt=""
            className="md:w-[80%] w-[100%] rounded-2xl"
          /> */}
          <LazyLoadImage imgURL={tweetData.imageURL} height={tweetData.height} width={tweetData.width}/>
          <TweetStats tweetId={tweetData.id} tweetData={tweetData} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
