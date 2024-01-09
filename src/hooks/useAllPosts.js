import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { addPosts } from "../redux/postSlice";
import { closeMobileNav } from "../redux/appSlice";
const useAllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMobileNav())
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, collection(db, "posts"), (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // createdAt : doc.data().createdAt.toDate()
      }));
      dispatch(addPosts(newPosts));
    });
    return () => unsubscribe();
  }, []);
};

export default useAllPosts;
