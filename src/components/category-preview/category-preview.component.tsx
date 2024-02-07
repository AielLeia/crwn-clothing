import { FC } from 'react';

import './category-preview.styles';
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  CategoryPreview as StyledCategoryPreview,
} from './category-preview.styles';
import { ProductCard } from '@/components/product-card/product-card.component';

import { Product } from '@/store/categories/categories.types';

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryPreviewTitle to={`${title}`}>
          {title.toUpperCase()}
        </CategoryPreviewTitle>
      </h2>
      <StyledCategoryPreview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </StyledCategoryPreview>
    </CategoryPreviewContainer>
  );
};

export { CategoryPreview };
