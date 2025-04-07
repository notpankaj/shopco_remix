"use client";
import { RiListSettingsLine } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import App_RangeSlider from "~/components/util-components/Inputs/AppPriceRange";
import { FaAngleUp } from "react-icons/fa";
import Line from "../Line";
import { useMemo, useState } from "react";
import withSuspense from "~/hooks/withSuspense";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import {
  resetFilters,
  SelectedFilterType,
  setFilters,
} from "~/store/feature/product/productSlice";
import { MAX_PRODUCT_PRICE } from "~/constant";

interface OpenState {
  price: boolean;
  color: boolean;
  size: boolean;
  dressStyle: boolean;
}

const FilterSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appFilters = useSelector((s: RootState) => s.app);
  const selectedFilters = useSelector((s: RootState) => s.product.filter);
  const [openState, setOpenState] = useState<OpenState>({
    price: true,
    color: true,
    size: true,
    dressStyle: true,
  });

  const isResetVisible = useMemo(() => {
    return Object.values(selectedFilters).reduce((acc, curr) => {
      if (acc) return true;
      if (curr === 0 || curr === MAX_PRODUCT_PRICE) return acc;
      if (curr) {
        return true;
      }
      return false;
    }, false);
  }, [selectedFilters]);

  const toggeleOpenState = (key: keyof OpenState) => {
    setOpenState({ ...openState, [key]: !openState[key] });
  };

  const onFilterSelect = (newFilter: SelectedFilterType) => {
    dispatch(setFilters(newFilter));
  };

  const onResetFilters = () => dispatch(resetFilters());

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
        {appFilters?.categories?.map((item) => {
          const isActive = item?._id === selectedFilters?.category;
          return (
            <div
              key={item?._id}
              onClick={() =>
                onFilterSelect({ ...selectedFilters, category: item?._id })
              }
              className={`flex items-center  justify-between mb-[7px] ${
                isActive ? "text-white bg-black" : ""
              }`}
            >
              <h6 className="text-[15px] font-light opacity-70">
                {item?.name}
              </h6>
              <button>
                <GoChevronRight className="text-[18px]  opacity-70" />
              </button>
            </div>
          );
        })}
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
            <App_RangeSlider
              price={[selectedFilters.priceMin!, selectedFilters.priceMax!]}
              setPrice={(val) => {
                console.log(val);
                onFilterSelect({
                  ...selectedFilters,
                  priceMin: val[0],
                  priceMax: val[1],
                });
              }}
            />
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
            {appFilters?.colors?.map((color) => {
              const isActive = color?._id === selectedFilters?.color;
              return (
                <button
                  onClick={() =>
                    onFilterSelect({ ...selectedFilters, color: color._id })
                  }
                  key={color?._id}
                  className={`w-[37px] h-[37px] rounded-[37px]  ${
                    isActive
                      ? "border-[4px] border-[#000]"
                      : "border-gray-300 border"
                  }`}
                  style={{
                    background: color?.code,
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
            {appFilters?.sizes?.map((item) => {
              const isActive = selectedFilters.size === item?._id;
              return (
                <button
                  onClick={() =>
                    onFilterSelect({ ...selectedFilters, size: item?._id })
                  }
                  key={item?._id}
                  className={`text-[12px] text-[#00000060] bg-[#F0F0F0] px-[15px] py-[10px] rounded-[20px] ${
                    isActive ? "text-white bg-black" : ""
                  }`}
                >
                  {item?.name}
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
            {appFilters?.dressStyle.map((item) => {
              const isActive = selectedFilters?.dressStyle === item?._id;
              return (
                <div
                  onClick={() =>
                    onFilterSelect({
                      ...selectedFilters,
                      dressStyle: item?._id,
                    })
                  }
                  key={item?._id}
                  className={`flex items-end  justify-between mb-[7px] ${
                    isActive ? "text-white bg-black" : ""
                  }`}
                >
                  <h6 className={`text-[15px] font-light opacity-70 `}>
                    {item?.name}
                  </h6>
                  <button>
                    <GoChevronRight className="text-[18px]  opacity-70" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {isResetVisible && (
        <button
          onClick={onResetFilters}
          className="bg-black h-[50px] flex items-center justify-center w-[100%] mt-[50px] mb-[-10px] rounded-[62px] text-white text-[18px]"
        >
          Reset
        </button>
      )}
    </section>
  );
};

export default withSuspense(FilterSection);

const styles = {
  arrowDown: { rotate: "-180deg" },
};
