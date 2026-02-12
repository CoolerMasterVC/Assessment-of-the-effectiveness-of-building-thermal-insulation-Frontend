import { type FC, useEffect, useState } from 'react';
import { Table, Button, Badge, Container, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { getApplications, setFilters, completeApplication, rejectApplication } from '../store/slices/applicationsSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { format } from 'date-fns';

export const ApplicationsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { applications, loading, error, filters } = useAppSelector((state) => state.applications);
  const { user } = useAppSelector((state) => state.auth);
  const [pollingInterval, setPollingInterval] = useState<ReturnType<typeof setInterval> | null>(null); // Исправлено

  // Функция загрузки с short polling
  const loadApplications = () => {
    if (user) {
      dispatch(getApplications(filters));
    }
  };

  useEffect(() => {
    loadApplications();
    
    // Short polling каждые 10 секунд
    const interval = setInterval(loadApplications, 10000);
    setPollingInterval(interval);
    
    return () => clearInterval(interval);
  }, [user, filters]);

  // Исправленные обработчики
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Преобразуем имена для Redux
    const reduxName = name === 'start_date' ? 'startDate' : name === 'end_date' ? 'endDate' : name;
    dispatch(setFilters({ [reduxName]: value }));
  };

  const handleComplete = async (id: number) => {
    if (window.confirm('Завершить заявку с расчетом экономии?')) {
      try {
        await dispatch(completeApplication(id));
        alert('Расчет запущен. Результаты появятся через 10 секунд.');
      } catch (err) {
        alert('Ошибка');
      }
    }
  };

  const handleReject = async (id: number) => {
    if (window.confirm('Отклонить заявку?')) {
      await dispatch(rejectApplication(id));
    }
  };

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: user?.is_moderator ? 'Все заявки' : 'Мои заявки' }]} />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            {user?.is_moderator ? 'Все заявки' : 'Мои заявки'}
            {pollingInterval && <Badge bg="info" className="ms-2">Live</Badge>}
          </h1>
          <Link to="/cart">
            <Button variant="warning">Новая заявка</Button>
          </Link>
        </div>

        {/* Фильтры */}
        {user?.is_moderator && (
          <div className="mb-4 p-3 border rounded bg-light">
            <h5>Фильтры</h5>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Статус</Form.Label>
                  <Form.Select 
                    name="status" 
                    value={filters.status} 
                    onChange={handleFilterChange}
                  >
                    <option value="">Все</option>
                    <option value="черновик">Черновик</option>
                    <option value="сформирован">Сформирован</option>
                    <option value="завершён">Завершён</option>
                    <option value="отклонён">Отклонён</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>С даты</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="start_date" 
                    value={filters.startDate} 
                    onChange={handleDateChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>По дату</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="end_date" 
                    value={filters.endDate} 
                    onChange={handleDateChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {loading && applications.length === 0 ? (
          <div className="text-center py-5"><Spinner /></div>
        ) : applications.length === 0 ? (
          <Alert variant="info">Нет заявок</Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Материалов</th>
                <th>Рассчитано</th>
                <th>Площадь</th>
                <th>Экономия</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{format(new Date(app.created_at), 'dd.MM.yyyy HH:mm')}</td>
                  <td>
                    <Badge bg={
                      app.status === 'черновик' ? 'secondary' :
                      app.status === 'сформирован' ? 'warning' :
                      app.status === 'завершён' ? 'success' : 'danger'
                    }>
                      {app.status}
                    </Badge>
                  </td>
                  <td>{app.materials_count}</td>
                  <td>
                    <Badge bg={app.materials_with_result_count > 0 ? 'success' : 'secondary'}>
                      {app.materials_with_result_count || 0}/{app.materials_count}
                    </Badge>
                  </td>
                  <td>{app.total_area} м²</td>
                  <td>{app.total_savings > 0 ? `${app.total_savings.toFixed(2)} руб` : '-'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/applications/${app.id}`}>
                        <Button variant="outline-primary" size="sm">Просмотр</Button>
                      </Link>
                      {user?.is_moderator && app.status === 'сформирован' && (
                        <>
                          <Button variant="success" size="sm" onClick={() => handleComplete(app.id)}>
                            Завершить
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleReject(app.id)}>
                            Отклонить
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        
        <div className="text-muted small mt-3">
          <i>Данные обновляются каждые 10 секунд</i>
        </div>
      </Container>
    </div>
  );
};