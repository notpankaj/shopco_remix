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
import { FaCheck } from "react-icons/fa";
const AllReviews = () => {
  return (
    <div className="mt-[50px] border-t border-t-gray-200">
      <div className="py-[20px] flex items-center">
        <h6 className="font-medium ">All Reviews</h6>
        <span className="text-[#00000060] text-[10px] ml-[10px]">{`(456)`}</span>
      </div>
      <div className="flex flex-wrap gap-[20px]">
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
  const [product, setProduct] = useState<Product | any>(null);
  const [loading, setLoading] = useState(false);
  const [activeVariant, setActiveVariant] = useState<any>(null);
  let [count, setCount] = useState(1);

  const allVariants = product?.variants;
  const price = price_formater(activeVariant?.price);
  const discountPrice = price_formater(
    getDiscountedPrice(activeVariant?.price, 20)
  );

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const { data } = await Api_Product.getProductById(productId);
      setProduct(data);
      setActiveVariant(data?.variants[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="mx-[5%] flex flex-col items-center justify-center">
        <div className="flex gap-[5%]  mt-[50px] ">
          <div className="flex-1 flex gap-[20px] max-w-[600px]">
            <div className="flex flex-col justify-between">
              <article className="w-[159px] h-[162px] bg-[grey] rounded-[20px]  overflow-hidden">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={activeVariant?.photos[1]}
                />
              </article>
              <article className="w-[159px] h-[162px] bg-[grey] rounded-[20px]  overflow-hidden">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={activeVariant?.photos[2]}
                />
              </article>
              <article className="w-[159px] h-[162px] bg-[grey] rounded-[20px]  overflow-hidden">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={activeVariant?.photos[0]}
                />
              </article>
            </div>
            <article className="w-[444px] h-[530px] bg-[grey] rounded-[20px] overflow-hidden">
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
                        onClick={() => {
                          setActiveVariant(variant);
                        }}
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
                  {[activeVariant?.size]?.map((item: any, key: number) => {
                    const isActive = item === "Large";
                    return (
                      <button
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
                    onClick={() => setCount(count++)}
                    className="cursor-pointer  text-[12px] font-light px-[15px] py-[5px] rounded-[62px]  text-gray-600"
                  >
                    +
                  </button>
                  <button className="cursor-pointer   text-[12px] font-light px-[15px] py-[5px] rounded-[62px]   text-gray-600">
                    {count}
                  </button>
                  <button
                    onClick={() => {
                      if (count >= 1) {
                        setCount(count--);
                      }
                    }}
                    className="cursor-pointer   text-[12px] font-light px-[15px] py-[5px] rounded-[62px]   text-gray-600"
                  >
                    -
                  </button>
                </div>
                <button className="cursor-pointer mr-[10px] text-[12px] font-light h-[45px] rounded-[62px] bg-black text-white flex items-center justify-center flex-1">
                  Add to Cart
                </button>
              </div>
            </section>
          </div>
        </div>
        <AllReviews />
      </div>
      <SimiliarProducts />
      <Footer />
    </div>
  );
};

export default Products;
