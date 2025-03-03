import React from "react";
import { Link } from "react-router-dom";
import { Home, Heart } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

const DesktopSidebar = () => {
  return (
    <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:flex flex-col justify-between">
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
            <Home size={"28"} />
            <span className="font-bold hidden md:block text-lg">Home</span>
          </Link>
          <Link
            to={"/Favorites"}
            className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
          >
            <Heart size={"28"} />
            <span className="font-bold hidden md:block text-lg">Favorites</span>
          </Link>
        </nav>
      </div>
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
