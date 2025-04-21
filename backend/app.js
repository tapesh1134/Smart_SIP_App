import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fundRoutes from './routes/fundRoutes.js';
import sipRoutes from './routes/sipRoutes.js';
import userRoutes from './routes/userRoutes.js';
import http from "http";
import fs from "fs";

config({ path: "./config/.env" });

const app = express();
const server = http.createServer(app);

const tempDir = "./tmp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    createParentPath: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/sip", sipRoutes);

connection();

app.use(errorMiddleware);

export { server };
export default app;
