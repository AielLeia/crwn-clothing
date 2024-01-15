import {
  DirectoryItemBackgroundImage,
  DirectoryItemBody, DirectoryItemBodyText,
  DirectoryItemBodyTitle,
  DirectoryItemContainer
} from "./directory-item.style.jsx";

const CategoryItem = ({category}) => {
  return (
    <DirectoryItemContainer>
      <DirectoryItemBackgroundImage $backgroundImage={category.imageUrl}/>
      <DirectoryItemBody>
        <DirectoryItemBodyTitle>{category.title}</DirectoryItemBodyTitle>
        <DirectoryItemBodyText>Shop now</DirectoryItemBodyText>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  )
}

export {CategoryItem}