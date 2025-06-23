// server/index.js

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server started on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    const cmd = message.toString().trim();

    // Basic command handling example:
    if (cmd === 'scan') {
      ws.send('192.168.1.218\n192.168.1.161\n192.168.1.18\n192.168.1.239\n192.168.1.29');
    } else if (cmd.startsWith('ls')) {
      ws.send('file1.txt\nfile2.log\nsecret.txt');
    } else if (cmd.startsWith('hackplace')) {
      ws.send('Attempting to hack bank... Success! +$500');
    } else {
      ws.send(`Unknown command: ${cmd}`);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
