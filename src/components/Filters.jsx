import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ filters, setFilters, options }) => {
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value ? value.split(',') : null // Convierte a array
    }));
  };

  return (
    <Row className="mb-4 g-3">
      {Object.entries(options).map(([filterType, items]) => (
        <Col md={2} key={filterType}>
          <Form.Select
            multiple // Permite selección múltiple
            value={filters[filterType] || []}
            onChange={(e) => handleFilterChange(filterType, e.target.value)}
          >
            {items?.results?.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      ))}
    </Row>
  );
};

export default Filters;