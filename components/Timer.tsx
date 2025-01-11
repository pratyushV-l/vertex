'use client';

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const interval = setInterval(() => setTime((prev) => Math.max(prev - 10, 0)), 10);
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartPause = () => {
    if (!isRunning && time === 0) {
      const totalTime = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
      setTime(totalTime);
      setTotalTime(totalTime);
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTotalTime(0);
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = Math.floor(time / 60000);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const calculateProgress = () => (totalTime ? ((totalTime - time) / totalTime) * 100 : 0);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ padding: '20px', color: 'var(--foreground)', textAlign: 'center' }}>
      <h2>Timer</h2>
      <div style={{ position: 'relative', width: '220px', height: '220px', margin: '20px auto' }}>
        <svg width="220" height="220">
          <circle cx="110" cy="110" r={radius} stroke="var(--background)" strokeWidth="10" fill="none" />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="var(--foreground)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (calculateProgress() / 100) * circumference}
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px' }}>
          {formatTime(time)}
        </div>
      </div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <select value={hours} onChange={(e) => setHours(Number(e.target.value))} style={{ padding: '5px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid #ccc', borderRadius: '4px' }}>
          {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} style={{ padding: '5px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid #ccc', borderRadius: '4px' }}>
          {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} style={{ padding: '5px', backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid #ccc', borderRadius: '4px' }}>
          {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <button onClick={handleStartPause} style={{ padding: '10px 20px', backgroundColor: '#92FFB0', color: 'var(--foreground)', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} style={{ padding: '10px 20px', backgroundColor: '#FF929F', color: 'var(--foreground)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;