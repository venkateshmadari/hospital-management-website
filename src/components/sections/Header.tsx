import React from "react";
import { PiHandsPrayingBold } from "react-icons/pi";
import { Button } from "../ui/button";
import { HiLogin } from "react-icons/hi";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-violet-500/20 via-white to-white border-b border-violet-200 fixed top-0 z-50 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto py-4 flex items-center justify-between ">
        <h1 className="text-primary text-xl capitalize font-semibold inline-flex items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <PiHandsPrayingBold className="w-6 h-6 text-white" />
          </div>
          We care hospitals
        </h1>
        <Button className="py-3 inline-flex items-center gap-1.5 cursor-pointer">
          Login
          <HiLogin />
        </Button>
      </div>
    </div>
  );
};

export default Header;
