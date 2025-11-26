// src/components/Navbar.tsx
import { type FC } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ROUTES, ROUTE_LABELS } from '../Routes';

export const AppNavbar: FC = () => {
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
            <LinkContainer to={ROUTES.HOME}>
              <Nav.Link>Главная</Nav.Link>
            </LinkContainer>
            <LinkContainer to={ROUTES.MATERIALS}>
              <Nav.Link>Материалы</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};