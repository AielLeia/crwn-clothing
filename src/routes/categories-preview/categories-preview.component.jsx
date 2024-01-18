import { CategoryPreview } from "../../components/category-preview/category-preview.component.jsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector.js";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        );
      })}
    </>
  );
};

export { CategoriesPreview };
