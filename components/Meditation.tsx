"use client";

import React, { useState, useEffect } from 'react';

interface MeditationProps {
  buttonColor: string;
}

const Meditation: React.FC<MeditationProps> = ({ buttonColor }) => {
  const [totalTime, setTotalTime] = useState(5);
  const [breaths, setBreaths] = useState(10);
  const [started, setStarted] = useState(false);
  const [isInhale, setIsInhale] = useState(true);
  const [animationTime, setAnimationTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (started) setAnimationTime(((totalTime * 60 * 1000) / breaths) / 2);
  }, [started, totalTime, breaths]);

  useEffect(() => {
    if (!started || animationTime <= 0) return;
    const intervalId = setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsedTime = prev + 100;
        if (newElapsedTime >= animationTime) {
          setIsInhale((prev) => !prev);
          return 0;
        }
        return newElapsedTime;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [started, animationTime]);

  return (
    <div style={{ padding: '20px', color: 'var(--foreground)', textAlign: 'center' }}>
      <h2>Meditation</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Total Time (minutes): </label>
        <input
          type="number"
          value={totalTime}
          onChange={(e) => setTotalTime(Number(e.target.value))}
          style={{ padding: '5px', margin: '5px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Breaths: </label>
        <input
          type="number"
          value={breaths}
          onChange={(e) => setBreaths(Number(e.target.value))}
          style={{ padding: '5px', margin: '5px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <button
        onClick={() => setStarted((prev) => !prev)}
        style={{ padding: '10px 20px', backgroundColor: buttonColor, color: 'var(--foreground)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {started ? 'Stop' : 'Start'}
      </button>
      {started && <div style={{ marginTop: '20px', fontSize: '24px' }}>{isInhale ? 'Inhale' : 'Exhale'}</div>}
    </div>
  );
};

export default Meditation;