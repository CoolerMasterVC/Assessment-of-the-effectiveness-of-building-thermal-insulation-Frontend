import { useState, type FC, useEffect } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store';
import { userService } from '../services/userService';
import { setCurrentUser, updateUserProfile } from '../store/slices/userSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ProfilePage: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setLogin(currentUser.login);
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Валидация пароля
    if (password && password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const updateData: any = {};
    if (login !== currentUser?.login) updateData.login = login;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      setError('Нет изменений для сохранения');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile(updateData);
      dispatch(updateUserProfile(updatedUser));
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Профиль' }]} />
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="shadow">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Личный кабинет</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Профиль обновлен</Alert>}

                <Form onSubmit={handleUpdateProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder="Введите логин"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Введите новый пароль"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Подтверждение пароля</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Повторите пароль"
                    />
                  </Form.Group>

                  <Button
                    variant="warning"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Обновление...
                      </>
                    ) : (
                      'Обновить профиль'
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};