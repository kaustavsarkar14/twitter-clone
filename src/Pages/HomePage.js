import Navbar from "../Components/Navbar";
import RightBar from "../Components/RightBar";
import Feed from "../Components/Feed";
import useAllPosts from "../hooks/useAllPosts";
import MobileHeader from "../Components/MobileHeader";

const HomePage = () => {
  useAllPosts();
  
  return (
    <div className="flex flex-col md:flex-row">
      <MobileHeader/>
      <Navbar />
      <Feed />
      <RightBar />
    </div>
  );
};

export default HomePage;
