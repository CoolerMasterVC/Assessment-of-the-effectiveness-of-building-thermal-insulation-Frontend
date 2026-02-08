import { type FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { MaterialDetailPage } from './pages/MaterialDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { ROUTES } from './Routes';
import { useAppDispatch } from './store';
import { loadUserFromStorage } from './store/slices/authSlice';
import './App.css';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загружаем пользователя из localStorage при старте
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.MATERIALS} element={<MaterialsPage />} />
        <Route path={ROUTES.MATERIAL_DETAIL} element={<MaterialDetailPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
        <Route path={ROUTES.APPLICATION_DETAIL} element={<ApplicationDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;