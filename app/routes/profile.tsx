import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "~/components/app-components/Navbar";
import OfferAds from "~/components/app-components/OfferAds";
import { AppDispatch, RootState } from "~/store";
import { logOut } from "~/store/feature/auth/authSlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(user);

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
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user?.picture || "/default-avatar.png"}
            alt="User Profile"
            className="w-24 h-24 rounded-full border"
          />
          {isEditing && (
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Enter image URL"
            />
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-semibold">First Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-800">{user.firstName}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-800">{user.lastName}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Email:</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="text-gray-700 font-semibold">Gender:</label>
            <p className="text-gray-800">{user.gender}</p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <div>
          <button
            onClick={onLogoutClick}
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            {"Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
