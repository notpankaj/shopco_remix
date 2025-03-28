"use client";
import { RiListSettingsLine } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import App_RangeSlider from "~/components/util-components/Inputs/AppPriceRange";
import { FaAngleUp } from "react-icons/fa";
import Line from "../Line";
import { useState } from "react";
import withSuspense from "~/hooks/withSuspense";

interface OpenState {
  price: boolean;
  color: boolean;
  size: boolean;
  dressStyle: boolean;
}

const FilterSection = () => {
  const [price, setPrice] = useState<[number, number]>([10, 10000]);
  const [openState, setOpenState] = useState<OpenState>({
    price: true,
    color: true,
    size: true,
    dressStyle: true,
  });

  const toggeleOpenState = (key: keyof OpenState) => {
    setOpenState({ ...openState, [key]: !openState[key] });
  };

  return (
    <section className="border border-[#00000010] rounded-[20px]    px-[20px] pt-[15px] pb-[40px]">
      <div className="flex items-center  justify-between ">
        <h6 className="text-[20px] font-medium">Filters</h6>
        <button>
          <RiListSettingsLine className="text-[22px]" />
        </button>
      </div>
      <Line classNames="my-[15px]" />
      {/* Category */}
      <section>
        {["T-Shirt", "Shorts", "Shirt", "Hoodie", "Jeans"].map((item) => (
          <div
            key={item}
            className="flex items-center  justify-between mb-[7px]"
          >
            <h6 className="text-[15px] font-light opacity-70">{item}</h6>
            <button>
              <GoChevronRight className="text-[18px]  opacity-70" />
            </button>
          </div>
        ))}
      </section>
      <Line classNames="my-[20px]" />
      {/* Price */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Price</h4>
          <button onClick={() => toggeleOpenState("price")}>
            <FaAngleUp
              className="text-[18px]  opacity-70 "
              style={openState.price ? styles.arrowDown : {}}
            />
          </button>
        </div>
        {openState.price && (
          <div>
            <App_RangeSlider price={price} setPrice={setPrice} />
          </div>
        )}
      </section>
      <Line classNames="my-[20px]" />
      {/* Colors */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Colors</h4>
          <button onClick={() => toggeleOpenState("color")}>
            <FaAngleUp
              className="text-[18px]  opacity-70 "
              style={openState.color ? styles.arrowDown : {}}
            />
          </button>
        </div>
        {openState.color && (
          <div className="flex items-center gap-[10px] flex-wrap mb">
            {[
              "green",
              "red",
              "yellow",
              "pink",
              "orange",
              "skyblue",
              "blue",
              "purple",
              "white",
              "black",
            ].map((color) => {
              return (
                <button
                  key={color}
                  className="w-[37px] h-[37px] rounded-[37px] border-gray-300 border"
                  style={{
                    background: color,
                  }}
                />
              );
            })}
          </div>
        )}
      </section>
      <Line classNames="my-[20px]" />
      {/* Size */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Size</h4>
          <button onClick={() => toggeleOpenState("size")}>
            <FaAngleUp
              className="text-[18px]  opacity-70 "
              style={openState.size ? styles.arrowDown : {}}
            />
          </button>
        </div>
        {openState.size && (
          <div className="flex items-center gap-[10px] flex-wrap mb">
            {[
              "XX-Small",
              "X-Small",
              "Small",
              "Medium",
              "Large",
              "X-Large",
              "XX-Large",
              "3X-Large",
              "4X-Large",
            ].map((item) => {
              return (
                <button className="text-[12px] text-[#00000060] bg-[#F0F0F0] px-[15px] py-[10px] rounded-[20px]">
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </section>
      <Line classNames="my-[20px]" />
      {/* Style */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Dress Style</h4>
          <button onClick={() => toggeleOpenState("dressStyle")}>
            <FaAngleUp
              className="text-[18px]  opacity-70"
              style={openState.dressStyle ? styles.arrowDown : {}}
            />
          </button>
        </div>
        {openState.dressStyle && (
          <div>
            {["Casual", "Formal", "Party", "Gym"].map((item) => (
              <div
                key={item}
                className="flex items-end  justify-between mb-[7px]"
              >
                <h6 className="text-[15px] font-light opacity-70">{item}</h6>
                <button>
                  <GoChevronRight className="text-[18px]  opacity-70" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default withSuspense(FilterSection);

const styles = {
  arrowDown: { rotate: "-180deg" },
};
