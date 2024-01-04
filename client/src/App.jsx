import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Loading from './components/Loading.jsx';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './states/isPreload/action';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Navbar from './components/Navbar.jsx';
import MyProductsPage from './pages/MyProducts.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import DetailProductPage from './pages/DetailProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import DeleteProductPage from './pages/DeleteProductPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { asyncUnsetAuthUser } from './states/auth/action.js';

const App = () => {
  const isPreload = useSelector((state) => state.isPreload);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Loading />
      <Navbar />
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/my-products" element={<MyProductsPage />} />
        <Route path="/new" element={<AddProductPage />} />
        <Route path="/products/:id" element={<DetailProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/products/delete/:id" element={<DeleteProductPage />} />
        <Route
          path="/profile"
          element={<ProfilePage authUser={authUser} signOut={onSignOut} />}
        />
      </Routes>
    </>
  );
};

export default App;
