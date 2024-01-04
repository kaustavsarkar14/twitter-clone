import { useState } from "react";
import Modal from "@mui/material/Modal";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { getDownloadURL, ref, uploadBytes, update } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import Toast from "./Toast";

export default function EditProfileModal({ profileData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [email, setEmail] = useState(profileData.email);
  const [bannerURL, setBannerURL] = useState(profileData.bannerURL);
  const [photoURL, setPhotoURL] = useState(profileData.photoURL);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const handleProfileImageUpload = async (e) => {
    setIsPhotoUploading(true);
    const file = e.target.files[0];
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    setPhotoURL(downloadURL);
    setIsPhotoUploading(false);
  };
  const handleBannerImageUpload = async (e) => {
    setIsBannerUploading(true);
    const file = e.target.files[0];
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    setBannerURL(downloadURL);
    setIsBannerUploading(false);
  };

  const handleUpdateProfile = async () => {
    setIsSaving(true)
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
    try {
      const querySnapshot = await getDocs(q);
      const profileDoc = querySnapshot.docs[0];
      console.log(profileDoc.data())
      const profileRef = profileDoc.ref;
      await updateDoc(profileRef, { name, photoURL, bannerURL, bio });
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      console.log("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsSaving(false)
    toast.success('Profile updated!!')
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="font-bold border border-white py-1 px-2 rounded-full md:mb-10 -mb-3"
      >
        Edit Profile
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="bg-black border border-gray-800 rounded-3xl md:w-[50%] md:h-[70%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-6 flex flex-col gap-8 w-[90%] h-[70vh]">
          <div className="w-full h-36 relative">
            <input
              type="file"
              id="bannerInput"
              className="hidden"
              onChange={handleBannerImageUpload}
            />
            <label htmlFor="bannerInput">
              <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                {isBannerUploading ? (
                  <LoadingSpinner />
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </div>
              <img
                src={bannerURL}
                className="w-full h-full object-cover rounded-2xl hover:opacity-20"
                alt=""
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row items-center ">
            <input
              type="file"
              id="photoInput"
              onChange={handleProfileImageUpload}
              className="hidden"
            />
            <label htmlFor="photoInput">
              <div className="w-32 h-32 relative p-4">
                <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                  {isPhotoUploading ? (
                    <LoadingSpinner />
                  ) : (
                    <AddPhotoAlternateOutlinedIcon />
                  )}
                </div>
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover hover:opacity-20"
                  alt=""
                />
              </div>
            </label>
            <div className="flex flex-col gap-3 flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black p-1 px-2 text-white border border-blue-500 focus:outline-none"
                placeholder="Name"
              />
              <input
                type="text"
                value={email}
                disabled={true}
                className="bg-black p-1 px-2 text-white border border-blue-500 focus:outline-none"
                placeholder="Email"
              />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-black p-1 px-2 text-white border border-blue-500 focus:outline-none"
                placeholder="Bio"
              />
              <button
                onClick={handleUpdateProfile}
                className="bg-white text-black px-4 py-1 font-bold rounded-full absolute bottom-6 right-6 disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving?"Saving...":"Save"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Toast/>
    </div>
  );
}
