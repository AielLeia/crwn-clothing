import {CategoryItem} from "../directory-item/directory-item.component.jsx";
import {DirectoryContainer} from "./directory.styles.jsx";

const Directory = ({categories}) => {
  return (
    <DirectoryContainer>
      {categories.map(({id, title, imageUrl}) => {
        return <CategoryItem key={id} category={{imageUrl, title}}/>
      })}
    </DirectoryContainer>

  );
}


export {Directory}