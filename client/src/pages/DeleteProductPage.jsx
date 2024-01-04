import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { asyncDeleteProduct } from '../states/products/action';

const DeleteProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await dispatch(asyncDeleteProduct(id));

        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Unable to delete the product.', 'error');
      } finally {
        navigate('/my-products');
      }
    };
    handleDelete();
  }, [dispatch, id, navigate]);

  return;
};

export default DeleteProductPage;
