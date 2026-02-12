import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, Button, Badge, Container, Row, Col, 
  Table, Alert, Spinner, Modal, Form 
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  getApplicationById, 
  submitApplication, 
  completeApplication,
  rejectApplication,
  deleteApplication,
  removeMaterialFromApplication,
  updateApplicationMaterial,
  updateApplication // ДОБАВИЛИ
} from '../store/slices/applicationsSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { format } from 'date-fns';

export const ApplicationDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentApplication, loading } = useAppSelector((state) => state.applications);
  const { user } = useAppSelector((state) => state.auth);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [areaUpdates, setAreaUpdates] = useState<Record<number, number>>({});
  const [updateData, setUpdateData] = useState({
    indoor_temp: 22,
    outdoor_temp: -15,
    total_area: 0,
  });

  useEffect(() => {
    if (id) {
      dispatch(getApplicationById(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentApplication) {
      setUpdateData({
        indoor_temp: currentApplication.indoor_temp,
        outdoor_temp: currentApplication.outdoor_temp,
        total_area: currentApplication.total_area,
      });
    }
  }, [currentApplication]);

  const isOwner = currentApplication?.creator_id === user?.id;
  const isModerator = user?.is_moderator;
  const isDraft = currentApplication?.status === 'черновик';

  // МЕТОД 1: Отправить заявку на рассмотрение
  const handleSubmit = async () => {
    if (id && confirm('Отправить заявку на рассмотрение?')) {
      try {
        await dispatch(submitApplication(parseInt(id))).unwrap();
        alert('✅ Заявка отправлена на рассмотрение!');
        navigate('/applications');
      } catch (error) {
        alert('❌ Ошибка при отправке заявки');
      }
    }
  };

  // МЕТОД 2: Завершить заявку (только модератор)
  const handleComplete = async () => {
    if (id && confirm('Завершить заявку?')) {
      try {
        await dispatch(completeApplication(parseInt(id))).unwrap();
        alert('✅ Заявка завершена!');
      } catch (error) {
        alert('❌ Ошибка при завершении заявки');
      }
    }
  };

  // МЕТОД 3: Отклонить заявку (только модератор)
  const handleReject = async () => {
    if (id && confirm('Отклонить заявку?')) {
      try {
        await dispatch(rejectApplication(parseInt(id))).unwrap();
        alert('✅ Заявка отклонена!');
      } catch (error) {
        alert('❌ Ошибка при отклонении заявки');
      }
    }
  };

  // МЕТОД 4: Обновить данные заявки
  const handleUpdateApplication = async () => {
    if (id) {
      try {
        await dispatch(updateApplication({
          id: parseInt(id),
          data: updateData
        })).unwrap();
        setShowUpdateModal(false);
        alert('✅ Данные заявки обновлены!');
      } catch (error) {
        alert('❌ Ошибка при обновлении заявки');
      }
    }
  };

  // МЕТОД 5: Удалить заявку
  const handleDelete = async () => {
    if (id) {
      try {
        await dispatch(deleteApplication(parseInt(id))).unwrap();
        setShowDeleteModal(false);
        alert('✅ Заявка удалена!');
        navigate('/applications');
      } catch (error) {
        alert('❌ Ошибка при удалении заявки');
      }
    }
  };

  // МЕТОД 6: Удалить материал из заявки
  const handleRemoveMaterial = async (materialId: number) => {
    if (id && confirm('Удалить материал из заявки?')) {
      try {
        await dispatch(removeMaterialFromApplication({
          appId: parseInt(id),
          materialId
        })).unwrap();
        alert('✅ Материал удален из заявки!');
      } catch (error) {
        alert('❌ Ошибка при удалении материала');
      }
    }
  };

  // МЕТОД 7: Обновить площадь материала
  const handleUpdateArea = async (materialId: number) => {
    if (id && areaUpdates[materialId] && areaUpdates[materialId] > 0) {
      try {
        await dispatch(updateApplicationMaterial({
          appId: parseInt(id),
          materialId,
          area: areaUpdates[materialId]
        })).unwrap();
        setAreaUpdates(prev => ({ ...prev, [materialId]: 0 }));
        alert('✅ Площадь материала обновлена!');
      } catch (error) {
        alert('❌ Ошибка при обновлении площади');
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Загрузка данных заявки...</p>
      </Container>
    );
  }

  if (!currentApplication) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Заявка не найдена</h4>
          <p>Возможно, заявка была удалена или у вас нет к ней доступа.</p>
          <Button variant="outline-danger" onClick={() => navigate('/applications')}>
            Вернуться к списку заявок
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Breadcrumbs crumbs={[
        { label: 'Заявки', path: '/applications' },
        { label: `Заявка #${currentApplication.id}` }
      ]} />

      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="border-warning">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h2>Заявка #{currentApplication.id}</h2>
                    <Badge bg={
                      currentApplication.status === 'черновик' ? 'secondary' :
                      currentApplication.status === 'сформирован' ? 'warning' :
                      currentApplication.status === 'завершён' ? 'success' : 'danger'
                    } className="fs-6 px-3 py-2">
                      {currentApplication.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-2">
                    {isDraft && isOwner && (
                      <>
                        <Button variant="warning" onClick={handleSubmit}>
                          Отправить на рассмотрение
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          onClick={() => setShowUpdateModal(true)}
                        >
                          Редактировать
                        </Button>
                      </>
                    )}
                    
                    {isModerator && currentApplication.status === 'сформирован' && (
                      <>
                        <Button variant="success" onClick={handleComplete}>
                          Завершить
                        </Button>
                        <Button variant="danger" onClick={handleReject}>
                          Отклонить
                        </Button>
                      </>
                    )}
                    
                    {isOwner && isDraft && (
                      <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                        Удалить
                      </Button>
                    )}
                  </div>
                </div>

                <Row className="mt-4">
                  <Col md={6}>
                    <h5>Информация о заявке</h5>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td><strong>Создатель:</strong></td>
                          <td>{currentApplication.creator?.login || 'Неизвестно'}</td>
                        </tr>
                        <tr>
                          <td><strong>Дата создания:</strong></td>
                          <td>{format(new Date(currentApplication.created_at), 'dd.MM.yyyy HH:mm')}</td>
                        </tr>
                        {currentApplication.submitted_at && (
                          <tr>
                            <td><strong>Дата отправки:</strong></td>
                            <td>{format(new Date(currentApplication.submitted_at), 'dd.MM.yyyy HH:mm')}</td>
                          </tr>
                        )}
                        {currentApplication.completed_at && (
                          <tr>
                            <td><strong>Дата завершения:</strong></td>
                            <td>{format(new Date(currentApplication.completed_at), 'dd.MM.yyyy HH:mm')}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <h5>Технические параметры</h5>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td><strong>Общая площадь:</strong></td>
                          <td>{currentApplication.total_area.toFixed(2)} м²</td>
                        </tr>
                        <tr>
                          <td><strong>Температура внутри:</strong></td>
                          <td>{currentApplication.indoor_temp}°C</td>
                        </tr>
                        <tr>
                          <td><strong>Температура снаружи:</strong></td>
                          <td>{currentApplication.outdoor_temp}°C</td>
                        </tr>
                        {currentApplication.total_savings > 0 && (
                          <tr>
                            <td><strong>Экономия:</strong></td>
                            <td className="text-success fw-bold">
                              {currentApplication.total_savings.toFixed(2)} руб/мес
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h4 className="mb-3">Материалы в заявке</h4>
                
                {currentApplication.materials?.length === 0 ? (
                  <Alert variant="info">
                    <span className="fw-bold">Материалы не добавлены</span>
                    <p className="mb-0 mt-2">Добавьте материалы из каталога для создания заявки</p>
                  </Alert>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead className="table-warning">
                      <tr>
                        <th>Материал</th>
                        <th>Площадь, м²</th>
                        <th>Цена, руб/м²</th>
                        <th>λ, Вт/(м·K)</th>
                        <th>Стоимость</th>
                        {isDraft && <th>Действия</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentApplication.materials?.map((item) => (
                        <tr key={item.material_id}>
                          <td>
                            <div className="fw-bold">{item.material?.name}</div>
                            <small className="text-muted">{item.material?.description}</small>
                          </td>
                          <td>
                            {isDraft ? (
                              <div className="d-flex gap-2 align-items-center">
                                <Form.Control
                                  type="number"
                                  size="sm"
                                  style={{ width: '120px' }}
                                  defaultValue={item.area}
                                  min="0.1"
                                  step="0.1"
                                  onChange={(e) => setAreaUpdates({
                                    ...areaUpdates,
                                    [item.material_id]: parseFloat(e.target.value)
                                  })}
                                />
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() => handleUpdateArea(item.material_id)}
                                  disabled={!areaUpdates[item.material_id]}
                                >
                                  Обновить
                                </Button>
                              </div>
                            ) : (
                              <span className="fw-bold">{item.area.toFixed(2)}</span>
                            )}
                          </td>
                          <td>{item.material?.price_per_m2?.toFixed(2)}</td>
                          <td>{item.material?.lambda}</td>
                          <td className="fw-bold text-success">
                            {(item.area * (item.material?.price_per_m2 || 0)).toFixed(2)} руб
                          </td>
                          {isDraft && (
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleRemoveMaterial(item.material_id)}
                              >
                                Удалить
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                      <tr className="table-secondary">
                        <td colSpan={4} className="text-end fw-bold">Итого:</td>
                        <td className="fw-bold">
                          {currentApplication.materials?.reduce(
                            (sum, item) => sum + (item.area * (item.material?.price_per_m2 || 0)), 
                            0
                          ).toFixed(2)} руб
                        </td>
                        {isDraft && <td></td>}
                      </tr>
                    </tbody>
                  </Table>
                )}
                
                {isDraft && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline-success" 
                      onClick={() => navigate('/materials')}
                    >
                      ＋ Добавить материалы
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Модальное окно редактирования заявки */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Редактирование заявки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Температура внутри (°C)</Form.Label>
              <Form.Control
                type="number"
                value={updateData.indoor_temp}
                onChange={(e) => setUpdateData({...updateData, indoor_temp: parseFloat(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Температура снаружи (°C)</Form.Label>
              <Form.Control
                type="number"
                value={updateData.outdoor_temp}
                onChange={(e) => setUpdateData({...updateData, outdoor_temp: parseFloat(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Общая площадь (м²)</Form.Label>
              <Form.Control
                type="number"
                value={updateData.total_area}
                onChange={(e) => setUpdateData({...updateData, total_area: parseFloat(e.target.value)})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleUpdateApplication}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно удаления заявки */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🗑️ Удаление заявки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <p className="mb-0 fw-bold">Вы уверены, что хотите удалить заявку #{currentApplication.id}?</p>
            <p className="mb-0 mt-2">Это действие нельзя отменить.</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Удалить заявку
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};