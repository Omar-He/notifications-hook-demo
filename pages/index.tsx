import type { NextPage } from "next";
import TopNavigation from "@components/TopNavigation";

const Home: NextPage = () => {
  return (
    <div className="content-container">
      <TopNavigation />
    </div>
  );
};

export default Home;
