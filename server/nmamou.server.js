require("dotenv").config();
const PORT = process.env.PORT | 8016;
const http = require("http");

const app = require("./app");

const nmamouServer = http.createServer(app);

nmamouServer.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
