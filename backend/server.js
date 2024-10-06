import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.db.js";
import userRoutes from "./routes/controller.js";
import path from "path";

// initialization
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// connect database
await connectDB();

// register routes
app.use("/api/", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// port setup
app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`);
});
