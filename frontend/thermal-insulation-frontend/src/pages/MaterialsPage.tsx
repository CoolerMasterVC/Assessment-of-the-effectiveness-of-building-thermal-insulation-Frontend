import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { materialsApi } from '../modules/api';
import type { Material } from '../types';
import { ROUTES } from '../Routes';
import { SearchFilter } from '../components/SearchFilter';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import './MaterialsPage.css';

export const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'checking' | 'success' | 'error' | 'mock'>('checking');

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
          <h1 className="page-title">Теплоизоляционные материалы</h1>
        </div>
        
        <p className="page-subtitle">
          Подбор оптимальных теплоизоляционных материалов для ваших задач
        </p>

        {/* Заменяем простое поле ввода на компонент SearchFilter */}
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Поиск по названию или описанию..."
        />

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