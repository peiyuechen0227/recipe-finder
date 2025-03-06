import React from "react";
import { Link } from "react-router-dom";
import { Home, Heart, ChefHat } from "lucide-react";
import UserSection from "./UserSection";

const Sidebar = ({ user }) => {
  return (
    <>
      <DesktopSidebar user={user} />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

const DesktopSidebar = ({ user }) => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-24 md:w-60 p-3 md:p-10 border-r 
 bg-white shadow-lg hidden sm:flex flex-col justify-between min-h-full"
    >
      <div className="flex flex-col gap-10">
        <div className="w-full flex justify-center md:justify-start">
          <img src="/logo.svg" alt="logo" className="hidden md:block" />
          <img src="/mobile-logo.svg" alt="logo" className="block md:hidden" />
        </div>

        {/* <ul className="flex flex-col items-center md:items-start gap-8"></ul> */}
        <nav className="flex flex-col gap-6">
          <Link
            to={"/"}
            className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
          >
            <Home size={"24"} />
            <span className="font-bold hidden md:block text-lg">Home</span>
          </Link>
          <Link
            to={"/Favorites"}
            className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
          >
            <Heart size={"24"} />
            <span className="font-bold hidden md:block text-lg">Favorites</span>
          </Link>
          <Link
            to={"/myrecipes"}
            className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
          >
            <ChefHat size={"24"} />
            <span className="font-bold hidden md:block text-lg">
              My Recipes
            </span>
          </Link>
        </nav>
      </div>

      <UserSection user={user} />
    </div>
  );
};

const MobileSidebar = () => {
  return (
    <div
      className="flex justify-center gap-10 border-t fixed w-full
    bottom-0 left-0 bg-white z-10 p-2 h-16 sm:hidden items-center"
    >
      <Link to={"/"}>
        <Home size={"30"} className="cursor-pointer" />
      </Link>
      <Link to={"/Favorites"}>
        <Heart size={"30"} className="cursor-pointer " />
      </Link>
    </div>
  );
};
