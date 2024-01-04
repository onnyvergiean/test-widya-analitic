import { useEffect, useState, useMemo } from 'react';

import ProductsList from '../components/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllProducts } from '../states/products/action';
import NoProductsFound from './NoProductsFound';
import debounce from 'lodash.debounce';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const allProducts = useSelector((state) => state.products?.products);

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(
          asyncGetAllProducts({ searchTerm: value, page: 1, limit: 10 })
        );
      }, 500),
    [dispatch]
  );

  const onSubmitSearch = () => {
    handleSearch.cancel();
    dispatch(asyncGetAllProducts({ searchTerm, page: 1, limit: 10 }));
  };

  useEffect(() => {
    handleSearch(searchTerm);
    return () => {
      handleSearch.cancel();
    };
  }, [dispatch, searchTerm, handleSearch]);

  return (
    <>
      {allProducts && allProducts.length > 0 ? (
        <ProductsList
          products={allProducts}
          onSubmitSearch={onSubmitSearch}
          searchTerm={searchTerm}
          onChangeSearchTerm={setSearchTerm}
        />
      ) : (
        <NoProductsFound />
      )}
    </>
  );
};

export default HomePage;
