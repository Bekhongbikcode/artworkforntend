import ManageRequestTypeOfArtwork from "./admin/manageRequestTypeOfArtwork/page";
import CreateTypeOfArtWorkTest from "./creator/createTypeOfArtWork/page";
import BodyHomePage from "./ui/BodyHomePage/BodyHomePage";
import Navbar from "./ui/Navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="">
        <BodyHomePage />
        <ManageRequestTypeOfArtwork />
      </div>
    </div>
  );
}