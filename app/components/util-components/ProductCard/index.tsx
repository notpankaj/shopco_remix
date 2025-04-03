import { useNavigate } from "@remix-run/react";
import { getDiscountedPrice } from "~/utils/price_discount";
import { price_formater } from "~/utils/price_formater";

const ProductCard = ({ product }: any) => {
  const naviagte = useNavigate();
  const variantOne = product?.variants[0] || {};
  const price = price_formater(variantOne?.price);

  const discountPrice = price_formater(
    getDiscountedPrice(variantOne?.price, 20)
  );

  return (
    <div className="" onClick={() => naviagte("/product/" + product?._id)}>
      <div className="w-[298px] h-[298px] bg-[#F0EEED] rounded-[20px] overflow-hidden">
        <img
          src={product?.variants[0]?.photos[0]}
          className="w-[100%] h-[100%] object-cover pointer-events-none"
        />
      </div>
      <div className=" mt-[15px] ml-[6px]">
        <span className="text-[16px] font-medium">{product?.name}</span>
        <div className="mt-[5px] ">
          <div></div>
          <span className="text-[14px] mt-[10px]">4.5/5</span>
        </div>
        <div className="mt-[5px] flex items-center ">
          <span className="inline-block text-[14px] md:text-[20px] md:font-medium">
            ${price || "0.00"}
          </span>
          {price && (
            <span className="inline-block text-[14px] md:text-[20px] md:font-medium opacity-50 ml-[10px]">
              $ {discountPrice}
            </span>
          )}
          {price && (
            <span className="block text-[14px] bg-[#FF333310]  text-[#FF3333] px-[10px] py-[5px] rounded-[62px] ml-[15px]">
              -20%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
