import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Api_Product } from "~/api/product";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const handleOnChange = (e: any) => {
    setSearchString(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;
    if (searchString.length > 1) {
      navigate(`/search?s=${searchString}`);
      setSearchString("");
    }
  };

  const fetchProducts = async (str: string) => {
    if (!str) return;
    console.log(str, "here");

    try {
      setLoading(true);
      // @ts-ignore
      const res = await Api_Product.getProductsNew({ filter: { search: str } });
      console.log(res, "res");
      setProducts(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      fetchProducts(searchString);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchString]);

  return (
    <div className="relative flex bg-[#F0F0F0] min-w-[300px]  mr-[20px] px-[20px] py-[10px] rounded-[62px]  gap-[5px] items-center">
      <IoSearch className="text-[18px] opacity-[0.4]" />
      <input
        value={searchString}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for project"
        className="text-[14px] flex-1 outline-none text-[rgba(0,0,0,0.6)]"
      />
      {searchString?.length ? (
        <div className="w-[90%]  bg-white absolute z-1 top-[50px] shadow-lg px-[10px] py-[5px] overflow-hidden">
          <div className="overflow-y-scroll max-h-[200px]">
            {products.map((product, idx) => {
              const imgSrc = product?.variants?.photos[0];
              return (
                <div
                  key={idx}
                  onClick={() => navigate("/product/" + product?._id)}
                  className="hover:bg-black group/item cursor-pointer overflow-hidden flex items-center  pb-1 pt-1 pl-1 border-b border-b-gray-100"
                >
                  <div className="bg-amber-100 w-[40px] h-[40px] mr-2">
                    <img
                      src={imgSrc}
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                  <span className="text-[12px] group-hover/item:text-white">
                    {product?.name}
                  </span>
                </div>
              );
            })}
            {!products?.length ? (
              <>
                <p className="text-sm">
                  {loading ? "Finding..." : "No Product Found!"}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
