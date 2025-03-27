import { useNavigate } from "@remix-run/react";

const ProductCard = () => {
  const naviagte = useNavigate();
  return (
    <div className="" onClick={() => naviagte("/product/123")}>
      <div className="w-[298px] h-[298px] bg-[#F0EEED] rounded-[20px]"></div>
      <div className=" mt-[15px] ml-[6px]">
        <span className="text-[16px] font-medium">
          T-shirt with Tape Details
        </span>
        <div className="mt-[5px] ">
          <div></div>
          <span className="text-[14px] mt-[10px]">4.5/5</span>
        </div>
        <div className="mt-[5px] ">
          <span className="text-[14px] ">$120</span>
          <span className="text-[14px] mt-[10px]">$260</span>
          <span className="text-[14px] mt-[10px]">-20%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
