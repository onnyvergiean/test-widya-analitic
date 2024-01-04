import ProductItem from './ProductItem';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const ProductsList = ({
  products,
  onSubmitSearch,
  onChangeSearchTerm,
  searchTerm,
}) => {
  const location = useLocation();
  const handleChangeSearchTerm = (e) => {
    e.preventDefault();
    onChangeSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch();
  };
  const isMyProductsPage = location.pathname === '/my-products';

  return (
    <>
      <div className="mx-6 p-4 bg-gray-50 h-screen overflow-hidden shadow-md sm:rounded-lg">
        <form className="mb-4" onSubmit={handleFormSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Product Name"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
            <button
              type="submit"
              className="text-white absolute inset-y-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-primary-300  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              {isMyProductsPage && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductItem
                key={index}
                {...product}
                isMyProductsPage={isMyProductsPage}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array,
  onChangeSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
};

export default ProductsList;
