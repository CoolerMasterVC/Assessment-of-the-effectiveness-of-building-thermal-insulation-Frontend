import { type FC, useEffect } from 'react';
import { Container, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { getCartInfo } from '../store/slices/cartSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CartPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { draftId, itemsCount, loading, error } = useAppSelector((state) => state.cart);
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Загружаем информацию о корзине только если пользователь авторизован
    if (token) {
      dispatch(getCartInfo());
    }
  }, [dispatch, token]);

  if (loading && token) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Корзина' }]} />
      <Container className="py-4">
        <Card>
          <Card.Body>
            <h2>Корзина</h2>
            
            {!user ? (
              <Alert variant="warning" className="mt-3">
                Для работы с корзиной необходимо{' '}
                <Link to="/login">войти в систему</Link>
              </Alert>
            ) : !draftId ? (
              <Alert variant="info" className="mt-3">
                Ваша корзина пуста. <Link to="/materials">Добавьте материалы</Link>
              </Alert>
            ) : error ? (
              <Alert variant="danger" className="mt-3">
                Ошибка загрузки корзины: {error}
              </Alert>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4>Черновик заявки #{draftId}</h4>
                    <p className="text-muted mb-0">
                      <Badge bg="warning" className="me-2">
                        Материалов: {itemsCount}
                      </Badge>
                    </p>
                  </div>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/applications/${draftId}`)}
                  >
                    Перейти к заявке
                  </Button>
                </div>

                <Alert variant="info">
                  Для просмотра деталей заявки перейдите по ссылке выше
                </Alert>
              </>
            )}
            
            <div className="mt-4 d-flex gap-2">
              <Link to="/materials">
                <Button variant="outline-primary">К материалам</Button>
              </Link>
              {draftId && (
                <Link to={`/applications/${draftId}`}>
                  <Button variant="warning">Редактировать заявку</Button>
                </Link>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};