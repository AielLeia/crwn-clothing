import "./category-preview.styles.jsx";
import { ProductCard } from "../product-card/product-card.component.jsx";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  CategoryPreview as StyledCategoryPreview,
} from "./category-preview.styles.jsx";

const CategoryPreview = ({ title, products }) => {
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
