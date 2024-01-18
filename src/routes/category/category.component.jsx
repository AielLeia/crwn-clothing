import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { ProductCard } from "../../components/product-card/product-card.component.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { selectCategoriesMap } from "../../store/categories/categories.selector.js";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle className="category-title">
        {category.toUpperCase()}
      </CategoryTitle>
      <CategoryContainer className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export { Category };
