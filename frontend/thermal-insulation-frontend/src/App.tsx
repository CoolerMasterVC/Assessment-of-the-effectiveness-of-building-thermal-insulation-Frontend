// src/App.tsx
import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppNavbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { MaterialDetailPage } from './pages/MaterialDetailPage';
import { ROUTES } from './Routes';
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.MATERIALS} element={<MaterialsPage />} />
        <Route path={ROUTES.MATERIAL_DETAIL} element={<MaterialDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;