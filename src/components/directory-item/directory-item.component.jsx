import "./directory-item.style.scss"

const CategoryItem = ({ category }) => {
  return (
    <div className="directory-item-container">
      <div className="background-image" style={{backgroundImage: `url(${category.imageUrl})`}}/>
      <div className="directory-item-body">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}

export {CategoryItem}