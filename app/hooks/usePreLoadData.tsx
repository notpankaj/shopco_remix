import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_Common } from "~/api/common";
import { AppDispatch } from "~/store";
import { setCommonData } from "~/store/feature/app/appSlice";

const usePreLoadData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getAllFilterAndCategories = async () => {
    const p1 = Api_Common.get_categories();
    const p2 = Api_Common.get_sizes();
    const p3 = Api_Common.get_dressStyle();
    const p4 = Api_Common.get_colors();
    try {
      const result = await Promise.allSettled([p1, p2, p3, p4]);

      const Obj = {
        categories: [],
        sizes: [],
        dressStyle: [],
        colors: [],
      };

      //   Category
      if (result[0].status === "fulfilled") {
        if (result[0].value?.data) Obj.categories = result[0].value?.data;
      }
      //   Sizes
      if (result[1].status === "fulfilled") {
        if (result[1].value?.data) Obj.sizes = result[1].value?.data;
      }
      //   DressStyle
      if (result[2].status === "fulfilled") {
        if (result[2].value?.data) Obj.dressStyle = result[2].value?.data;
      }
      //   Colors
      if (result[3].status === "fulfilled") {
        if (result[3].value?.data) Obj.colors = result[3].value?.data;
      }

      //   console.log("Res getAllFilterAndCategories: ", result);
      dispatch(setCommonData(Obj));
    } catch (error) {
      console.log("Error getAllFilterAndCategories: ", error);
    }
  };

  useEffect(() => {
    getAllFilterAndCategories();
  }, []);

  return undefined;
};

export default usePreLoadData;
