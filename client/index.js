import axios from 'axios';
import config from './config.js';
import io from 'socket.io-client';

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