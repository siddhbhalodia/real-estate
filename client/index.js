import axios from 'axios';
import config from './config.js';
import io from 'socket.io-client';
import express from 'express';
const app = express();

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

axios.get(`${config.API_URL}/`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("There was an error!", error);
  });

  const socket = io(config.SOCKET_URL);

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
  
  socket.on('message', (data) => {
    console.log('New message:', data);
  });