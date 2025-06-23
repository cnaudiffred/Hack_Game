import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./style.css";

const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3001");

const App = () => {
  const [output, setOutput] = useState("Welcome to Slavehack 2.0\nType 'help' to get started\n");
  const [input, setInput] = useState("");
  const terminalRef = useRef();

  const appendOutput = (text) => {
    setOutput((prev) => prev + text + "\n");
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      appendOutput(`> ${input}`);
      socket.emit("command", input);
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("response", (data) => {
      appendOutput(data);
    });

    return () => {
      socket.off("response");
    };
  }, []);

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  return (
    <div className="terminal">
      <div className="terminal-output" ref={terminalRef}>
        <pre>{output}</pre>
      </div>
      <div className="terminal-input">
        <span className="prompt">></span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
};

export default App;
