import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

const L0 = "🎉 Sign Up & Get 20% OFF on Your First Order  🛍️✨";
const L1 = "🔥 Mega Sale! Flat 20% OFF on All Products – Shop Now! 🛍️🎉";

const OfferAds = () => {
  const naviagte = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const isLoggedIn = !!useSelector((s: RootState) => s.auth.token);

  const onClose = () => setIsVisible(false);
  if (!isVisible) {
    return null;
  }
  return (
    <div className="bg-black h-[30px] flex items-center justify-center relative">
      <div className="flex gap-[5px] items-center justify-center">
        <p className="text-[8px] md:text-[10px] text-white">
          {isLoggedIn ? L1 : L0}
        </p>
        {isLoggedIn || (
          <button onClick={() => naviagte("/auth/login")}>
            <p className="text-[10px] md:text-[12px] text-white underline">
              Join Now
            </p>
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="md:block w-[30px] h-[30px]  absolute right-[15%] flex items-center justify-center cursor-pointer"
      >
        <IoClose color="white" className="text-center ml-[4px]" size={20} />
      </button>
    </div>
  );
};

export default OfferAds;
