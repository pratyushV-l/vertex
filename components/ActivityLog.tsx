import React, { useState } from "react";

const ActivityLog = ({ buttonColor }: { buttonColor: string }) => {
  const [logs, setLogs] = useState<{ log: string; timestamp: string }[]>([]);
  const [newLog, setNewLog] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleLog = () => {
    if (newLog.trim()) {
      const updatedLogs = editIndex !== null
        ? logs.map((log, index) => index === editIndex ? { ...log, log: newLog } : log)
        : [{ log: newLog, timestamp: new Date().toLocaleString() }, ...logs];
      setLogs(updatedLogs);
      setNewLog("");
      setEditIndex(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleLog();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Activity Log</h2>
      <input
        type="text"
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter new activity"
        style={styles.input}
      />
      <button
        onClick={handleLog}
        style={{ ...styles.button, backgroundColor: buttonColor }}
      >
        {editIndex !== null ? "Edit Log" : "Add Log"}
      </button>
      <ul style={styles.list}>
        {logs.map((log, index) => (
          <li key={index} style={styles.listItem}>
            <span>{log.log} <span style={styles.timestamp}>({log.timestamp})</span></span>
            <div>
              <button onClick={() => { setNewLog(log.log); setEditIndex(index); }} style={styles.editButton}>✎</button>
              <button onClick={() => setLogs(logs.filter((_, i) => i !== index))} style={styles.deleteButton}>✖</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    color: 'var(--foreground)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontFamily: 'Bree Serif, serif',
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "var(--foreground)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    marginTop: "15px",
    transition: "background-color 0.3s, color 0.3s",
  },
  list: {
    width: "100%",
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "10px",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
  },
  editButton: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    color: "var(--accent)",
    cursor: "pointer",
    fontSize: "16px",
  },
  deleteButton: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    color: "#FF929F",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ActivityLog;