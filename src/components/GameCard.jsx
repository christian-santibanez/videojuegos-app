import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={game.background_image} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
          <span className="badge bg-primary me-2">{game.metacritic}</span>
          {game.released && new Date(game.released).getFullYear()}
        </Card.Text>
        <Link to={`/game/${game.id}`} className="btn btn-dark">
          Ver detalles
        </Link>
      </Card.Body>
    </Card>
  );
};

export default GameCard;