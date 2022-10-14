import db from "./db";
import api from "./api";
db();
const PORT = process.env.PORT || 3000;

api.listen(PORT, async () => {
  console.log(`🚀 Server listening http://127.0.0.1:${PORT}/ 🚀`);
});
