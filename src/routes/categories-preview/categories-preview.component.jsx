import { CategoryPreview } from "../../components/category-preview/category-preview.component.jsx";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector.js";
import { Spinner } from "../../components/spinner/spinner.component.jsx";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={categoriesMap[title]}
            />
          );
        })
      )}
    </>
  );
};

export { CategoriesPreview };
