import React from "react";
import { LOGO_URL } from "../utils/constants";
import { auth } from "../firebase";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useDispatch } from "react-redux";
import { openMobileNav } from "../redux/appSlice";
import LoadProfileImage from "./LoadProfileImage";

const MobileHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="sticky top-0 z-20 flex w-screen justify-between md:hidden p-2 items-center bg-black bg-opacity-80 backdrop-blur-md">
      <LoadProfileImage imgURL={auth.currentUser?.photoURL} />
      <img src={LOGO_URL} className="h-8 w-8 rounded-full" />
      <SettingsRoundedIcon />
    </div>
  );
};

export default MobileHeader;
