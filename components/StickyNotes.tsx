import React, { useState } from "react";

interface StickyNote {
  id: number;
  heading: string;
  body: string;
}

interface StickyNotesProps {
  onClose: () => void;
}

const StickyNotes: React.FC<StickyNotesProps> = ({ onClose }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addNote = () => {
    if (heading.trim() && body.trim()) {
      setNotes([{ id: Date.now(), heading, body }, ...notes]);
      setHeading("");
      setBody("");
      setShowForm(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Sticky Notes</h2>
        <button style={styles.toggleFormButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Note"}
        </button>
        {showForm && (
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={styles.textarea}
            />
            <button onClick={addNote} style={styles.addButton}>
              Add Note
            </button>
          </div>
        )}
        <div style={styles.notesContainer}>
          {notes.map((note) => (
            <div key={note.id} style={styles.note}>
              <h3 style={styles.noteHeading}>{note.heading}</h3>
              <p style={styles.noteBody}>{note.body}</p>
              <button onClick={() => setNotes(notes.filter((n) => n.id !== note.id))} style={styles.deleteButton}>
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "var(--background)",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90%",
    overflowY: "auto",
    position: "relative",
    color: "var(--foreground)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  toggleFormButton: {
    padding: "10px 20px",
    backgroundColor: "var(--accent)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "var(--foreground)",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "var(--accent)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "var(--foreground)",
    alignSelf: "flex-end",
  },
  notesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "10px",
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
  },
  note: {
    padding: "10px",
    borderRadius: "4px",
    position: "relative",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "var(--note-background)",
  },
  noteHeading: {
    margin: "0 0 5px 0",
    fontSize: "18px",
  },
  noteBody: {
    margin: 0,
    fontSize: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
  },
  deleteButton: {
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default StickyNotes;