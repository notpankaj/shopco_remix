import ProductCard from "~/components/util-components/ProductCard";
import HorizontalProductListWrapper from "~/components/wrappers/HorizontalProductListWrapper";

const data = new Array(4).fill(null);
const SimiliarProducts = () => {
  return (
    <HorizontalProductListWrapper title="You might also like">
      <section className="flex  gap-[20px] my-[40px]">
        {data.map((product: any, index: number) => {
          return <ProductCard key={index} />;
        })}
      </section>
    </HorizontalProductListWrapper>
  );
};

export default SimiliarProducts;
