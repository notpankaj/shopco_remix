import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { Api_Product } from "~/api/product";
import Footer from "~/components/app-components/Footer";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import SimiliarProducts from "~/components/app-components/SimilarProducts";
import { Product } from "~/types/Product";
import { getDiscountedPrice } from "~/utils/price_discount";
import { price_formater } from "~/utils/price_formater";
import { FaCheck, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import {
  addItemToCart,
  CartItemObj,
  getCartItem,
  removeItemInCart,
} from "~/store/feature/cart/cartSlice";
import toast from "react-hot-toast";

const AllReviews = () => {
  return (
    <div className=" mt-[-20px] max-w-[1250px] mx-auto  ">
      <div className="py-[20px] flex items-center max-w-[610px] mx-auto xl:max-w-[100%]">
        <h6 className="font-medium  ">All Reviews</h6>
        <span className="text-[#00000060] text-[10px] ml-[10px]">{`(456)`}</span>
      </div>
      <div className="flex flex-wrap gap-[20px] items-center justify-center">
        {new Array(10).fill(null).map((_, index) => {
          return (
            <div
              key={index}
              className="h-[240px] w-[610px] border-1 border-gray-300 px-[20px] py-[30px] rounded-[20px] flex flex-col"
            >
              <div className="flex gap-[4px]">
                {new Array(5).fill(null).map((_, key) => (
                  <FaStar key={key} className="text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-[15px] mt-[10px]">
                <span className="font-semibold text-[16px]">Rd. Sharma</span>
                <FaCheckCircle className="text-green-600 mb-[1px]" />
              </div>
              <p className="text-[12px] opacity-60 mt-[10px] flex-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                quae veniam. Illum, natus cumque officiis ipsam eveniet eum
                voluptates delectus culpa quia debitis placeat doloribus
                pariatur qui dolore sed odio!
              </p>

              <p className="text-gray-600 text-[12px] font-medium ">
                Posted on August 16, 2023
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type Params = { productId: string };

const Products = () => {
  const { productId } = useParams() as Params;
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const [product, setProduct] = useState<Product | any>(null);
  const [loading, setLoading] = useState(false);
  const [activeVariant, setActiveVariant] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [synCartVarient, setSynCartVarient] = useState<null | CartItemObj>(
    null
  );

  const allVariants = product?.variants;
  const price = price_formater(activeVariant?.price);
  const discountPrice = price_formater(
    getDiscountedPrice(activeVariant?.price, 20)
  );

  const onVariantChange = (newVariant: any) => {
    setSelectedSize(null);
    setActiveVariant(newVariant);
  };

  const syncCartItem = () => {
    const itemInCart = getCartItem(cartItems, productId, activeVariant?._id);
    setSynCartVarient(itemInCart);
  };

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const { data } = await Api_Product.getProductById(productId);
      setProduct(data);
      onVariantChange(data?.variants[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementAction = () => {
    console.log("ADD-->");
    toast("Item pushed to Cart! 🥰", { duration: 500 });
    dispatch(
      addItemToCart({
        product,
        product_id: product?._id,
        variant_id: activeVariant?._id,
      })
    );
  };
  const handleDecrementAction = () => {
    console.log("REMOVE-->");
    toast("Item removed from Cart! 😞", { duration: 500 });
    dispatch(
      removeItemInCart({
        product,
        product_id: product?._id,
        variant_id: activeVariant?._id,
      })
    );
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  useEffect(() => {
    syncCartItem();
  }, [cartItems, activeVariant]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="flex gap-[5%] mx-[5%] mt-[30px] sm:mt-[50px]  flex-col lg:flex-row items-center">
        <div className="flex-1  gap-[20px] max-w-[600px] flex flex-col-reverse w-[100%] sm:w-auto sm:flex-row">
          <div className="flex justify-between flex-row gap-[20px] sm:flex-col sm:gap-0 ">
            <article className="sm:w-[159px] h-[122px] sm:h-[162px] bg-[grey] rounded-[20px]  overflow-hidden flex-1 sm:flex-none ">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={activeVariant?.photos[1]}
              />
            </article>
            <article className="sm:w-[159px] h-[122px] sm:h-[162px] bg-[grey] rounded-[20px]  overflow-hidden flex-1 sm:flex-none ">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={activeVariant?.photos[2]}
              />
            </article>
            <article className="sm:w-[159px] h-[122px] sm:h-[162px] bg-[grey] rounded-[20px]  overflow-hidden flex-1 sm:flex-none ">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={activeVariant?.photos[0]}
              />
            </article>
          </div>
          <article className="w-[100%] sm:w-[444px] h-[400px] sm:h-[530px] bg-[grey] rounded-[20px] overflow-hidden">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={activeVariant?.photos[0]}
            />
          </article>
        </div>
        <div className="flex-1 ">
          <section className="max-w-[600px]">
            <h5 className="heading text-[40px] mt-[10px]">{product?.name}</h5>

            <div className="info border-gray-200 border-b-t border-b pb-[20px] mt-[10px]">
              <div className="flex items-center gap-[10px]">
                <p className="text-[16px] font-medium">$ {price}</p>
                {price && (
                  <p className="text-[16px] font-medium opacity-40">
                    $ {discountPrice}
                  </p>
                )}
                {price && (
                  <span className="text-[10px] font-medium text-red-600 bg-red-100 px-[10px] py-[5px] rounded-[62px]">
                    -20%
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-[12px] mt-[10px]">
                {product?.description}
                <br />
                <i className="text-xl"> {activeVariant?._id}</i>
              </p>
            </div>

            <div className="select_color border-gray-200 border-b-t border-b pb-[20px] mt-[10px]">
              <span className="text-[14px] text-gray-500 font-light">
                Select Colors
              </span>
              <div className="my-[5px] flex ">
                {allVariants?.map((variant: any, key: number) => {
                  const colorObj = variant?.color;
                  const isActive = variant?._id === activeVariant?._id;
                  if (!colorObj) return;
                  return (
                    <button
                      key={key}
                      onClick={() => onVariantChange(variant)}
                      style={{ background: colorObj?.secondary }}
                      className={`cursor-pointer w-[37px] h-[37px] rounded-full mr-[10px]  flex items-center justify-center`}
                    >
                      {isActive && (
                        <FaCheck className="text-white text-center text-[15px]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="select_size border-gray-200 border-b-t border-b  pb-[20px] mt-[10px] ">
              <span className="text-[14px] text-gray-500 font-light">
                Choose Size
              </span>
              <div className="my-[5px] mt-[10px]">
                {activeVariant?.size?.map((item: any, key: number) => {
                  const isActive = item?._id === selectedSize?._id;
                  return (
                    <button
                      onClick={() => setSelectedSize(item)}
                      key={key}
                      className={`cursor-pointer mr-[10px] text-[12px] font-light px-[15px] py-[5px] rounded-[62px] ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-[#00000010]  text-gray-600"
                      }`}
                    >
                      {item?.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card_btns border-gray-200  pb-[20px] mt-[10px] flex flex-row items-center gap-[20px]">
              <div className="my-[5px] bg-[#00000010] rounded-[62px] h-[45px] flex">
                <button
                  onClick={handleIncrementAction}
                  className="cursor-pointer  text-[12px] font-light px-[15px] py-[5px] rounded-[62px]  text-gray-600"
                >
                  <FaPlus />
                </button>
                <button className="cursor-pointer   text-[15px] font-semibold px-[15px] py-[5px] rounded-[62px]   text-gray-600">
                  {synCartVarient?.qty || 0}
                </button>
                <button
                  onClick={handleDecrementAction}
                  className="cursor-pointer   text-[12px] font-light px-[15px] py-[5px] rounded-[62px]   text-gray-600"
                >
                  <FaMinus />
                </button>
              </div>
              <button
                onClick={handleIncrementAction}
                className="cursor-pointer mr-[10px] text-[12px] font-light h-[45px] rounded-[62px] bg-black text-white flex items-center justify-center flex-1"
              >
                Add to Cart
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="h-[1px] bg-gray-200 w-full my-[50px]" />
      <AllReviews />
      <SimiliarProducts />
      <Footer />
    </div>
  );
};

export default Products;
