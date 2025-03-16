import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import GameCard from '../components/GameCard';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const API_KEY = process.env.REACT_APP_RAWG_KEY;

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Convertir filtros de arrays a strings separados por comas
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters)
          .filter(([_, value]) => value.length > 0)
          .map(([key, value]) => [key, Array.isArray(value) ? value.join(',') : value])
      );

      const params = {
        key: API_KEY,
        ordering: '-metacritic',
        search: searchQuery,
        ...cleanedFilters
      };

      const { data } = await axios.get('https://api.rawg.io/api/games', { 
        params,
        timeout: 10000 
      });
      
      setGames(data.results);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al cargar los juegos');
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const endpoints = {
        genres: 'genres',
        platforms: 'platforms',
        tags: 'tags',
        developers: 'developers',
        stores: 'stores'
      };

      const options = {};
      
      for (const [key, endpoint] of Object.entries(endpoints)) {
        const { data } = await axios.get(`https://api.rawg.io/api/${endpoint}`, {
          params: { key: API_KEY },
          timeout: 5000
        });
        options[key] = data;
      }

      setFilterOptions(options);
    } catch (error) {
      console.error("Error fetching filters:", error);
      setError('Error al cargar los filtros');
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchFilterOptions();
      await fetchGames();
    };
    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery || Object.keys(filters).length > 0) {
        fetchGames();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGames();
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">🎮 Top Videojuegos</h1>
      
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <Filters 
        filters={filters}
        setFilters={setFilters}
        options={filterOptions}
      />

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {games.length === 0 ? (
            <Alert variant="info" className="mt-4">
              No se encontraron juegos con los filtros seleccionados
            </Alert>
          ) : (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {games.map(game => (
                <Col key={game.id}>
                  <GameCard game={game} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;