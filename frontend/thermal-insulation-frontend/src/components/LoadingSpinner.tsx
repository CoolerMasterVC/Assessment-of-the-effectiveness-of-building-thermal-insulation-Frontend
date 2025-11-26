// src/components/LoadingSpinner.tsx
import { type FC } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  message = "Загрузка..." 
}) => {
  return (
    <Container className="loading-spinner-container">
      <div className="loading-content">
        <Spinner animation="border" variant="warning" className="mb-3" />
        <p className="text-muted">{message}</p>
      </div>
    </Container>
  );
};