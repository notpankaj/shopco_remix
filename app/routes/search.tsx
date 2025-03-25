import { useSearchParams } from "@remix-run/react";
import Footer from "~/components/app-components/Footer";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import SimiliarProducts from "~/components/app-components/SimilarProducts";
import Line from "~/components/util-components/Line";
import ProductCard from "~/components/util-components/ProductCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
const Search = () => {
  //   const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="flex mx-[5%] mt-[50px] gap-[20px]">
        <section className=" max-w-[300px] bg-amber-600 flex-1"></section>
        <section className="flex-1">
          {/* header */}
          <div className="flex items-center justify-between">
            <h6 className="text-[25px] font-semibold">Casual</h6>
            <div className="flex gap-[10px]">
              <p className="text-[#00000060] text-[12px]">
                Showing 1-10 of 100 Products
              </p>
              <p className="text-[#00000060] text-[12px]">
                Sort by:{" "}
                <button className="font-medium text-black">Most Popular</button>
              </p>
            </div>
          </div>
          {/* products */}
          <div className="flex flex-wrap gap-[20px]">
            {new Array(9).fill(null).map((_, idx) => {
              return <ProductCard key={idx} />;
            })}
          </div>
          <Line classNames="my-[50px]" />
          {/* Pagination */}
          <div className=" flex items-center  gap-[10px]">
            <button className="h-[40px] border border-[#00000010] rounded-[8px] px-[20px] text-[14px] flex items-center justify-evenly  gap-[10px]">
              <GrLinkPrevious />
              Previous
            </button>
            <section className="flex-1 flex items-center justify-center gap-[10px]">
              {[1, 2, 3, "...", 8, 9, 10].map((item) => {
                const isActive = item === 1;
                return (
                  <button
                    key={item}
                    className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center ${
                      isActive
                        ? "bg-[var(--bg-secondary)] text-[#000000]"
                        : "text-[#00000050]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </section>
            <button className="h-[40px] border border-[#00000010] rounded-[8px] px-[20px] text-[14px] flex items-center justify-evenly  gap-[10px]">
              <GrLinkNext />
              Next
            </button>
          </div>
        </section>
      </div>
      <SimiliarProducts />
      <Footer />
    </div>
  );
};

export default Search;
