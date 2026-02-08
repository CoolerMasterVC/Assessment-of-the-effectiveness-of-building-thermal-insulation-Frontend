import { type FC, useEffect } from 'react';
import { Container, Card, Table, Alert } from 'react-bootstrap';
import { useAppSelector } from '../store';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AdminPage: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.is_moderator) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          У вас нет прав для доступа к этой странице
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Панель модератора' }]} />
      <Container className="py-4">
        <Card>
          <Card.Body>
            <h2>Панель модератора</h2>
            <p className="text-muted">
              Здесь можно управлять материалами и заявками
            </p>
            
            <div className="mt-4">
              <h4>Быстрые действия:</h4>
              <ul>
                <li>Просмотр всех заявок</li>
                <li>Управление материалами</li>
                <li>Завершение/отклонение заявок</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};