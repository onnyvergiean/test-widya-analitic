import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductItem = ({ id, name, price, description, isMyProductsPage }) => {
  const navigate = useNavigate();
  let formattedPrice = price.toFixed(2).replace(/\.00$/, '');
  let numericPrice = parseInt(formattedPrice.replace(/,/g, ''), 10);
  const onDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/products/delete/${id}`);
      }
    });
  };

  const onEditClick = () => {
    navigate(`/products/edit/${id}`);
  };

  const onProductClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
        onClick={onProductClick}
      >
        {name}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900">{numericPrice}</td>
      <td className="px-6 py-4 font-medium text-gray-900">{description}</td>
      {isMyProductsPage && (
        <td>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={onDeleteClick}
          >
            Delete
          </button>

          <button
            type="button"
            className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={onEditClick}
          >
            Edit
          </button>
        </td>
      )}
    </tr>
  );
};

ProductItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  isMyProductsPage: PropTypes.bool,
};

export default ProductItem;
