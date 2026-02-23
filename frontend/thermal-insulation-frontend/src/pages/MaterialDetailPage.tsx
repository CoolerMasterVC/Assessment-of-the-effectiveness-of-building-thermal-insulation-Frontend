import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { materialService } from '../services/materialService';
import { setCurrentMaterial, setLoading, setError } from '../store/slices/materialsSlice';
import { addMaterialToDraft } from '../store/slices/cartSlice';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ROUTES } from '../Routes';
import { RecentlyViewedMaterials } from '../components/RecentlyViewedMaterials';
import './MaterialDetailPage.css';

export const MaterialDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [area, setArea] = useState(10);
  const dispatch = useAppDispatch();
  
  const { currentMaterial, loading, error } = useAppSelector((state) => state.materials);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const loadMaterial = async () => {
      if (!id) return;
      
      try {
        dispatch(setLoading(true));
        const materialId = parseInt(id);
        const data = await materialService.getMaterial(materialId);
        dispatch(setCurrentMaterial(data));
      } catch (err: any) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadMaterial();
  }, [id, dispatch]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Для добавления в корзину необходимо войти в систему');
      return;
    }
    
    if (!id) return;
    
    try {
      await dispatch(addMaterialToDraft({ 
        materialId: parseInt(id), 
        area 
      })).unwrap();
      alert('Материал добавлен в корзину');
    } catch (err) {
      alert('Ошибка при добавлении в корзину');
    }
  };

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

  if (error || !currentMaterial) {
    return (
      <div className="material-detail-page">
        <Breadcrumbs crumbs={[
          { label: 'Материалы', path: ROUTES.MATERIALS },
          { label: 'Ошибка' }
        ]} />
        <div className="container py-5">
          <div className="text-center">
            <h2>{error || 'Материал не найден'}</h2>
            <Link to={ROUTES.MATERIALS} className="btn btn-warning">
              Вернуться к материалам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <><div className="material-detail-page">
      <Breadcrumbs crumbs={[
        { label: 'Материалы', path: ROUTES.MATERIALS },
        { label: currentMaterial.name }
      ]} />

      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="material-image-wrapper">
              <img
                src={currentMaterial.image_url}
                alt={currentMaterial.name}
                className="material-detail-image" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="material-info">
              <h1 className="material-title">{currentMaterial.name}</h1>
              <p className="material-description">{currentMaterial.description}</p>

              <div className="material-properties-detail">
                <h3 className="properties-title">Характеристики</h3>

                <div className="property-detail">
                  <span className="property-label">Цена за м²:</span>
                  <span className="property-value price-value">
                    {currentMaterial.price_per_m2} руб
                  </span>
                </div>

                <div className="property-detail">
                  <span className="property-label">Коэффициент теплопроводности (λ):</span>
                  <span className="property-value">{currentMaterial.lambda} Вт/(м·K)</span>
                </div>

                <div className="property-detail">
                  <span className="property-label">Толщина:</span>
                  <span className="property-value">{currentMaterial.thickness} м</span>
                </div>

                <div className="property-detail">
                  <span className="property-label">Статус:</span>
                  <span className="property-value status-value">
                    {currentMaterial.status === 'действует' ? 'Доступен' : 'Недоступен'}
                  </span>
                </div>

                <div className="property-detail">
                  <span className="property-label">Добавлен:</span>
                  <span className="property-value">
                    {new Date(currentMaterial.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>

              {user && (
                <div className="mt-4">
                  <div className="mb-3">
                    <label className="form-label">Площадь для утепления (м²):</label>
                    <input
                      type="number"
                      className="form-control"
                      value={area}
                      onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
                      min="0.1"
                      step="0.1" />
                  </div>
                  <button
                    className="btn btn-warning w-100"
                    onClick={handleAddToCart}
                  >
                    Добавить в заявку ({area} м²)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        <RecentlyViewedMaterials />
      </div></>
    
  );
};