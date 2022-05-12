import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4500;

const handleListening = () =>
  console.log(`✅Server listening on port ${PORT} 🚀`);

app.listen(PORT, handleListening);
