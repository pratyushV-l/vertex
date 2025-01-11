import React, { useState, useEffect } from "react";

interface Habit {
  name: string;
  frequency: string;
  completed: boolean;
  streak: number;
}

const HabitTracker = ({ buttonColor }: { buttonColor: string }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("Daily");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress((habits.filter(habit => habit.completed).length / habits.length) * 100);
  }, [habits]);

  const handleHabit = () => {
    if (newHabit.trim()) {
      const updatedHabits = editIndex !== null
        ? habits.map((habit, index) => index === editIndex ? { ...habit, name: newHabit, frequency } : habit)
        : [...habits, { name: newHabit, frequency, completed: false, streak: 0 }];
      setHabits(updatedHabits);
      setNewHabit("");
      setFrequency("Daily");
      setEditIndex(null);
    }
  };

  const toggleCompletion = (index: number) => {
    setHabits(habits.map((habit, i) => i === index ? { ...habit, completed: !habit.completed, streak: habit.completed ? 0 : habit.streak + 1 } : habit));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Habit Tracker</h2>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="Enter New Habit"
        style={styles.input}
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        style={styles.select}
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <button
        onClick={handleHabit}
        style={{ ...styles.button, backgroundColor: buttonColor }}
      >
        {editIndex !== null ? "Edit Habit" : "Add Habit"}
      </button>
      <div style={styles.progressContainer}>
        <div style={styles.progressBarBackground}>
          <div style={{ ...styles.progressBar, width: `${progress}%`, backgroundColor: buttonColor }}></div>
        </div>
        <p style={styles.progressText}>{Math.round(progress)}% Completed</p>
      </div>
      <ul style={styles.list}>
        {habits.map((habit, index) => (
          <li key={index} style={styles.listItem}>
            <span style={{ textDecoration: habit.completed ? "line-through" : "none" }}>{habit.name} ({habit.frequency})</span>
            <div>
              <button onClick={() => toggleCompletion(index)} style={styles.toggleButton}>{habit.completed ? "✖" : "✔"}</button>
              <span style={styles.streak}>Streak: {habit.streak}</span>
              <button onClick={() => { setNewHabit(habit.name); setFrequency(habit.frequency); setEditIndex(index); }} style={styles.editButton}>Edit</button>
              <button onClick={() => setHabits(habits.filter((_, i) => i !== index))} style={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    color: "var(--foreground)",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontFamily: "Bree Serif, serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "var(--foreground)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "background-color 0.3s, color 0.3s",
  },
  progressContainer: {
    width: "100%",
    marginBottom: "20px",
  },
  progressBarBackground: {
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  progressBar: {
    height: "10px",
    transition: "width 0.5s ease",
  },
  progressText: {
    textAlign: "center",
    marginTop: "10px",
  },
  list: {
    width: "100%",
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  toggleButton: {
    marginRight: "10px",
    background: "none",
    border: "none",
    color: "var(--accent)",
    cursor: "pointer",
    fontSize: "16px",
  },
  streak: {
    marginRight: "10px",
  },
  editButton: {
    marginRight: "10px",
    background: "none",
    border: "none",
    color: "var(--accent)",
    cursor: "pointer",
    fontSize: "16px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#FF929F",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default HabitTracker;