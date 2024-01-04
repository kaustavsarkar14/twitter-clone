import React, { useEffect, useRef } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { LOGO_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileNav } from "../redux/appSlice";
import { auth } from "../firebase";
import LogOutMenu from "./LogOutMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const isMobileNavOpen = useSelector((state) => state.app.isMobileNavOpen);
  const navbarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        dispatch(closeMobileNav());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className={
        "w-[60%] md:w-[26%] md:flex justify-start md:justify-end md:sticky top-0 left-0 h-screen bg-black md:bg-transparent fixed z-10 " +
        (isMobileNavOpen ? "flex" : "hidden")
      }
    >
      <div className="w-[100%] md:w-[65%] flex justify-start p-2 flex-col  text-xl mr-3">
        <div className="p-2">
          <img className="w-[2rem]" src={LOGO_URL} alt="" />
        </div>
        <Link to={"/"}>
        <div className="flex hover:bg-gray-900 hover:cursor-pointer transition-all duration-200 rounded-full p-2 gap-3">
          <HomeRoundedIcon sx={{ height: "2rem", width: "2rem" }} />
          <p>Home</p>
        </div>
        </Link>
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
        <button className="bg-blue-500 rounded-full p-2 font-bold hidden md:block ">
          Post
        </button>
        <Link to={'/profile/'+auth.currentUser?.uid}>
          <div className="relative bottom-4 hover:bg-gray-900 w-[100%] p-3 mt-[40vh] rounded-full flex gap-3">
            <img
              src={auth.currentUser?.photoURL}
              className="md:h-10 md:w-10 rounded-full h-6 w-6"
              alt=""
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold">
                {auth.currentUser?.displayName}
              </h2>
              <p className="text-sm opacity-65">
                @{auth.currentUser?.email.split("@")[0]}
              </p>
            </div>
            <LogOutMenu />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
