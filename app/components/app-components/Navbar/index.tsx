import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import MobileSidebar from "./MobileSidebar";
import SearchBar from "../SearchBar";

export const useMobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSideBar = () => {
    setIsOpen(true);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };

  return { isOpen, openSideBar, closeSideBar };
};

const Navbar = () => {
  const naviagte = useNavigate();
  const token = useSelector((s: RootState) => s.auth.token);
  const cartItems = useSelector((s: RootState) => s.cart.items);

  const { isOpen, closeSideBar, openSideBar } = useMobileSideBar();

  const onProfileClick = () => {
    if (token) {
      naviagte("/profile");
    } else {
      naviagte("/auth/login");
    }
  };

  return (
    <>
      <MobileSidebar isOpen={isOpen} onClose={closeSideBar} />
      <nav className="mx-[4%] my-[10px] flex flex-1  flex-col">
        <div className="flex items-center justify-between ">
          {/* start */}
          <div className="flex gap-[5px] items-center justify-center">
            <button
              className="w-[30px] h-[30px] cursor-pointer md:hidden"
              onClick={openSideBar}
            >
              <IoMenu className="text-[28px] mb-[1px]" />
            </button>
            <span
              className="heading text-[1.5rem] md:text-[2rem] cursor-pointer"
              onClick={() => naviagte("/")}
            >
              SHOP.CO
            </span>

            <div className="ml-[20px] gap-[10px] hidden md:flex">
              {[
                {
                  title: "Shop",
                },
                {
                  title: "On Sales",
                },
                {
                  title: "New Arrivals",
                },
                {
                  title: "Brands",
                },
              ].map((link, key) => {
                return (
                  <a href="#" key={key}>
                    <span className="font-[200] text-[14px] xl:text-[16px] 2xl:text-[18px]">
                      {link.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          {/* end */}
          <div className="flex gap-[5px] items-center justify-end flex-1  ">
            <div className="hidden md:flex  ">
              <SearchBar />
            </div>
            <button
              className={`w-[30px] h-[30px] cursor-pointer relative  ${
                !!cartItems?.length ? "mr-[10px]" : ""
              }`}
              onClick={() => naviagte("/cart")}
            >
              {!!cartItems?.length && (
                <div className="w-[20px] h-[20px] bg-black rounded-[20px] flex items-center justify-center absolute top-[-10px] right-[-5px]">
                  <span className="text-white  text-[9px] font-semibold">
                    {cartItems?.length}
                  </span>
                </div>
              )}
              <FiShoppingCart className="text-[18px]" />
            </button>
            <button
              className={` h-[30px] cursor-pointer ${token ? "w-[30px]" : ""}`}
              onClick={onProfileClick}
            >
              {token ? (
                <FaRegCircleUser className="text-[18px]" />
              ) : (
                <span className="heading text-[22px]">Login</span>
              )}
            </button>
          </div>
        </div>

        <div className="py-[5px] mt-[5px] md:hidden">
          <SearchBar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
