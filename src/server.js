import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4500;
const app = express();
const loggerMiddleware = logger("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(loggerMiddleware);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`✅Server listening on port ${PORT} 🚀`);

app.listen(PORT, handleListening);
