import React, { useState, useEffect, useRef } from "react";
import * as math from "mathjs";

const Calculator: React.FC<{ onClose: () => void }> = ({}) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (value: string) => setInput((prev) => prev + value);
  const handleClear = () => setInput("");
  const handleDelete = () => setInput((prev) => prev.slice(0, -1));
  const handleCalculate = () => {
    try {
      setInput(math.evaluate(input.replace(/pi/g, "Math.PI").replace(/e/g, "Math.E")).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (!isNaN(Number(key))) handleButtonClick(key);
    else if (key === 'Enter') handleCalculate();
    else if (key === 'Backspace') handleDelete();
    else if (key === 'c' || key === 'C') handleClear();
    else handleButtonClick(key);
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", () => window.addEventListener("keydown", handleKeyDown));
      inputElement.addEventListener("blur", () => window.removeEventListener("keydown", handleKeyDown));
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <>
      <div ref={inputRef} tabIndex={0} style={styles.display}>{input || "0"}</div>
      <div style={styles.buttonGrid}>
        {["sin", "cos", "tan", "(", ")", "log", "ln", "sqrt", "^", "Del", "7", "8", "9", "/", "C", "4", "5", "6", "*", "pi", "1", "2", "3", "-", "e", "0", ".", "=", "+"].map((btn, i) => (
          <button key={i} style={styles.button} onClick={() => btn === "Del" ? handleDelete() : btn === "C" ? handleClear() : btn === "=" ? handleCalculate() : handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  display: {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "right",
    fontSize: "24px",
    marginBottom: "10px",
    minHeight: "50px",
    wordWrap: "break-word",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    outline: "none",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default Calculator;