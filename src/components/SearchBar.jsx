import { Form } from 'react-bootstrap';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Form onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Buscar juegos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />
    </Form>
  );
};

export default SearchBar;