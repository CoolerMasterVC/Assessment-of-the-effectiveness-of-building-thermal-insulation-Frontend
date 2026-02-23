// src/components/RecentlyViewedMaterials.tsx
import { useEffect, useState } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import { MaterialCard } from './MaterialCard';
import { materialsApi } from '../modules/api'; // предполагается, что такой модуль есть
import type { Material } from '../types';

export const RecentlyViewedMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        // Используем тот же API, но с параметром recent=true
        const data = await materialsApi.getMaterials({ recent: true });
        setMaterials(data);
      } catch (err) {
        setError('Не удалось загрузить недавно просмотренные материалы');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="warning">{error}</Alert>;
  }

  if (materials.length === 0) {
    return null; // не показываем блок, если ничего не просмотрено
  }

  return (
    <div className="mt-5">
      <h4 className="mb-4">Недавно просмотренные</h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {materials.map(material => (
          <Col key={material.id}>
            <MaterialCard material={material} />
          </Col>
        ))}
      </Row>
    </div>
  );
};