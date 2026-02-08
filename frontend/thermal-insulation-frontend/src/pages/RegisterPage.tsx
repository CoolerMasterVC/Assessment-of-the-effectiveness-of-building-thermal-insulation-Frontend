import { useState, type FC } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { registerUser } from '../store/slices/authSlice';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const RegisterPage: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const result = await dispatch(registerUser({ login, password }));
    
    if (registerUser.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: 'Регистрация' }]} />
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Card className="shadow">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Регистрация</h2>
                
                {error && (
                  <Alert variant="danger" dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder="Придумайте логин"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Придумайте пароль"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Подтверждение пароля</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Повторите пароль"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="warning"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>

                  <div className="text-center">
                    <Link to="/login" className="text-decoration-none">
                      Уже есть аккаунт? Войти
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};