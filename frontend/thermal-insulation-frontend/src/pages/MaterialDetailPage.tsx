import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { materialsApi } from '../modules/api';
import type { Material } from '../types';
import { ROUTES } from '../Routes';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import './MaterialDetailPage.css';

export const MaterialDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadMaterial = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        const materialId = parseInt(id);
        const data = await materialsApi.getMaterial(materialId);
        setMaterial(data);
      } catch (err) {
        setError('Материал не найден');
        console.error('Error loading material:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMaterial();
  }, [id]);

  if (loading) {
    return (
      <div className="material-detail-page">
        <Breadcrumbs crumbs={[
          { label: 'Материалы', path: ROUTES.MATERIALS },
          { label: 'Загрузка...' }
        ]} />
        <LoadingSpinner message="Загружаем информацию о материале..." />
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="material-detail-page">
        <Breadcrumbs crumbs={[
          { label: 'Материалы', path: ROUTES.MATERIALS },
          { label: 'Ошибка' }
        ]} />
        <div className="container py-5">
          <div className="text-center">
            <h2>{error || 'Материал не найден'}</h2>
            <p className="text-muted mb-4">Попробуйте вернуться к списку материалов</p>
            <Link to={ROUTES.MATERIALS} className="btn btn-warning">
              Вернуться к материалам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="material-detail-page">
      {/* Хлебные крошки */}
      <Breadcrumbs crumbs={[
        { label: 'Материалы', path: ROUTES.MATERIALS },
        { label: material.name }
      ]} />

      <div className="container py-4">
        <div className="row">
          {/* Изображение */}
          <div className="col-md-6 mb-4">
            <div className="material-image-wrapper">
              <img 
                src={material.image_url}
                alt={material.name}
                className="material-detail-image"
              />
            </div>
          </div>
          
          {/* Информация */}
          <div className="col-md-6">
            <div className="material-info">
              <h1 className="material-title">{material.name}</h1>
              <p className="material-description">{material.description}</p>
              
              <div className="material-properties-detail">
                <h3 className="properties-title">Характеристики</h3>
                
                <div className="property-detail">
                  <span className="property-label">Цена за м²:</span>
                  <span className="property-value price-value">
                    {material.price_per_m2} руб
                  </span>
                </div>
                
                <div className="property-detail">
                  <span className="property-label">Коэффициент теплопроводности (λ):</span>
                  <span className="property-value">{material.lambda} Вт/(м·K)</span>
                </div>
                
                <div className="property-detail">
                  <span className="property-label">Толщина:</span>
                  <span className="property-value">{material.thickness} м</span>
                </div>
                
                <div className="property-detail">
                  <span className="property-label">Статус:</span>
                  <span className="property-value status-value">
                    {material.status === 'действует' ? 'Доступен' : 'Недоступен'}
                  </span>
                </div>
                
                <div className="property-detail">
                  <span className="property-label">Добавлен:</span>
                  <span className="property-value">
                    {new Date(material.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};