const express = require('express');
const postRouter = require('./posts/posts-router');
const server = express();

//Middleware
server.use(express.json());

//Routers
server.use('/api/posts', postRouter);

//BASE URL

server.use('/', (req, res) => {
  res
    .status(404)
    .json({ message: 'ERROR 404: Princess is in another castle!' });
});

module.exports = server;
