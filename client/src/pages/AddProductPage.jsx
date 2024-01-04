import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateProduct } from '../states/products/action';
import useInput from './../hooks/useInput';
const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, onChangeName] = useInput();
  const [description, onChangeDescription] = useInput();
  const [price, onChangePrice] = useInput();

  const onAddProduct = (e) => {
    e.preventDefault();
    dispatch(asyncCreateProduct({ name, description, price }));
    navigate('/my-products');
  };
  return (
    <section className="bg-gray-50 h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create a Product
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onAddProduct}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={onChangeName}
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Product Price"
                  required
                  min={1}
                  value={price}
                  onChange={onChangePrice}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Product Description"
                  required
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProductPage;
