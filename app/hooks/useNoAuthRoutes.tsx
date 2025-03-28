import { redirect, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

const useNoAuthRoutes = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const naviagte = useNavigate();
  console.warn({ isLoggedIn });
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (isLoggedIn) {
    return naviagte("/");
  }
  return {};
};

export default useNoAuthRoutes;
