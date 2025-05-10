import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api_Product } from "~/api/product";
import ProductCard from "~/components/util-components/ProductCard";
import HorizontalProductListWrapper from "~/components/wrappers/HorizontalProductListWrapper";
import { Product } from "~/types/Product";

const TopSelling = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await Api_Product.getProductsNew({
        filter: { page: 3, limit: 4 },
      });
      setProductList(data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <HorizontalProductListWrapper title="Top Selling">
      {productList?.map((product: any, index: number) => {
        return <ProductCard key={index} product={product} />;
      })}
    </HorizontalProductListWrapper>
  );
};

export default TopSelling;
