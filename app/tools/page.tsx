'use client';

import React, { useState } from 'react';
import Meditation from '@/components/Meditation';
import Quote from '@/components/Quote';
import Timer from '@/components/Timer';
import ActivityLog from '@/components/ActivityLog';
import Calculator from '@/components/Calculator';
import HabitTracker from '@/components/HabitTracker';
import Image from 'next/image';

const Page = () => {
  const [showStickyNotes, setShowStickyNotes] = useState(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <Image src='/favicon.ico' width={50} height={50} alt="logo" />
          <span style={styles.logoText}>vertex.</span>
        </div>
        <h1 style={styles.title}>Wellness Dashboard</h1>
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <Meditation buttonColor="var(--accent)" />
        </section>
        <section style={styles.section}>
          <Quote />
        </section>
        <section style={styles.section}>
          <Timer />
        </section>
        <section style={styles.section}>
          <ActivityLog buttonColor="var(--accent)" />
        </section>
        <section style={styles.section}>
          <HabitTracker buttonColor="var(--accent)" />
        </section>
        <section style={styles.section}>
          <Calculator onClose={() => {}} />
        </section>
      </main>
      <footer style={styles.footer}>
        <p className="watermark">
          An <a href="https://github.com/pratyushV-l/vertex">open source</a> venture by <a href="https://github.com/pratyushV-l/vertex">422 Unproccessable Entity</a>.
        </p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Bree Serif, serif',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px',
    marginBottom: '20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: '10px',
    fontSize: '1.5rem',
    color: 'var(--foreground)',
    textShadow: '0.0px 0.0px 0 var(--accent), 0.3px 0.3px 0 var(--accent), 0.6px 0.6px 0 var(--accent), 0.9px 0.9px 0 var(--accent), 1.2px 1.2px 0 var(--accent)',
  },
  title: {
    fontSize: '2.5em',
    color: 'var(--foreground)',
    textShadow: '0.5px 0.5px 0 var(--accent), 1.5px 1.5px 0 var(--accent), 2.5px 2.5px 0 var(--accent), 3.5px 3.5px 0 var(--accent), 4.5px 4.5px 0 var(--accent)',
  },
  main: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  stickyNotesButton: {
    padding: '10px 20px',
    backgroundColor: 'var(--foreground)',
    color: 'var(--accent)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default Page;