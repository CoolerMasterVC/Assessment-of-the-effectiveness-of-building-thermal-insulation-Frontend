// src/components/SearchFilter.tsx
import { type FC, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './SearchFilter.css';

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export const SearchFilter: FC<SearchFilterProps> = ({ 
  onSearch, 
  placeholder = "Поиск материалов..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Form onSubmit={handleSubmit} className="search-filter">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <Button 
            variant="outline-secondary" 
            onClick={handleClear}
            className="clear-btn"
          >
            ×
          </Button>
        )}
        <Button 
          variant="warning" 
          type="submit"
          className="search-btn"
        >
          Найти
        </Button>
      </InputGroup>
    </Form>
  );
};