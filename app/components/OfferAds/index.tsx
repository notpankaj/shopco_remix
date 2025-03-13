import { useState } from "react";
import { IoClose } from "react-icons/io5";
const OfferAds = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isLoggedIn = false;

  const onClose = () => setIsVisible(false);
  if (!isVisible) {
    return null;
  }
  return (
    <div className="bg-black h-[30px] flex items-center justify-center relative">
      <div className="flex gap-[5px] items-center justify-center">
        <p className="text-[8px] md:text-[10px] text-white">
          Sign up and get 20% off to your first order.
        </p>
        {isLoggedIn || (
          <p className="text-[10px] md:text-[12px] text-white underline">
            Sign Up Now
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="hidden md:block w-[30px] h-[30px]  absolute right-[15%] flex items-center justify-center cursor-pointer"
      >
        <IoClose color="white" className="text-center ml-[4px]" size={20} />
      </button>
    </div>
  );
};

export default OfferAds;
