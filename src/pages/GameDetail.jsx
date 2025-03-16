import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Badge, Card } from 'react-bootstrap';
import axios from 'axios';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_RAWG_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={game.background_image} />
            <Card.Body>
              <Card.Title>{game.name}</Card.Title>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg="primary">Metacritic: {game.metacritic}</Badge>
                <Badge bg="secondary">Lanzamiento: {game.released}</Badge>
              </div>
              <Card.Text>{game.description_raw}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <h3>Detalles</h3>
          <Row className="g-3">
            <Col xs={6}>
              <h5>Plataformas</h5>
              <ul>
                {game.platforms?.map(p => <li key={p.platform.id}>{p.platform.name}</li>)}
              </ul>
            </Col>
            <Col xs={6}>
              <h5>Géneros</h5>
              <ul>
                {game.genres?.map(g => <li key={g.id}>{g.name}</li>)}
              </ul>
            </Col>
            {game.clip?.clip && (
              <Col xs={12}>
                <h5>Trailer</h5>
                <div className="ratio ratio-16x9">
                  <video controls src={game.clip.clip} />
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail;