import Footer from "~/components/app-components/Footer";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import Line from "~/components/util-components/Line";
import { GrFormNextLink } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import {
  addItemToCart,
  CartItemObj,
  deleteCartItem,
  removeItemInCart,
} from "~/store/feature/cart/cartSlice";
import { useEffect, useState } from "react";

const CartItem = ({
  hideLine = false,
  item,
}: {
  hideLine?: boolean;
  item: CartItemObj;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedVarient, setSelectedVarient] = useState<any>(null);
  useEffect(() => {
    setSelectedVarient(
      item?.product?.variants?.find((v: any) => v?._id === item?.variant_id)
    );
  }, [item]);

  const handleIncrementAction = () => {
    console.log("ADD-->");
    dispatch(
      addItemToCart({
        product: item?.product,
        product_id: item?.product_id,
        variant_id: item?.variant_id,
      })
    );
  };
  const handleDecrementAction = () => {
    console.log("REMOVE-->");
    dispatch(
      removeItemInCart({
        product: item?.product,
        product_id: item?.product_id,
        variant_id: item?.variant_id,
      })
    );
  };

  const handleDeleteAction = () => {
    dispatch(
      deleteCartItem({
        product_id: item?.product_id,
        variant_id: item?.variant_id,
      })
    );
  };

  return (
    <div>
      <article className="flex gap-[20px] mb-[10px]">
        <div className="w-[124px] h-[124px] rounded-[8px] bg-[var(--bg-secondary)] overflow-hidden">
          <img
            src={selectedVarient?.photos[0]}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-[16px] font-semibold ">{item?.product?.name}</p>
            <p className="text-[12px]">
              Size: <span className="font-light opacity-[0.7]">Large</span>
            </p>
            <p className="text-[12px]">
              Color: <span className="font-light opacity-[0.7]">white</span>
            </p>
          </div>
          <p className="text-[14px] font-medium mb-[15px]">
            $ {selectedVarient?.price}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between mb-[10px]">
          <button className="mr-[10px] mt-[5px]" onClick={handleDeleteAction}>
            <RiDeleteBin2Fill color="red" size={18} className="opacity-[0.8]" />
          </button>
          <div className="flex bg-[var(--bg-secondary)] px-[20px] h-[40px] items-center gap-[20px] rounded-[62px]">
            <button onClick={handleIncrementAction} className="text-[14px]">
              +
            </button>
            <span className="text-[14px] select-none">{item?.qty}</span>
            <button onClick={handleDecrementAction} className="text-[14px]">
              -
            </button>
          </div>
        </div>
      </article>
      {hideLine || <Line classNames=" mb-[10px]" />}
    </div>
  );
};

const Index = () => {
  const cartItems = useSelector((s: RootState) => s.cart.items);
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="mx-[5%] mt-[50px]">
        <h2 className="heading text-[45px]">Your Cart</h2>
        <div className="flex gap-[20px] items-start relative flex-col sm:flex-row">
          <section className="max-[700px] flex-1  border border-[#00000010] rounded-[20px] p-[20px]">
            {cartItems?.map((item, key) => {
              return (
                <CartItem
                  item={item}
                  key={key}
                  hideLine={cartItems.length - 1 === key}
                />
              );
            })}
          </section>
          <section className="sticky top-[20px] max-w-[500px] flex-1 border border-[#00000010] rounded-[20px] p-[20px]">
            <h5 className="text-[16px] font-medium">Order Summary</h5>

            <div className="flex flex-col gap-[10px] mt-[20px]">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-[#00000070] font-light">
                  Subtotal
                </span>
                <span className="text-[12px]">$565</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-[#00000070] font-light">
                  Discount (-20%)
                </span>
                <span className="text-[12px] text-red-400">-$113</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-[#00000070] font-light">
                  Delivery Fee
                </span>
                <span className="text-[12px]">$15</span>
              </div>
              <Line />
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-[#00000070] font-light">
                  Total
                </span>
                <span className="text-[12px]">$467</span>
              </div>
            </div>

            <button className="text-white text-[12px] h-[40px] px-[20px] bg-black rounded-[62px] flex items-center justify-center gap-[10px] w-[100%] mt-[15px]">
              Go to Checkout <GrFormNextLink color="white" size={22} />
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
