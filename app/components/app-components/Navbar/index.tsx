import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
const Navbar = () => {
  const naviagte = useNavigate();
  const [searchString, setSearchString] = useState("");

  return (
    <nav className="flex items-center justify-between mx-[4%] my-[5px] ">
      {/* start */}
      <div className="flex gap-[5px] items-center justify-center">
        <button className="w-[30px] h-[30px] cursor-pointer md:hidden">
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
      <div className="flex gap-[5px] items-center justify-end flex-1 ">
        <div className="bg-[#F0F0F0] flex-[0.8] max-w-[350px] mr-[20px] hidden md:flex px-[20px] py-[10px] rounded-[62px]  gap-[5px] items-center">
          <IoSearch className="text-[18px] opacity-[0.4]" />
          <input
            value={searchString}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 4) {
                naviagte("/search?name=1231");
              }
              setSearchString(value);
            }}
            placeholder="Search for project"
            className="text-[14px] flex-1 outline-none text-[rgba(0,0,0,0.6)]"
          />
        </div>
        <button className="w-[30px] h-[30px] cursor-pointer md:hidden">
          <IoSearch className="text-[18px]" />
        </button>
        <button
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={() => naviagte("/cart")}
        >
          <FiShoppingCart className="text-[18px]" />
        </button>
        <button
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={() => naviagte("/auth/login")}
        >
          <FaRegCircleUser className="text-[18px]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
