"use client";

import { useRouter } from 'next/navigation';

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="Home-page">
      <h1 className="home-heading">What does Vertex Entail</h1>
      <button className="Study-Planner">Study Planner</button>
      <button className="Timetable-Calendar">Timetable Calculator</button>
      <button className="AI-Bot" onClick={() => router.push('/AI-Bot')}>
        AI Query Bot
      </button>
      <button className="Essential-tools" onClick={() => router.push('/tools')}>
        Essential Study Tools
      </button>
    </div>
  );
}