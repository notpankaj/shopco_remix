import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./index.css";
import withSuspense from "~/hooks/withSuspense";
import { price_formater } from "~/utils/price_formater";
import { useEffect, useRef, useState } from "react";

interface Props {
  price: [number, number];
  setPrice: (value: [number, number]) => void;
}

const App_RangeSlider = ({ price, setPrice }: Props) => {
  const [innerPrice, setInnerPrice] = useState(price);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePriceChange = (newValue: [number, number]) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setPrice(newValue);
    }, 1000);
  };

  useEffect(() => {
    handlePriceChange(innerPrice);
  }, [innerPrice]);

  return (
    <>
      <RangeSlider
        id="price_range"
        className="mt-[15px]"
        step={100}
        min={150}
        max={99999}
        value={innerPrice}
        onInput={setInnerPrice}
      />
      <div className="flex items-center justify-center gap-[30px] mt-[20px]">
        <div>
          <span>Min: </span>
          <span>
            {"$ "}
            {price_formater(price[0])}
          </span>
        </div>
        <div>
          <span>Max: </span>
          <span>
            {"$ "}
            {price_formater(price[1])}
          </span>
        </div>
      </div>
    </>
  );
};

export default withSuspense(App_RangeSlider);
