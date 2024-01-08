import "./directory.styles.scss"
import {CategoryItem} from "../category-item/category-item.component.jsx";

const Directory = ({categories}) => {
  return (
    <div className="directory-container">
      {categories.map(({id, title, imageUrl}) => {
        return <CategoryItem key={id} category={{imageUrl, title}}/>
      })}
    </div>

  );
}


export {Directory}