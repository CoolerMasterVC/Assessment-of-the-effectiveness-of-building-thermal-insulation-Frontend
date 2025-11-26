// src/pages/HomePage.tsx
import type { FC } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const HomePage: FC = () => {
  return (
    <div>
      {/* Хлебные крошки */}
      <Breadcrumbs crumbs={[]} />

      {/* Hero Section */}
      <section className="bg-warning py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 fw-bold mb-4">
                Оценка эффективности теплоизоляции здания
              </h1>
              <p className="lead mb-4">
                Профессиональный расчет теплопотерь и экономии энергии после утепления. 
                Сравнение различных изоляционных материалов для вашего проекта.
              </p>
              <Link to={ROUTES.MATERIALS}>
                <Button variant="dark" size="lg">
                  Рассчитать экономию
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Carousel Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold">Экономическая оценка теплоизоляции</h2>
              <p className="text-muted">
                Ключевые аспекты расчета эффективности утепления зданий
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              {/* Карусель с информацией о системе */}
              <Carousel className="mb-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Carousel.Item>
                  <div style={{ 
                    height: '400px', 
                    background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px'
                  }}>
                    <div className="text-center">
                      <h2>Точный расчет теплопотерь</h2>
                      <p className="lead">Используйте проверенные формулы для точной оценки эффективности теплоизоляции</p>
                    </div>
                  </div>
                </Carousel.Item>
                
                <Carousel.Item>
                  <div style={{ 
                    height: '400px', 
                    background: 'linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px'
                  }}>
                    <div className="text-center">
                      <h2>Профессиональный инструмент</h2>
                      <p className="lead">Разработано для строителей, архитекторов и инженеров</p>
                    </div>
                  </div>
                </Carousel.Item>
                
                <Carousel.Item>
                  <div style={{ 
                    height: '400px', 
                    background: 'linear-gradient(135deg, #ffa000 0%, #ff6f00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px'
                  }}>
                    <div className="text-center">
                      <h2>Удобный интерфейс</h2>
                      <p className="lead">Интуитивно понятная система для быстрого расчета экономии</p>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Возможности системы</h2>
              <p className="text-muted">
                Комплексный подход к оценке эффективности теплоизоляционных материалов
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <span className="fs-2">📈</span>
                  </div>
                  <Card.Title>Расчет экономии</Card.Title>
                  <Card.Text>
                    Точный расчет экономии тепловой энергии и сроков окупаемости 
                    теплоизоляционных материалов
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <span className="fs-2">🔍</span>
                  </div>
                  <Card.Title>Сравнение материалов</Card.Title>
                  <Card.Text>
                    Сравнение характеристик минеральной ваты, пенополистирола, 
                    PIR-плит и других материалов
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <span className="fs-2">💾</span>
                  </div>
                  <Card.Title>Сохранение заявок</Card.Title>
                  <Card.Text>
                    Создание и сохранение заявок на материалы для дальнейшего 
                    анализа и сравнения
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};