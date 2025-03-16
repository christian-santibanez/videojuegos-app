import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameDetail from './pages/GameDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/:id" element={<GameDetail />} />
    </Routes>
  );
}

export default App;