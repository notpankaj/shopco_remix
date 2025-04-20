import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./index.css";
import withSuspense from "~/hooks/withSuspense";
import { price_formater } from "~/utils/price_formater";
import { useEffect, useRef, useState } from "react";
import { EE, EE_EVENTS, MAX_PRODUCT_PRICE } from "~/constant";
import { data } from "@remix-run/react";

interface Props {
  price: number;
  setPrice: (value: number) => void;
}

const App_RangeSlider = ({ price, setPrice }: Props) => {
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePriceChange = (newValue: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setPrice(newValue);
    }, 1000);
  };

  useEffect(() => {
    handlePriceChange(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    EE.on(EE_EVENTS.RESET_MAX_PRICE, () => {
      setMaxPrice(0);
    });
    return () => {
      EE.removeListener(EE_EVENTS.RESET_MAX_PRICE);
    };
  }, []);

  return (
    <>
      <RangeSlider
        id="price_range"
        className="mt-[15px]"
        step={5}
        min={0}
        max={MAX_PRODUCT_PRICE}
        value={[0, maxPrice]}
        onInput={(data) => {
          setMaxPrice(data[1]);
        }}
      />
      {maxPrice > 4 && (
        <div className="flex items-center justify-center gap-[30px] mt-[20px]">
          <div>
            <span>Price Range: </span>
            <span>
              {"$ "}
              {price_formater(maxPrice)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default withSuspense(App_RangeSlider);
