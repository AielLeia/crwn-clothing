import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DirectoryItemBackgroundImage,
  DirectoryItemBody,
  DirectoryItemBodyText,
  DirectoryItemBodyTitle,
  DirectoryItemContainer,
} from './directory-item.style';
import { Category } from '@/components/directory/directory.component';

type CategoryItemProps = {
  category: Category;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(category.route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <DirectoryItemBackgroundImage $backgroundImage={category.imageUrl} />
      <DirectoryItemBody>
        <DirectoryItemBodyTitle>{category.title}</DirectoryItemBodyTitle>
        <DirectoryItemBodyText>Shop now</DirectoryItemBodyText>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export { CategoryItem };
