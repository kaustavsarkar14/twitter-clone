import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Navbar = () => {
  return (
    <div className="w-[26%] flex justify-end sticky top-0 left-0 h-screen">
      <div className="w-[65%] flex justify-start p-2 flex-col  text-xl mr-3">
        <div className="p-2">
          <img
            className="w-[2rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
            alt=""
          />
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <HomeRoundedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Home</p>
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <SearchRoundedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Explore</p>
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <NotificationsNoneRoundedIcon
            sx={{ height: "2rem", width: "2rem" }}
          />
          <p>Notifications</p>
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <EmailOutlinedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Messages</p>
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <BookmarkBorderOutlinedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Bookmarks</p>
        </div>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3 mb-2">
          <PersonOutlineOutlinedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Profile</p>
        </div>
        <button className="bg-blue-500 rounded-full p-2 font-bold" >Post</button>
      </div>
    </div>
  );
};

export default Navbar;
