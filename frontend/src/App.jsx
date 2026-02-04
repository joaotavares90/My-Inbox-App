import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MessageList from './pages/MessageList';
import MessageDetail from './pages/MessageDetail';
import MessageCreate from './pages/MessageCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<MessageList />} />
          <Route path="/messages/:id" element={<MessageDetail />} />
          <Route path="/create" element={<MessageCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
