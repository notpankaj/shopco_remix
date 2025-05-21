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
import { IoClose } from "react-icons/io5";
export default function Profile() {
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
      <div className="flex flex-col gap-[20px] items-center justify-between ">
        <div className="mt-[100px] w-[400px] flex flex-col  justify-center relative">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`border-2 p-2 rounded-full absolute z-[1] top-[10px] right-[20px] ${
              isEditMode ? "bg-black" : ""
            }`}
          >
            {isEditMode ? <IoClose className="text-white" /> : <MdEdit />}
          </button>
          <div>
            <Avatar className="w-[100px] h-[100px] mx-auto">
              <AvatarImage src={previewImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              onClick={handleImageClick}
              className="flex mt-[10px] mx-auto  items-center justify-center"
            >
              <p className="text-sm">change picture</p>
            </button>
          </div>
          <div className="px-[10px] py-[5px]">
            <span className="opacity-50 text-sm ml-[5px] mb-[2px]">
              First Name :
            </span>
            <Input placeholder="First Name" value={user?.firstName} />
          </div>
          <div className="px-[10px] py-[5px]">
            <span className="opacity-50 text-sm ml-[5px] mb-[2px]">
              Last Name :
            </span>
            <Input placeholder="Last Name" value={user?.lastName} />
          </div>
          <div className="px-[10px] py-[5px]">
            <span className="opacity-50 text-sm ml-[5px] mb-[2px]">
              Email :
            </span>
            <Input placeholder="Email" value={user?.email} />
          </div>
          <div className="px-[10px] py-[5px]">
            <span className="opacity-50 text-sm ml-[5px] mb-[2px]">
              Gender :
            </span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="px-[10px] py-[5px] flex flex-col items-start">
            <span className="opacity-50 text-sm ml-[5px] mb-[2px]">
              Address :
            </span>
            <button
              onClick={() => navigate("/addresses")}
              className="bg-blue-300 px-4 py-2 rounded-2xl"
            >
              <p className="text-xs">Manage Address</p>
            </button>
          </div>
          {isEditMode ? (
            <Button variant="outline" className="w-[200px] mx-auto mt-[20px]">
              UPDATE PROFILE
            </Button>
          ) : (
            <Button
              onClick={onLogoutClick}
              variant="secondary"
              className="cursor-pointer w-[200px] mx-auto mt-[20px] bg-black text-white hover:bg-gray-400 hover:text-white"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
