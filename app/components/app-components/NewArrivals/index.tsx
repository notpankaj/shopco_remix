import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api_Product } from "~/api/product";
import ProductCard from "~/components/util-components/ProductCard";
import HorizontalProductListWrapper from "~/components/wrappers/HorizontalProductListWrapper";
import { Product } from "~/types/Product";

const dummy_data = [
  {
    _id: "67e78f44a68b36c93c6e1395",
    name: "ZW COLLECTION PRINTED MIDI DRESS",
    description:
      "Midi dress with a lapel collar and sleeves falling below the elbow. Self-tie belt in the same fabric. Front button fastening",
    intendedFor: "female",
    variants: [
      {
        color: {
          primary: {
            _id: "67abfd4a235412a734e3f39c",
            name: "blue",
            code: "blue",
            createdAt: "2025-02-12T01:45:46.484Z",
            updatedAt: "2025-02-12T01:45:46.484Z",
            __v: 0,
          },
          secondary: "#0390fc",
        },
        _id: "67e790a3a68b36c93c6e13a2",
        price: 999,
        size: [
          {
            _id: "67ac2c30e4940f87eb29815b",
            name: "Regular",
            createdAt: "2025-02-12T05:05:52.153Z",
            updatedAt: "2025-02-12T05:05:52.153Z",
            __v: 0,
          },
        ],
        photos: [
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743229088/hn4dpgorlpvkpmpgbavm.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743229089/l1c14vpaoi2g50johq9q.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743229091/u3eb0omj12osrz3ie9jv.jpg",
        ],
        createdAt: "2025-03-29T06:18:11.829Z",
        updatedAt: "2025-03-29T06:18:11.829Z",
        __v: 0,
      },
      {
        color: {
          primary: {
            _id: "67abfd40235412a734e3f39a",
            name: "red",
            code: "red",
            createdAt: "2025-02-12T01:45:36.407Z",
            updatedAt: "2025-02-12T01:45:36.407Z",
            __v: 0,
          },
          secondary: "tomato",
        },
        _id: "67e79d01ed4e40906cb7a0b4",
        price: 888,
        size: [
          {
            _id: "67ac2c30e4940f87eb29815b",
            name: "Regular",
            createdAt: "2025-02-12T05:05:52.153Z",
            updatedAt: "2025-02-12T05:05:52.153Z",
            __v: 0,
          },
          {
            _id: "67ac2c37e4940f87eb29815d",
            name: "XL",
            createdAt: "2025-02-12T05:05:59.472Z",
            updatedAt: "2025-02-12T05:05:59.472Z",
            __v: 0,
          },
        ],
        photos: [
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232254/nwvyp1tqqr3fi5uie94p.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232255/yckqn6wxcyrsvvnkeay2.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232256/doqo9uptenzo8nbh31v6.jpg",
        ],
        createdAt: "2025-03-29T07:10:57.303Z",
        updatedAt: "2025-03-29T07:10:57.303Z",
        __v: 0,
      },
      {
        color: {
          primary: {
            _id: "67b86191c10d2a5b73ef7804",
            name: "green",
            code: "green",
            createdAt: "2025-02-21T11:20:49.193Z",
            updatedAt: "2025-02-21T11:20:49.193Z",
            __v: 0,
          },
          secondary: "#388a5c",
        },
        _id: "67e79e9bed4e40906cb7a0cc",
        price: 1111,
        size: [
          {
            _id: "67ac2c30e4940f87eb29815b",
            name: "Regular",
            createdAt: "2025-02-12T05:05:52.153Z",
            updatedAt: "2025-02-12T05:05:52.153Z",
            __v: 0,
          },
          {
            _id: "67ac2c37e4940f87eb29815d",
            name: "XL",
            createdAt: "2025-02-12T05:05:59.472Z",
            updatedAt: "2025-02-12T05:05:59.472Z",
            __v: 0,
          },
          {
            _id: "67e79db9ed4e40906cb7a0c2",
            name: "Small",
            createdAt: "2025-03-29T07:14:01.474Z",
            updatedAt: "2025-03-29T07:14:01.474Z",
            __v: 0,
          },
          {
            _id: "67b8642157207d72a2c31f66",
            name: "XL2",
            createdAt: "2025-02-21T11:31:45.770Z",
            updatedAt: "2025-02-21T11:31:45.770Z",
            __v: 0,
          },
        ],
        photos: [
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232662/qnzor6xwhoa11gmz6j2x.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232663/aesuqctx94uy77bzoqfi.jpg",
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1743232666/tacrfmgqftrpp5i2mzyw.jpg",
        ],
        createdAt: "2025-03-29T07:17:47.556Z",
        updatedAt: "2025-03-29T07:17:47.556Z",
        __v: 0,
      },
    ],
    category: {
      _id: "67abef6846555e45e6ca4f83",
      name: "Hoodie",
      isActive: true,
      createdAt: "2025-02-12T00:46:32.607Z",
      updatedAt: "2025-02-12T00:46:32.607Z",
      __v: 0,
    },
    dressStyle: {
      _id: "67b5692a980741ad81974e97",
      name: "T-Shirt",
      isActive: true,
      createdAt: "2025-02-19T05:16:26.358Z",
      updatedAt: "2025-02-19T05:16:26.358Z",
      __v: 0,
    },
    dressType: {
      _id: "67b565ca11cc2a42799867ad",
      name: "Casual",
      isActive: true,
      createdAt: "2025-02-19T05:02:02.738Z",
      updatedAt: "2025-02-19T05:02:02.738Z",
      __v: 0,
    },
    user: {
      _id: "67c7c01550e765841a19b092",
      email: "zara@gmail.com",
      password: "$2b$10$qTZ6nMYSfQQ/M49E5Vf22OfY50Tx1GCV1Ms2w7gOJuus3GjdBFLN.",
      role: "brand",
      isDeleted: false,
      profile: "67c7c01550e765841a19b093",
      createdAt: "2025-03-05T03:08:05.452Z",
      updatedAt: "2025-03-05T03:26:12.822Z",
      __v: 0,
    },
    createdAt: "2025-03-29T06:12:20.852Z",
    updatedAt: "2025-03-29T07:17:47.573Z",
    __v: 5,
  },
  {
    _id: "67c7d2b75fc7c27e22117b88",
    name: "a",
    description: "descriptionasda",
    intendedFor: "male",
    variants: [
      {
        color: {
          primary: {
            _id: "67abfd40235412a734e3f39a",
            name: "red",
            code: "red",
            createdAt: "2025-02-12T01:45:36.407Z",
            updatedAt: "2025-02-12T01:45:36.407Z",
            __v: 0,
          },
          secondary: "tomato",
        },
        _id: "67c7d45f0966c3b018458850",
        price: 12312,
        size: [
          {
            _id: "67ac2c30e4940f87eb29815b",
            name: "Regular",
            createdAt: "2025-02-12T05:05:52.153Z",
            updatedAt: "2025-02-12T05:05:52.153Z",
            __v: 0,
          },
        ],
        photos: [
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1741149278/iypvzwj39gikjen77kka.png",
        ],
        createdAt: "2025-03-05T04:34:39.715Z",
        updatedAt: "2025-03-05T04:34:39.715Z",
        __v: 0,
      },
    ],
    category: {
      _id: "67abef6846555e45e6ca4f83",
      name: "Hoodie",
      isActive: true,
      createdAt: "2025-02-12T00:46:32.607Z",
      updatedAt: "2025-02-12T00:46:32.607Z",
      __v: 0,
    },
    dressStyle: {
      _id: "67b5692a980741ad81974e97",
      name: "T-Shirt",
      isActive: true,
      createdAt: "2025-02-19T05:16:26.358Z",
      updatedAt: "2025-02-19T05:16:26.358Z",
      __v: 0,
    },
    dressType: {
      _id: "67b565ca11cc2a42799867ad",
      name: "Casual",
      isActive: true,
      createdAt: "2025-02-19T05:02:02.738Z",
      updatedAt: "2025-02-19T05:02:02.738Z",
      __v: 0,
    },
    user: {
      _id: "67c7c2203f2e9f4dbe901a0d",
      email: "zara2@gmail.com",
      password: "$2b$10$zcXpmD5LOpGv9mfo3p/8T.ZeJopcc/ypubWTq5FyFY7PnFFHTScte",
      role: "brand",
      isDeleted: false,
      roleModel: "BrandProfile",
      profile: {
        _id: "67c7c2203f2e9f4dbe901a0e",
        user: "67c7c2203f2e9f4dbe901a0d",
        brandName: "NEW NEW",
        createdAt: "2025-03-05T03:16:48.031Z",
        updatedAt: "2025-03-05T05:09:54.680Z",
        __v: 0,
        icon: "http://res.cloudinary.com/dyibxim0s/image/upload/v1741151390/cca0mu8uqlknldiskwpm.jpg",
        poster:
          "http://res.cloudinary.com/dyibxim0s/image/upload/v1741151393/tqhox1qnwszy51ecedok.png",
        phone: "1234567891",
      },
      createdAt: "2025-03-05T03:16:48.028Z",
      updatedAt: "2025-03-05T03:47:38.022Z",
      __v: 0,
    },
    createdAt: "2025-03-05T04:27:35.577Z",
    updatedAt: "2025-03-05T04:34:39.722Z",
    __v: 1,
  },
  {
    _id: "67bb3f31296745750ed3a81a",
    name: "a",
    description: "descriptionasda",
    intendedFor: "male",
    variants: [],
    category: {
      _id: "67abef6846555e45e6ca4f83",
      name: "Hoodie",
      isActive: true,
      createdAt: "2025-02-12T00:46:32.607Z",
      updatedAt: "2025-02-12T00:46:32.607Z",
      __v: 0,
    },
    dressStyle: {
      _id: "67b5692a980741ad81974e97",
      name: "T-Shirt",
      isActive: true,
      createdAt: "2025-02-19T05:16:26.358Z",
      updatedAt: "2025-02-19T05:16:26.358Z",
      __v: 0,
    },
    dressType: {
      _id: "67b565ca11cc2a42799867ad",
      name: "Casual",
      isActive: true,
      createdAt: "2025-02-19T05:02:02.738Z",
      updatedAt: "2025-02-19T05:02:02.738Z",
      __v: 0,
    },
    brand: "67bb33bc4260de308d78c071",
    createdAt: "2025-02-23T15:30:57.218Z",
    updatedAt: "2025-02-23T15:30:57.218Z",
    __v: 0,
  },
  {
    _id: "67bb16f28bea5cbc6a44327b",
    name: "a",
    description: "descriptionasda",
    intendedFor: "male",
    variants: [],
    category: {
      _id: "67abef6846555e45e6ca4f83",
      name: "Hoodie",
      isActive: true,
      createdAt: "2025-02-12T00:46:32.607Z",
      updatedAt: "2025-02-12T00:46:32.607Z",
      __v: 0,
    },
    dressStyle: {
      _id: "67b5692a980741ad81974e97",
      name: "T-Shirt",
      isActive: true,
      createdAt: "2025-02-19T05:16:26.358Z",
      updatedAt: "2025-02-19T05:16:26.358Z",
      __v: 0,
    },
    dressType: {
      _id: "67b565ca11cc2a42799867ad",
      name: "Casual",
      isActive: true,
      createdAt: "2025-02-19T05:02:02.738Z",
      updatedAt: "2025-02-19T05:02:02.738Z",
      __v: 0,
    },
    createdAt: "2025-02-23T12:39:14.897Z",
    updatedAt: "2025-02-23T12:46:00.395Z",
    __v: 3,
  },
];
const NewArrivals = () => {
  const [productList, setProductList] = useState<Product[]>([
    ...dummy_data,
    ...dummy_data,
  ]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await Api_Product.getProducts({
        filter: { page: 1, limit: 10 },
      });
      setProductList(data?.products);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchProducts();
  }, []);

  return (
    <HorizontalProductListWrapper title="New Arrivals">
      {productList?.map((product: any, index: number) => {
        return <ProductCard key={index} product={product} />;
      })}
    </HorizontalProductListWrapper>
  );
};

export default NewArrivals;
