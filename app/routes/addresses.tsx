import { useNavigate } from "@remix-run/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { AppDispatch, RootState } from "~/store";
import { logOut } from "~/store/feature/auth/authSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri"; // Importing Delete icon
import { IoClose } from "react-icons/io5";

// Define the type for address objects
type Address = {
  type: string;
  name: string;
  phone: string;
  address: string;
};

// Array of addresses
const addresses: Address[] = [
  {
    type: "HOME",
    name: "Amit Kumar",
    phone: "7009955875",
    address: "House no 137, Sector 9B, Chandigarh, Chandigarh - 160009",
  },
  {
    type: "HOME",
    name: "Pankaj",
    phone: "7986674418",
    address:
      "72, sector 2B, Chandigarh, Sector 2B Chandigarh, Chandigarh, Chandigarh - 160011",
  },
  {
    type: "WORK",
    name: "Pankaj",
    phone: "7986674418",
    address:
      "Axel Business Centre, 11th floor, Sector 118, Sahibzada Ajit Singh (SAS) Nagar, Mohali, Chandigarh, Chandigarh - 160055",
  },
];

export default function Addresses() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

            <button className="flex items-center text-blue-400 hover:text-blue-400 mb-6">
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

            <div className="space-y-4">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        {addr.type}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
