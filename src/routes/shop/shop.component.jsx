import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { CategoriesPreview } from "../categories-preview/categories-preview.component.jsx";
import { Category } from "../category/category.component.jsx";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util.js";
import { setCategoriesMap } from "../../store/categories/categories.action.js";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoriesMap));
    };

    getCategoriesMap().then((r) => console.log(r));
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export { Shop };
