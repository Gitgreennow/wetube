import express from "express";
import logger from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const loggerMiddleware = logger("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/user", userRouter);

export default app;
