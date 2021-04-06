// require your server and launch it here
const server = require('./api/server');

const port = 1234;

server.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
