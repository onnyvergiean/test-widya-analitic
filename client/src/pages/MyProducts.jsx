import { useState, useEffect, useMemo } from 'react';
import ProductsList from '../components/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetMyProducts } from '../states/products/action';
import NoProductsFound from './NoProductsFound';
import debounce from 'lodash.debounce';

const MyProductsPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const myProducts = useSelector((state) => state.products.myProducts);

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(asyncGetMyProducts({ searchTerm: value, page: 1, limit: 10 }));
      }, 500),
    [dispatch]
  );

  const onSubmitSearch = () => {
    handleSearch.cancel();
    dispatch(asyncGetMyProducts({ searchTerm, page: 1, limit: 10 }));
  };

  useEffect(() => {
    handleSearch(searchTerm);
    return () => {
      handleSearch.cancel();
    };
  }, [dispatch, searchTerm, handleSearch]);

  return (
    <>
      {myProducts && myProducts.length > 0 ? (
        <ProductsList
          products={myProducts}
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

export default MyProductsPage;
