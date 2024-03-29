import { DirectoryContainer } from './directory.styles';
import { CategoryItem } from '@/components/directory-item/directory-item.component';

export type Category = {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: 'Hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'Jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'Sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'Womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'Mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens',
  },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map(({ id, title, imageUrl, route }) => {
        return (
          <CategoryItem key={id} category={{ id, imageUrl, title, route }} />
        );
      })}
    </DirectoryContainer>
  );
};

export { Directory };
