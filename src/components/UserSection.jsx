import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase.config";
import { signOut } from "firebase/auth";
import { LogOut, Settings, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const UserSection = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles user logout and redirects to the login page.
   */
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  /**
   * Extracts the first letter of the user's email for the avatar.
   * @param {string} email - User's email address.
   * @returns {string} The first uppercase letter of the email.
   */
  const getInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  /**
   * Toggles the dropdown menu visibility.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Closes the dropdown when clicking outside the avatar or menu.
   */
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".user-avatar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative flex items-center justify-center mt-auto border-t border-gray-300 pt-4">
      {user ? (
        <div className="relative">
          {/* Avatar Button */}
          <div
            className="user-avatar w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
            onClick={toggleDropdown}
          >
            {getInitials(user.email)}
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 bottom-14 transform translate-y-2 bg-white shadow-lg rounded-xl p-4 w-50 border border-gray-200 z-9999">
              {/* User Info */}
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user.email)}
                </div>
                <div>
                  <p className="text-md font-semibold text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Manage Account */}
              <button className="mt-3 flex gap-2 items-center text-gray-600 hover:text-black w-full px-2 py-2 transition duration-200">
                <Settings size={18} />
                Manage Account
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-1 flex gap-2 items-center text-red-500 hover:text-red-700 w-full px-2 py-2 transition duration-200"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/login"}
          className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
        >
          <LogIn size={"20"} />
          <span className="font-bold hidden md:block text-lg">Login</span>
        </Link>
      )}
    </div>
  );
};

export default UserSection;
