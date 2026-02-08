import { type FC, useEffect } from 'react';
import { Table, Button, Badge, Container, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { getApplications, setFilters } from '../store/slices/applicationsSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { format } from 'date-fns';

export const ApplicationsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { applications, loading, error, filters } = useAppSelector((state) => state.applications);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getApplications(filters));
    }
  }, [dispatch, user, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'черновик': 'secondary',
      'сформирован': 'warning',
      'завершён': 'success',
      'отклонён': 'danger',
      'удалён': 'dark',
    };
    return <Badge bg={variants[status] || 'primary'}>{status}</Badge>;
  };

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Мои заявки' }]} />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Мои заявки</h1>
          <Link to="/cart">
            <Button variant="warning">Новая заявка</Button>
          </Link>
        </div>

        <div className="mb-3">
          <select
            className="form-select w-auto"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Все статусы</option>
            <option value="черновик">Черновик</option>
            <option value="сформирован">Сформирован</option>
            <option value="завершён">Завершён</option>
            <option value="отклонён">Отклонён</option>
          </select>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : applications.length === 0 ? (
          <Alert variant="info">
            У вас пока нет заявок. <Link to="/materials">Добавьте материалы</Link> в корзину.
          </Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата создания</th>
                <th>Статус</th>
                <th>Материалов</th>
                <th>Общая площадь</th>
                <th>Экономия</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{format(new Date(app.created_at), 'dd.MM.yyyy HH:mm')}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>{app.materials?.length || 0}</td>
                  <td>{app.total_area} м²</td>
                  <td>{app.total_savings > 0 ? `${app.total_savings} руб/мес` : '-'}</td>
                  <td>
                    <Link to={`/applications/${app.id}`}>
                      <Button variant="outline-primary" size="sm">
                        Просмотр
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};