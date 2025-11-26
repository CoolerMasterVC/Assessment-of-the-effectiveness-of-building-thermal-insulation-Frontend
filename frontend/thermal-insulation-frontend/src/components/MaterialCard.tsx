import { Link } from 'react-router-dom';
import type { Material } from '../types';
import './MaterialCard.css';

interface MaterialCardProps {
  material: Material;
}

export const MaterialCard = ({ material }: MaterialCardProps) => {
  return (
    <div className="material-card">
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
            <span className="value text-success">{material.price_per_m2} руб/м²</span>
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
  );
};