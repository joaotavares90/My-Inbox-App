import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { messageService } from '../services/messageService';

function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadMessage();
  }, [id]);

  async function loadMessage() {
    try {
      setLoading(true);
      const data = await messageService.getById(id);
      setMessage(data);
    } catch (err) {
      setError('Failed to load message');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      setDeleting(true);
      await messageService.delete(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete message');
      setDeleting(false);
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
    return <div className="loading">Loading message...</div>;
  }

  if (error || !message) {
    return (
      <>
        <Link to="/" className="back-link">← Back to Inbox</Link>
        <div className="error-message">{error || 'Message not found'}</div>
      </>
    );
  }

  return (
    <>
      <Link to="/" className="back-link">← Back to Inbox</Link>

      <div className="message-detail">
        <div className="message-detail-header">
          <h2>{message.subject}</h2>
          <div className="message-detail-date">{formatDate(message.date)}</div>
        </div>

        <div className="message-detail-text">{message.text}</div>

        <div className="message-detail-actions">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-danger"
          >
            {deleting ? 'Deleting...' : 'Delete Message'}
          </button>
        </div>
      </div>
    </>
  );
}

export default MessageDetail;
