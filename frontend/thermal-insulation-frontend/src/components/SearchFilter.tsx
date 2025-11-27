// src/components/SearchFilter.tsx
import { type FC, useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/slices/materialsFilterSlice';
import type { RootState } from '../store';
import './SearchFilter.css';

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchFilter: FC<SearchFilterProps> = ({ 
  onSearch, 
  placeholder = "Поиск материалов...",
  initialValue = ""
}) => {
  const searchTerm = useSelector((state: RootState) => state.materialsFilter.searchTerm);
  const dispatch = useDispatch();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || initialValue);

  // Синхронизируем локальное состояние с Redux
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    dispatch(setSearchTerm(''));
    onSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // Если поле очищено, сразу обновляем фильтр
    if (value === '') {
      dispatch(setSearchTerm(''));
      onSearch('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="search-filter">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={localSearchTerm}
          onChange={handleChange}
          className="search-input"
        />
        {localSearchTerm && (
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