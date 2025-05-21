import { useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import { AppDispatch, RootState } from "~/store";
import { logOut } from "~/store/feature/auth/authSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { BASE_URL } from "~/api";

export default function Addresses() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const token = useSelector((s: RootState) => s.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    "https://github.com/shadcn.png"
  );

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onLogoutClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/address`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);

      if (res?.data?.data?.length) {
        setAddresses(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                      <button className="text-gray-500 hover:text-blue-600">
                        <MdEdit className="w-5 h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <RiDeleteBin6Line className="w-5 h-5" />
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
