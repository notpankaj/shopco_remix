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
import { useEffect, useMemo, useState } from "react";
import { getDiscountedPrice } from "~/utils/price_discount";
import { price_formater } from "~/utils/price_formater";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_CANCEL_URL, STRIPE_PK, STRIPE_SUCCESS_URL } from "~/constant";
import { BASE_URL } from "~/api";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "@remix-run/react";
import { makeAddressString } from "~/utils/makeAddressString";
import { Field } from "formik";

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
            $ {price_formater(selectedVarient?.price)}
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

const DELVERY_FEE = 15;
const Index = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const token = useSelector((s: RootState) => s.auth.token);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState({
    loading: false,
    data: [],
  });
  const memoValue = useMemo(() => {
    return cartItems.reduce(
      (acc, curr) => {
        const variant_id = curr?.variant_id;
        const varient = curr?.product?.variants?.find(
          (item: any) => item?._id === variant_id
        );
        acc.total += varient.price * curr.qty;
        return acc;
      },
      { total: 0 }
    );
  }, [cartItems]);

  const onCheckout = async () => {
    if (!selectedAddress) {
      toast("Please Select Address!");
      return;
    }
    try {
      const stripe = await loadStripe(STRIPE_PK);
      const body = {
        products: cartItems,
        success_url: STRIPE_SUCCESS_URL(window.location.origin || ""),
        cancel_url: STRIPE_CANCEL_URL(window.location.origin || ""),
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(`${BASE_URL}/api/v1/stripe-checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const res = await response.json();
      const session = res?.data;

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      console.log(result, "stripe result");
      if (result?.error) {
        alert("fail");
      } else {
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddresses = async () => {
    try {
      setAddresses({ data: [], loading: true });
      const res = await axios.get(`${BASE_URL}/api/v1/address`, {
        headers: { Authorization: token },
      });
      console.log(res);
      if (res?.data?.data?.length) {
        setAddresses({ data: res?.data?.data, loading: false });
      } else {
        setAddresses({ data: [], loading: false });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setAddresses({ data: [], loading: false });
    }
  };
  useEffect(() => {
    if (!token) return;
    fetchAddresses();
  }, [token]);

  console.log(addresses, "addresses");

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="mx-[5%] mt-[50px]">
        <h2 className="heading text-[45px]">Your Cart</h2>
        <div className="flex gap-[20px] items-start relative flex-col lg:flex-row ">
          <section className=" flex-1  border border-[#00000010] rounded-[20px] p-[20px] mx-auto w-[100%] lg:w-auto">
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

          <section className="sticky top-[20px] w-[100%]  lg:max-w-[500px] ">
            {/* Address */}
            <section className="min-w-[400px] flex-1 border border-[#00000010] rounded-[20px] p-[20px] mx-auto w-[100%]">
              <h5 className="text-[16px] font-medium">Addresses</h5>
              {addresses?.loading ? (
                <span>Loading...</span>
              ) : addresses?.data?.length ? (
                <>
                  {addresses?.data?.map((addr: any, index: number) => {
                    const isFirstItem = index === 0;
                    const isSelected = selectedAddress === addr?._id;
                    return (
                      <div
                        key={addr?._id}
                        onClick={() => setSelectedAddress(addr?._id)}
                        className="flex flex-col gap-[10px] mt-[10px] cursor-pointer"
                      >
                        {isFirstItem || <Line />}

                        <div className="flex items-center gap-[5px] ">
                          <div
                            className={`w-[15px] h-[15px]  rounded-full flex items-center justify-center ${
                              isSelected
                                ? "border-blue-500 border-2"
                                : "border-gray-500 border-2"
                            } `}
                          >
                            {isSelected ? (
                              <div
                                className={`w-[8px] h-[8px] bg-blue-500 rounded-full`}
                              />
                            ) : null}
                          </div>
                          <span className="text-[12px] text-[#00000070] font-light">
                            {makeAddressString(addr)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <span className="text-gray-500 text-sm">
                    {" "}
                    No Address Added yet!
                  </span>
                </>
              )}
              {addresses?.data?.length ? (
                <></>
              ) : (
                <button
                  onClick={() => {
                    if (token) {
                      navigate("/address/create");
                    } else {
                      navigate("/auth/login");
                    }
                  }}
                  className="text-white text-[12px] h-[40px] px-[20px] bg-black rounded-[62px] flex items-center justify-center gap-[10px] w-[100%] mt-[15px]"
                >
                  <div className="flex items-center text-white hover:text-white my-6">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    ADD A NEW ADDRESS
                  </div>
                </button>
              )}
            </section>

            {/* Checkout */}
            <section className="mt-[20px] min-w-[400px] flex-1 border border-[#00000010] rounded-[20px] p-[20px] mx-auto w-[100%]">
              <h5 className="text-[16px] font-medium">Order Summary</h5>

              <div className="flex flex-col gap-[10px] mt-[20px]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-[#00000070] font-light">
                    Subtotal
                  </span>
                  <span className="text-[12px]">
                    $ {price_formater(memoValue?.total)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-[#00000070] font-light">
                    Discount (-20%)
                  </span>
                  <span className="text-[12px] text-red-400">
                    -${" "}
                    {price_formater(
                      Number(
                        (
                          memoValue.total -
                          getDiscountedPrice(memoValue?.total, 20)
                        ).toFixed(2)
                      )
                    )}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-[#00000070] font-light">
                    Delivery Fee
                  </span>
                  <span className="text-[12px]">${DELVERY_FEE}</span>
                </div>
                <Line />
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-[#00000070] font-light">
                    Total
                  </span>
                  <span className="text-[12px]">
                    ${" "}
                    {cartItems.length
                      ? price_formater(
                          Number(getDiscountedPrice(memoValue?.total, 20)) - 15
                        )
                      : 0}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="text-white text-[12px] h-[40px] px-[20px] bg-black rounded-[62px] flex items-center justify-center gap-[10px] w-[100%] mt-[15px]"
              >
                Go to Checkout <GrFormNextLink color="white" size={22} />
              </button>
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
