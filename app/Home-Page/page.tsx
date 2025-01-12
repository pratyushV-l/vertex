"use client";

import { useRouter } from 'next/navigation';
import withAuth from '@/src/hoc/withAuth';

function Homepage() {
  const router = useRouter();

  return (
    <div className="Home-page">
      <h1 className="home-heading">Welcome to Vertex: The Ultimate Study Hub</h1>
      <button className="Study-Planner" onClick={() => router.push('/study-planner')}>Study Planner</button>
      <button className="Timetable-Calendar" onClick={() => router.push('/AI-Calendar')}>AI Calendar</button>
      <button className="AI-Bot" onClick={() => router.push('/AI-Bot')}>
        Educational Query Bot
      </button>
      <button className="Essential-tools" onClick={() => router.push('/tools')}>
        Essential Study Tools
      </button>
    </div>
  );
}

export default withAuth(Homepage);