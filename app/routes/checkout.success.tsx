import { useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "~/store/feature/cart/cartSlice";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/");
  };
  useEffect(() => {
    // clear cart
    dispatch(clearCart());
  }, []);
  return (
    <div className="flex items-center justify-center min-h-[100vh] gap-[50px] flex-col">
      <h4 className="heading">Payment Success!</h4>
      <button
        onClick={onBack}
        className="bg-black text-2xl text-white px-[40px] py-[10px] rounded-md"
      >
        BACK
      </button>
    </div>
  );
};

export default Index;
