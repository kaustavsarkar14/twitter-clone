import Navbar from "../Components/Navbar";
import RightBar from "../Components/RightBar";
import Feed from "../Components/Feed";
import useAllPosts from "../hooks/useAllPosts";

const HomePage = () => {
  useAllPosts();

  return (
    <div className="flex">
      <Navbar />
      <Feed />
      <RightBar />
    </div>
  );
};

export default HomePage;
