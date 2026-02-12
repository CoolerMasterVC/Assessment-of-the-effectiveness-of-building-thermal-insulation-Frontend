// src/pages/MaterialsPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { materialsApi } from '../modules/api';
import type { Material } from '../types';
import { SearchFilter } from '../components/SearchFilter';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/slices/materialsFilterSlice';
import type { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store';
import { getCartInfo } from '../store/slices/cartSlice';
import './MaterialsPage.css';

export const MaterialsPage = () => {
  const dispatch = useAppDispatch();
  // Получаем информацию о корзине из Redux
  const { itemsCount, draftId } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, setApiStatus] = useState<'checking' | 'success' | 'error' | 'mock'>('checking');

  const searchTerm = useSelector((state: RootState) => state.materialsFilter.searchTerm);

  useEffect(() => {
    // Загружаем корзину только если есть токен
    if (token) {
      dispatch(getCartInfo());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true);
        setApiStatus('checking');
        console.log('Starting to load materials...');
        
        const data = await materialsApi.getMaterials();
        console.log('Loaded materials:', data);
        
        setMaterials(data);
        setFilteredMaterials(data);
        
        // Определяем статус API
        const isUsingMock = data.length > 0 && data[0].image_url === '/images/default-material.jpg';
        setApiStatus(isUsingMock ? 'mock' : 'success');
        
      } catch (error) {
        console.error('Error loading materials:', error);
        setApiStatus('error');
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
    
    if (!searchTerm.trim()) {
      setFilteredMaterials(materials);
      return;
    }

    const filtered = materials.filter(material =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredMaterials(filtered);
  };

  // Определяем, активна ли корзина
  const isCartActive = token && draftId; // Корзина активна, если пользователь авторизован И есть черновик
  const cartItemCount = itemsCount || 0;

  if (loading) {
    return (
      <div className="materials-page">
        <Breadcrumbs crumbs={[{ label: 'Материалы' }]} />
        <LoadingSpinner message="Загружаем материалы..." />
      </div>
    );
  }

  return (
    <div className="materials-page">
      {/* Хлебные крошки */}
      <Breadcrumbs crumbs={[{ label: 'Материалы' }]} />

      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Теплоизоляционные материалы</h1>
            <p className="page-subtitle">
              Подбор оптимальных теплоизоляционных материалов для ваших задач
            </p>
          </div>
          
          {/* Иконка корзины */}
          <div className="cart-section">
            {isCartActive ? (
              // Активная иконка корзины
              <Link to="/cart" className="cart-icon">
                <div className="cart-icon-wrapper">
                  <img 
                    src="http://localhost:9000/images/cart.png" 
                    alt="Корзина" 
                    className="cart-image"
                  />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </div>
                <span className="cart-label">Корзина</span>
              </Link>
            ) : (
              // Неактивная иконка корзины
              <div className="cart-icon disabled">
                <div className="cart-icon-wrapper">
                  <img 
                    src="http://localhost:9000/images/cart.png" 
                    alt="Корзина" 
                    className="cart-image disabled"
                    style={{ filter: 'grayscale(100%) opacity(0.6)' }}
                  />
                  {cartItemCount > 0 && (
                    <span className="cart-badge" style={{ backgroundColor: '#6c757d' }}>
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="cart-label text-muted">Корзина</span>
              </div>
            )}
            {!token && (
              <div className="cart-error text-muted small mt-1">
                Войдите, чтобы использовать корзину
              </div>
            )}
            {token && !draftId && (
              <div className="cart-error text-muted small mt-1">
                Корзина пуста
              </div>
            )}
          </div>
        </div>

        {/* Заменяем простое поле ввода на компонент SearchFilter */}
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Поиск по названию или описанию..."
          initialValue={searchTerm}
        />

        {/* Статус API */}
        <div className="api-status-section mb-4">
          {/* <div className={`api-status-badge ${apiStatus}`}>
            {apiStatus === 'checking' && 'Проверка подключения...'}
            {apiStatus === 'success' && '✓ Подключено к API'}
            {apiStatus === 'mock' && '⚠ Используются mock-данные'}
            {apiStatus === 'error' && '✗ Ошибка подключения'}
          </div> */}
          {/* {apiStatus === 'mock' && (
            <div className="api-status text-muted small mt-1">
              Сервер недоступен, показаны демо-данные
            </div>
          )} */}
        </div>

        <div className="materials-grid">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-image-container">
                <img 
                  src={material.image_url}
                  alt={material.name}
                  className="material-image"
                />
              </div>
              <div className="material-content">
                <h3 className="material-name">{material.name}</h3>
                <p className="material-description">{material.description}</p>
                
                <div className="material-properties">
                  <div className="property">
                    <span className="label">Цена:</span>
                    <span className="value price-value">{material.price_per_m2} руб/м²</span>
                  </div>
                  <div className="property">
                    <span className="label">λ:</span>
                    <span className="value">{material.lambda} Вт/(м·K)</span>
                  </div>
                  <div className="property">
                    <span className="label">Толщина:</span>
                    <span className="value">{material.thickness} м</span>
                  </div>
                </div>
                
                <Link to={`/materials/${material.id}`} className="detail-button">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="no-results">
            <h3>Материалы не найдены</h3>
            <p>Попробуйте изменить поисковый запрос или проверьте подключение к серверу</p>
          </div>
        )}
      </div>
    </div>
  );
};