import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <div className="relative flex bg-[#F0F0F0] min-w-[300px]  mr-[20px] px-[20px] py-[10px] rounded-[62px]  gap-[5px] items-center">
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
              //   naviagte(`/search?search=${searchString}`);
              //   setSearchString("");
              //   dispatch(updateFilters({ search: searchString }));
            }}
            className=" py-[10px] text-gray-500 text-[14px] flex items-center justify-center gap-[10px] hover:text-black"
          >
            <IoSearch className="text-[18px] opacity-[0.4]" />
            {searchString}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
