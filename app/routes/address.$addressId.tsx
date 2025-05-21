import { useNavigate, useParams } from "@remix-run/react";
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
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

// Define the type for address objects
type Address = {
  type: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  locality: string;
  city: string;
  state: string;
  landmark?: string;
  alternatePhone?: string;
};

// Initial form state
const initialFormState: Address = {
  type: "Home",
  name: "",
  phone: "",
  address: "",
  pincode: "",
  locality: "",
  city: "",
  state: "",
  landmark: "",
  alternatePhone: "",
};
type Params = { addressId: string };
export default function Addresses() {
  const { addressId } = useParams() as Params;
  const isEdit = addressId !== "create";

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
  const [formState, setFormState] = useState<Address>(initialFormState);

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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setFormState({ ...formState, type: value });
  };

  const handleSaveAddress = () => {
    // Here you can add logic to save the address, e.g., to an array or API
    console.log("Saved Address:", formState);
    setFormState(initialFormState); // Reset form after saving
  };

  const handleCancel = () => {
    setFormState(initialFormState); // Reset form on cancel
    navigate("/addresses"); // Navigate back to the address list or another page
  };

  if (user === null) {
    return <h1 className="heading text-[22px]">Loading...</h1>;
  }

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <div className="flex flex-col gap-[20px] items-center justify-between">
        <h1>{isEdit ? "Update" : "Add"} Address</h1>
        <div className="flex flex-col justify-center relative">
          <div className="w-[500px] mx-auto p-4">
            <div className="bg-white p-6 rounded-lg ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <Input
                    name="name"
                    value={formState.name}
                    onChange={handleFormChange}
                    placeholder="Name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    10-digit mobile number
                  </label>
                  <Input
                    name="phone"
                    value={formState.phone}
                    onChange={handleFormChange}
                    placeholder="Phone Number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Pincode</label>
                  <Input
                    name="pincode"
                    value={formState.pincode}
                    onChange={handleFormChange}
                    placeholder="Pincode"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Locality</label>
                  <Input
                    name="locality"
                    value={formState.locality}
                    onChange={handleFormChange}
                    placeholder="Locality"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-sm text-gray-600">
                    Address (Area and Street)
                  </label>
                  <Input
                    name="address"
                    value={formState.address}
                    onChange={handleFormChange}
                    placeholder="Address"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    City/District/Town
                  </label>
                  <Input
                    name="city"
                    value={formState.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">State</label>
                  <Select
                    onValueChange={(value) =>
                      setFormState({ ...formState, state: value })
                    }
                    value={formState.state}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Landmark (Optional)
                  </label>
                  <Input
                    name="landmark"
                    value={formState.landmark}
                    onChange={handleFormChange}
                    placeholder="Landmark"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Alternate Phone (Optional)
                  </label>
                  <Input
                    name="alternatePhone"
                    value={formState.alternatePhone}
                    onChange={handleFormChange}
                    placeholder="Alternate Phone"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-sm text-gray-600">Address Type</label>
                  <div className="flex space-x-4 mt-1 gap-[10px]">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="Home"
                        checked={formState.type === "Home"}
                        onChange={() => handleTypeChange("Home")}
                        className="mr-2"
                      />
                      Home
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="Work"
                        checked={formState.type === "Work"}
                        onChange={() => handleTypeChange("Work")}
                        className="mr-2"
                      />
                      Work
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="mx-auto"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
