import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { messageService } from '../services/messageService';

const MAX_SUBJECT_LENGTH = 40;

function MessageCreate() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Validate fields
    if (!subject.trim()) {
      setError('Subject is required');
      return;
    }
    if (subject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters`);
      return;
    }
    if (!text.trim()) {
      setError('Message text is required');
      return;
    }

    try {
      setSubmitting(true);
      await messageService.create({ subject: subject.trim(), text: text.trim() });
      navigate('/');
    } catch (err) {
      setError('Failed to create message');
      setSubmitting(false);
    }
  }

  const subjectCharsLeft = MAX_SUBJECT_LENGTH - subject.length;

  return (
    <>
      <Link to="/" className="back-link">← Back to Inbox</Link>

      <header className="header">
        <h1>New Message</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            maxLength={MAX_SUBJECT_LENGTH}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject..."
            autoFocus
          />
          <div className={`char-count`}>
            {subjectCharsLeft} characters remaining
          </div>
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message..."
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? 'Creating...' : 'Create Message'}
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default MessageCreate;
