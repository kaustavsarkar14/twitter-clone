import React from "react";
import { LOGO_URL } from "../utils/constants";
import { auth } from "../firebase";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useDispatch } from "react-redux";
import { openMobileNav } from "../redux/appSlice";

const MobileHeader = () => {
    const dispatch= useDispatch()
  return (
    <div className="sticky top-0 flex w-screen justify-between md:hidden p-2 items-center bg-black">
      <img
        onClick={()=>dispatch(openMobileNav())}
        src={auth?.currentUser?.photoURL}
        className="h-8 w-8 rounded-full"
        alt=""
      />
      <img src={LOGO_URL} className="h-8 w-8 rounded-full" />
      <SettingsRoundedIcon/>
    </div>
  );
};

export default MobileHeader;
