import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [lines, setLines] = useState([
    "Welcome to the hacking terminal. Type 'help' for commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  function appendLine(text) {
    setLines((prev) => [...prev, text]);
  }

  function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    appendLine(`> ${cmd}`);

    switch (command) {
      case "help":
        appendLine("Available commands: help, scan, clear, exit");
        break;
      case "scan":
        appendLine("192.168.1.218");
        appendLine("192.168.1.161");
        appendLine("192.168.1.18");
        appendLine("192.168.1.239");
        appendLine("192.168.1.29");
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        appendLine("Goodbye!");
        break;
      default:
        appendLine(`Command not found: ${cmd}`);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  }

  return (
    <div className="terminal">
      <div className="output">
        {lines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <span className="prompt">&gt; </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </form>
    </div>
  );
}
