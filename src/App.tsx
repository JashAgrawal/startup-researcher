import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdeaInput from './components/IdeaInput';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<IdeaInput />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;