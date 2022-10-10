require("dotenv").config();
require("./db")();
const api = require("./api");
const PORT = process.env.PORT || 3000;

api.listen(PORT, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${PORT}/ 🚀`);
});
