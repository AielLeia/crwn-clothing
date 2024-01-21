import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { CategoriesPreview } from '../categories-preview/categories-preview.component.jsx';
import { Category } from '../category/category.component.jsx';

import { fetchCategoriesStart } from '../../store/categories/categories.action.ts';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export { Shop };
