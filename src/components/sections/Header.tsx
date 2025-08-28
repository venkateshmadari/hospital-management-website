import { PiHandsPrayingBold } from "react-icons/pi";
import { Button } from "../ui/button";
import { HiLogin } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import SignOutModal from "../modals/SignOutModal";
import ProfileSheet from "../modals/ProfileSheet";
import { Link } from "react-router-dom";
import { IoTicket } from "react-icons/io5";

const Header = () => {
  const { user, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [toggleProfileModal, setToggleProfileModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setToggleModal(true);
  };
  const toggleProfile = () => {
    setIsDropdownOpen(false);
    setToggleProfileModal(true);
  };
  return (
    <>
      <div className="w-full px-4 bg-gradient-to-r from-violet-500/20 via-white to-white border-b border-violet-200 fixed top-0 z-50 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto py-4 flex items-center justify-between ">
          <h1 className="text-primary text-xl capitalize font-semibold inline-flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <PiHandsPrayingBold className="w-6 h-6 text-white" />
            </div>
            We care hospitals
          </h1>

          {loading ? (
            // Skeleton loading state
            <div className="inline-flex gap-2 md:bg-primary/5 p-2 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="hidden md:block space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="inline-flex gap-2 md:bg-primary/5 p-2 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary/15 text-primary uppercase flex items-center justify-center">
                    {user?.name?.slice(0, 1)}
                  </div>
                )}
                <div className="hidden md:block">
                  <h1 className="text-sm capitalize">{user.name}</h1>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm  hover:bg-gray-100 cursor-pointer"
                    onClick={toggleProfile}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <Link
                    className="w-full flex items-center px-4 py-2 text-sm  hover:bg-gray-100 cursor-pointer"
                    to={"/appointments"}
                  >
                    <IoTicket className="w-4 h-4 mr-2" />
                    Appointments
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href={"/auth/login"}>
              <Button className="py-3 inline-flex items-center gap-1.5 cursor-pointer">
                Login
                <HiLogin />
              </Button>
            </a>
          )}
        </div>
      </div>
      <SignOutModal open={toggleModal} onOpenChange={setToggleModal} />
      <ProfileSheet
        open={toggleProfileModal}
        onOpenChange={setToggleProfileModal}
      />
    </>
  );
};

export default Header;
