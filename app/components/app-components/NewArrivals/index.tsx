import ProductCard from "~/components/util-components/ProductCard";
import HorizontalProductListWrapper from "~/components/wrappers/HorizontalProductListWrapper";

const data = new Array(4).fill(null);
const NewArrivals = () => {
  return (
    <HorizontalProductListWrapper title="New Arrivals">
      <section className="flex  gap-[20px] my-[40px]">
        {data.map((product: any, index: number) => {
          return <ProductCard key={index} />;
        })}
      </section>
    </HorizontalProductListWrapper>
  );
};

export default NewArrivals;
