import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import Toast from "./Toast";

export default function TweetMenu({ tweetData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const tweetDocRef = doc(db, "posts", tweetData.id);
      await deleteDoc(tweetDocRef);
      toast.success("Post Deleted");
    } catch (error) {
      toast.error("Post was not deleted");
    }
  };
  const handleShare = () => {
    console.log(
      tweetData.isRetweet
        ? tweetData.retweeterUID == auth.currentUser.uid
        : tweetData.authorUID == auth.currentUser.uid
    );
    console.log(tweetData.retweeterUID == auth.currentUser.uid);
    console.log(auth.currentUser.uid);
  };
  return (
    <div>
      <Toast />
      <div
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon sx={{ color: "white", cursor: "pointer" }} />
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {(tweetData.isRetweet
          ? tweetData.retweeterUID == auth.currentUser.uid
          : tweetData.authorUID == auth.currentUser.uid) && (
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        )}
        <MenuItem onClick={handleShare}>Share</MenuItem>
      </Menu>
    </div>
  );
}
