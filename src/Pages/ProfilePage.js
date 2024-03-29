import React from "react";
import Navbar from "../Components/Navbar";
import RightBar from "../Components/RightBar";
import Profile from "../Components/Profile";
import MobileHeader from "../Components/MobileHeader";

const ProfilePage = () => {
  
  return <div className="flex flex-col md:flex-row">
    <MobileHeader/>
    <Navbar/>
    <Profile/>
    <RightBar/>
  </div>;
};

export default ProfilePage;
