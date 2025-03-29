import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_KEYS } from "~/constant";
import { AppDispatch, RootState } from "~/store";
import { setCart } from "~/store/feature/cart/cartSlice";

const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const timerRef = useRef<NodeJS.Timeout>();

  const syncCart = () => {
    // console.log("CART::", cartItems);
    localStorage.setItem(LOCAL_KEYS.cart, JSON.stringify(cartItems));
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      syncCart();
    }, 1000);
  }, [cartItems]);

  useEffect(() => {
    let localCart: any = localStorage.getItem(LOCAL_KEYS.cart);
    if (!localCart) return;
    localCart = JSON.parse(localCart);
    if (localCart?.length) {
      dispatch(setCart(localCart));
    }
  }, []);

  return undefined;
};

export default useCartSync;
