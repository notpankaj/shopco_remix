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
      <div className="flex flex-col gap-[20px] h-[80vh] items-center justify-between ">
        <h1 className="heading text-[22px]">Profile Page</h1>

        <span className="text-[14px] max-w-[200px] ">
          {JSON.stringify(
            user,
            (key, value) => {
              if (key === "token") return undefined;
              return value;
            },
            2
          )}
        </span>
        <button
          onClick={onLogoutClick}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
        >
          {"Logout"}
        </button>
      </div>
    </div>
  );
}
