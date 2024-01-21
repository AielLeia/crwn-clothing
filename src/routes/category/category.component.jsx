import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/product-card/product-card.component.jsx';
import { Spinner } from '../../components/spinner/spinner.component.jsx';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector.ts';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export { Category };
