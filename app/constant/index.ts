import EventEmitter from "eventemitter3";
export const LOCAL_KEYS = {
  token: "TOKEN",
  user: "USER",
  cart: "CART",
};

export const MAX_PRODUCT_PRICE = 10000;
export const STRIPE_PK =
  "pk_test_51J9mGdSFABbG4PeFGYelq6UpmBLWVRvMjFF9jtBz6czX3QcsegBaqIXY287HeEY0KB6ZRrKzbsG0QnEsyuDxy8Md007TIg3sOr";

const APP_URL = "http://localhost:5173";
export const STRIPE_SUCCESS_URL = `${APP_URL}/checkout/success`;
export const STRIPE_CANCEL_URL = `${APP_URL}/checkout/cancel`;

export const EE = new EventEmitter();

export const EE_EVENTS = { RESET_MAX_PRICE: "RESET_MAX_PRICE" };
