import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { messageService } from '../services/messageService';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await messageService.getAll();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  // Format date as dd.mm.YYYY - in the future it can be a function in the utils folder
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <>
      <header className="header">
        <h1>My Inbox</h1>
        <Link to="/create" className="btn btn-primary">
          + New Message
        </Link>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="message-list">
        {messages.length === 0 ? (
          <div className="empty-state">
            No messages to display.
          </div>
        ) : (
          messages.map((message) => (
            <Link
              key={message.id}
              to={`/messages/${message.id}`}
              className="message-item"
            >
              <div className="message-subject">{message.subject}</div>
              <div className="message-date">{formatDate(message.date)}</div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export default MessageList;
