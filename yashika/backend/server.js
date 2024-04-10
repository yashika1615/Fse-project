import mongoose from "mongoose";
import express from "express";
import { router } from "./routes/user.routes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
app.use(express.json());
app.use("/api/v1", router);

// Function to connect to MongoDB and start the server
const connectDBAndStartServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("MongoDB connected!!");
    
    // Start the Express server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error found: ${error}`);
    process.exit(1); // Exit the process with failure status
  }
};

// Call the function to connect to MongoDB and start the server
connectDBAndStartServer();

// Define a route to handle GET requests at the root endpoint "/"
app.get("/", (req, res) => {
  res.send("Backend working"); // Send "Backend working" as the response
});
