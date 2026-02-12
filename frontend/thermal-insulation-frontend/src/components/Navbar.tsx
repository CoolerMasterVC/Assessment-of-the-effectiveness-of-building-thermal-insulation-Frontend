import { type FC } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../store/slices/authSlice';
import { clearMaterials } from '../store/slices/materialsSlice';
import { clearCart } from '../store/slices/cartSlice';

export const AppNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { itemsCount } = useAppSelector((state) => state.cart);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearMaterials());
    navigate('/');
  };

  return (
    <Navbar bg="warning" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand className="fw-bold text-dark">
          <img 
            src="http://localhost:9000/images/home_icon.png" 
            alt="Логотип" 
            width="30" 
            height="30" 
            className="me-2"
          />
          Теплоизоляционные материалы
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Главная</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/materials">
              <Nav.Link>Материалы</Nav.Link>
            </LinkContainer>
            {user && (
              <>
                <LinkContainer to="/applications">
                  <Nav.Link>Мои заявки</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Профиль</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <LinkContainer to="/cart">
                  <Nav.Link className="position-relative">
                    Корзина
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown title={user.login} id="user-dropdown">
                  <NavDropdown.Item onClick={() => navigate('/profile')}>
                    Профиль
                  </NavDropdown.Item>
                  {user.is_moderator && (
                    <NavDropdown.Item onClick={() => navigate('/admin')}>
                      Панель модератора
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Вход</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Регистрация</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};