import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState('loading');

  async function loadQuote() {
    setStatus('loading');

    try {
      const response = await fetch('/api/today-quote');
      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      setQuote(data.quote);
      setStatus(data.quote ? 'ready' : 'empty');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    loadQuote();
  }, []);

  const today = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Today's Quote home">
          <span className="wordmark-mark" aria-hidden="true">Q</span>
          <span>QUOTE / DAILY</span>
        </a>
        <span className="topbar-note">A MOMENT TO KEEP</span>
      </header>

      <section className="quote-stage" aria-labelledby="page-title">
        <div className="date-line">
          <span className="date-dot" aria-hidden="true" />
          <time>{today}</time>
        </div>
        <h1 id="page-title">A thought<br />for today.</h1>

        <div className={`quote-content quote-content-${status}`} aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' && <p className="status-message">Finding today's words<span className="loading-mark">...</span></p>}
          {status === 'ready' && (
            <blockquote>
              <span className="quote-mark" aria-hidden="true">“</span>
              <p>{quote}</p>
            </blockquote>
          )}
          {status === 'empty' && <p className="status-message">No quote is scheduled for today.</p>}
          {status === 'error' && (
            <div className="error-message">
              <p>Today's quote couldn't be reached.</p>
              <button type="button" onClick={loadQuote}>Try again <span aria-hidden="true">↗</span></button>
            </div>
          )}
        </div>

        <div className="stage-index" aria-hidden="true"><span>01</span><span className="index-rule" /><span>01</span></div>
      </section>

      <footer className="footer">
        <span>WORDS FOR THE DAY</span>
        <span className="footer-symbol" aria-hidden="true">✳</span>
        <span>MAKE THEM COUNT</span>
      </footer>
    </main>
  );
}

export default App;