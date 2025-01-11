'use client';

import React, { useState, useEffect, useCallback } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    try {
      const response = await fetch("/api/quote");
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
      setError(null);
    } catch {
      setError("Failed to fetch quote. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div style={{ padding: '20px', color: 'var(--foreground)', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
      {error ? <p>{error}</p> : quote ? (
        <blockquote>
          <p style={{ fontSize: '1.5em' }}>&quot;{quote}&quot;</p>
          <footer style={{ marginTop: '10px' }}>- {author}</footer>
        </blockquote>
      ) : <p>Loading...</p>}
      <button
        onClick={fetchQuote}
        style={{ marginTop: '20px', backgroundColor: 'var(--accent)', color: 'var(--foreground)', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '10px 20px' }}
      >
        New Quote
      </button>
    </div>
  );
};

export default Quote;