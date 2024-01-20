import { useNavigate } from 'react-router-dom';

import {
  DirectoryItemBackgroundImage,
  DirectoryItemBody,
  DirectoryItemBodyText,
  DirectoryItemBodyTitle,
  DirectoryItemContainer,
} from './directory-item.style.jsx';

const CategoryItem = ({ category }) => {
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
