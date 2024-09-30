import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.db.js";
import userRoutes from "./routes/controller.js";

// initialization
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// connect database
await connectDB();

// register routes
app.use(userRoutes);

// port setup
app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`);
});
