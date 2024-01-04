import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetDetailProduct } from '../states/products/action';
import { useDispatch } from 'react-redux';
import NoProductsFound from './NoProductsFound';

const DetailProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products?.product);

  useEffect(() => {
    dispatch(asyncGetDetailProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return <NoProductsFound />;
  }

  return (
    <section className="text-gray-700 body-font bg-gray-50 h-screen overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {product.price}
              </span>
              <Link
                to="/"
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProductPage;
