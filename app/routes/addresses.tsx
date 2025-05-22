import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import { RootState } from "~/store";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { BASE_URL } from "~/api";
import toast from "react-hot-toast";
import { Loader } from "~/components/util-components/Loader";

export default function Addresses() {
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  const token = useSelector((s: RootState) => s.auth.token);

  const [addresses, setAddresses] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/address`, {
        headers: {
          Authorization: token,
        },
      });

      if (res?.data?.data?.length) {
        setAddresses(res?.data?.data);
      } else {
        setAddresses([]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (addressId: string, index: number) => {
    try {
      setDeletingIndex(index);
      const res = await axios.delete(
        `${BASE_URL}/api/v1/address/${addressId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Address Deleted!");
      fetchAddresses();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setDeletingIndex(-1);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [token]);

  if (user === null) {
    return <h1 className="heading text-[22px]">Loading...</h1>;
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="flex flex-col gap-[20px] items-center justify-between">
        <div className=" flex flex-col justify-center relative">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Addresses</h1>

            <button
              onClick={() => {
                console.log("asd");
                navigate("/address/create");
              }}
              className="flex items-center text-blue-400 hover:text-blue-400 mb-6"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              ADD A NEW ADDRESS
            </button>

            {loading ? <span>Loading</span> : null}
            <div className="space-y-4">
              {addresses?.length ? (
                addresses.map((addr: any, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          {addr.addressType}
                        </span>
                        <h2 className="font-semibold">{addr.name}</h2>
                        <span className="text-gray-600">{addr.phone}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{addr.address}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/address/${addr?._id}`)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(addr?._id, index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        {deletingIndex === index ? (
                          <Loader scale={0.5} />
                        ) : (
                          <RiDeleteBin6Line className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <span>No Address!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
