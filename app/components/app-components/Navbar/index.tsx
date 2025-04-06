import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import { updateFilters } from "~/store/feature/product/productSlice";

const Navbar = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((s: RootState) => s.auth.token);
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const selectedFilters = useSelector((s: RootState) => s.product.filter);
  const [searchString, setSearchString] = useState(selectedFilters?.search);

  const onProfileClick = () => {
    if (token) {
      naviagte("/profile");
    } else {
      naviagte("/auth/login");
    }
  };

  // useEffect(() => {

  // }, [searchString]);

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
        <div className="relative bg-[#F0F0F0] flex-[0.8] max-w-[350px] mr-[20px] hidden md:flex px-[20px] py-[10px] rounded-[62px]  gap-[5px] items-center">
          <IoSearch className="text-[18px] opacity-[0.4]" />
          <input
            value={searchString}
            onChange={(e) => {
              const value = e.target.value;
              setSearchString(value);
            }}
            placeholder="Search for project"
            className="text-[14px] flex-1 outline-none text-[rgba(0,0,0,0.6)]"
          />
          {searchString?.length ? (
            <div className="w-[90%]  bg-white absolute z-1 top-[50px] shadow-lg px-[20px] overflow-hidden">
              <div className="overflow-y-scroll max-h-[200px]">
                {[1, 3, 4].map((_, idx) => {
                  return (
                    <div
                      key={idx}
                      className="h-[80px] overflow-hidden flex items-center gap-[20px]"
                    >
                      <div className="bg-amber-100 w-[80px] h-[70px]"></div>
                      <span className="text-[12px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  naviagte(`/search?search=${searchString}`);
                  setSearchString("");
                  dispatch(updateFilters({ search: searchString }));
                }}
                className=" py-[10px] text-gray-500 text-[14px] flex items-center justify-center gap-[10px] hover:text-black"
              >
                <IoSearch className="text-[18px] opacity-[0.4]" />
                {searchString}
              </button>
            </div>
          ) : null}
        </div>
        <button className="w-[30px] h-[30px] cursor-pointer md:hidden">
          <IoSearch className="text-[18px]" />
        </button>
        <button
          className="w-[30px] h-[30px] cursor-pointer relative mr-[10px]"
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
    </nav>
  );
};

export default Navbar;
