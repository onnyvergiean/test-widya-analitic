import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link
            to="/"
            className="self-center text-2xl font-semibold whitespace-nowrap "
          >
            Electro Inven
          </Link>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 text-black rounded p-0 ${
                  isPathActive('/')
                    ? 'bg-blue-700 bg-transparent text-blue-700'
                    : ''
                }`}
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/my-products"
                className={`block py-2 px-3 text-black rounded p-0 ${
                  isPathActive('/my-products')
                    ? 'bg-blue-700 bg-transparent text-blue-700'
                    : ''
                }`}
              >
                My Products
              </Link>
            </li>
            <li>
              <Link
                to="/new"
                className={`block py-2 px-3 text-black rounded p-0 ${
                  isPathActive('/new')
                    ? 'bg-blue-700 bg-transparent text-blue-700'
                    : ''
                }`}
              >
                Add Products
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`block py-2 px-3 text-black rounded p-0 ${
                  isPathActive('/profile')
                    ? 'bg-blue-700 bg-transparent text-blue-700'
                    : ''
                }`}
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
