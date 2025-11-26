// src/components/Breadcrumbs.tsx
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import './Breadcrumbs.css';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav aria-label="breadcrumb" className="border-bottom py-2">
      <div className="container">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to={ROUTES.HOME} className="text-decoration-none text-dark">
              Главная
            </Link>
          </li>
          {crumbs.map((crumb, index) => (
            <li 
              key={index} 
              className={`breadcrumb-item ${index === crumbs.length - 1 ? 'active' : ''}`}
            >
              {crumb.path ? (
                <Link to={crumb.path} className="text-decoration-none text-dark">
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};