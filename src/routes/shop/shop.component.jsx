import "./shop.style.scss"
import {Route, Routes} from "react-router-dom";
import {CategoriesPreview} from "../categories-preview/categories-preview.component.jsx";
import {Category} from "../category/category.component.jsx";

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
  )
}

export {Shop}