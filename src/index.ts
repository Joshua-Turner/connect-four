import { createApp } from "./api";
import db from "./db";
db();
const PORT = process.env.PORT || 3000;
const api = createApp();

api.listen(PORT, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${PORT}/ 🚀`);
});
