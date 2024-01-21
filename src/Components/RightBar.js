import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const RightBar = () => {
  return (
    <div className="flex-1 h-screen md:block hidden px-4 py-1">
      <div className="w-[70%] flex flex-col gap-4">
        <div className="bg-white bg-opacity-10  px-3 py-2 rounded-full flex gap-2 items-center justify-start">
          <SearchRoundedIcon sx={{ height: "1.4rem", width: "1.4rem" }} />
          <input type="text" className="bg-transparent outline-none border-none" placeholder="Search" />
        </div>
        <div className="bg-white bg-opacity-10 p-3 rounded-2xl flex flex-col gap-3 justify-start" >
          <h1 className="text-xl font-bold" >Subscribe to Premium</h1>
          <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
          <button className="bg-blue-500 font-bold w-[6rem] rounded-full p-2">Subscribe</button>
        </div>
        <div className="bg-white bg-opacity-10 p-3 rounded-2xl flex flex-col gap-3 justify-start" >
          <h1 className="text-xl font-bold" >What’s happening</h1>
          <div>
            <p className="opacity-30 text-sm" >Coding · Trending</p>
            <p className="font-semibold">#javascript</p>
            <p className="opacity-30 text-sm" >5109 posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >Trending in India</p>
            <p className="font-semibold">#ilovereact</p>
            <p className="opacity-30 text-sm" >9109 posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >Entertainment · Trending</p>
            <p className="font-semibold">#firebasewithreact</p>
            <p className="opacity-30 text-sm" >100k posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >Entertainment · Trending</p>
            <p className="font-semibold">#madewithreact</p>
            <p className="opacity-30 text-sm" >9109 posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >Entertainment · Trending</p>
            <p className="font-semibold">#100dayscoding</p>
            <p className="opacity-30 text-sm" >23.4k posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >Gaming · Trending</p>
            <p className="font-semibold">#GTAVI</p>
            <p className="opacity-30 text-sm" >910 posts</p>
          </div>
          <div>
            <p className="opacity-30 text-sm" >India · Trending</p>
            <p className="font-semibold">#github</p>
            <p className="opacity-30 text-sm" >919 posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
