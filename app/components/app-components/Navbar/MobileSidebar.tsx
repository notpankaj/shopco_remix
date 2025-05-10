import { IoClose, IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { useState } from "react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const navigate = useNavigate();
  const token = useSelector((s: RootState) => s.auth.token);
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const [searchString, setSearchString] = useState("");

  const navLinks = [
    { title: "Shop", path: "/shop" },
    { title: "On Sales", path: "/sales" },
    { title: "New Arrivals", path: "/new-arrivals" },
    { title: "Brands", path: "/brands" },
  ];

  const handleProfileClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/auth/login");
    }
    onClose();
  };

  const handleSearch = () => {
    if (searchString) {
      navigate(`/search?search=${searchString}`);
      setSearchString("");
      onClose();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-[var(--bg-primary)] z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span
            className="heading text-[1.5rem] cursor-pointer"
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
            SHOP.CO
          </span>
          <button onClick={onClose}>
            <IoClose className="text-[24px]" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col px-4 py-2">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              className="py-3 text-[16px] font-[200] border-b border-gray-100"
              onClick={onClose}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* User Actions */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center w-full py-3 text-[16px] font-[200]"
            onClick={() => {
              navigate("/cart");
              onClose();
            }}
          >
            <FiShoppingCart className="text-[18px] mr-3" />
            Cart
            {!!cartItems?.length && (
              <span className="ml-2 bg-black text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          <button
            className="flex items-center w-full py-3 text-[16px] font-[200]"
            onClick={handleProfileClick}
          >
            <FaRegCircleUser className="text-[18px] mr-3" />
            {token ? "Profile" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
