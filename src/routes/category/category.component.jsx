import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context.jsx";
import { ProductCard } from "../../components/product-card/product-card.component.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
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
