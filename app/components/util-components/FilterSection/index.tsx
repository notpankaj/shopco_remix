import { RiListSettingsLine } from "react-icons/ri";
import { GoChevronRight, GoChevronUp } from "react-icons/go";
import Line from "../Line";
const FilterSection = () => {
  return (
    <section className="border border-[#00000010] rounded-[20px] h-full px-[20px] pt-[15px]">
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
          <button>
            <GoChevronUp className="text-[18px]  opacity-70 " />
          </button>
        </div>
        <div></div>
      </section>
      <Line classNames="my-[20px]" />
      {/* Colors */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Colors</h4>
          <button>
            <GoChevronUp className="text-[18px]  opacity-70 " />
          </button>
        </div>
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
      </section>
      <Line classNames="my-[20px]" />
      {/* Size */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Size</h4>
          <button>
            <GoChevronUp className="text-[18px]  opacity-70 " />
          </button>
        </div>
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
      </section>
      <Line classNames="my-[20px]" />
      {/* Style */}
      <section>
        <div className="flex items-center justify-between ">
          <h4 className="mb-[15px] font-medium">Dress Style</h4>
          <button>
            <GoChevronUp className="text-[18px]  opacity-70" />
          </button>
        </div>
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
      </section>
    </section>
  );
};

export default FilterSection;
