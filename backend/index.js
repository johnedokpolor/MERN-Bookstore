import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bookRoutes from "./routes/book.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 1000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, "/frontend/.next"));
  app.get("*", (req, res) => {
    res.sendFile();
  });
}
// JSON parser Middleware
app.use(express.json());

// CORS policy Middleware
// Option 1: Allow all Orgins
app.use(cors());

// Opton 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://127.0.0.1:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Enables Routing from one URL Middleware
app.use("/books", bookRoutes);
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// Connect to MONGODB Database
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to Database");
    // Listen to The Server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
