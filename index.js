import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// routes import
import categoryRoutes from "./routes/categoryRoutes.js"
import subCategoryRoutes from "./routes/subCategoryRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to database
try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URL);
} catch (err) {
    console.error("Database connection error:", err);
}

// Check if the database is connected
mongoose.connection.on("disconnected", () => {
    console.log("Database is disconnected");
});

// Basic route
app.get('/', (req, res) => {
    res.send('Menu Management API');
});
app.use("/category",categoryRoutes);
app.use("/subCategory",subCategoryRoutes);
app.use("/item",itemRoutes);

// Start the server
app.listen(PORT, () => {
    if(mongoose.connection.readyState ===1)
        console.log("Database is connected");
    else
    console.log("Database not Connected");
    console.log(`Server running on port ${PORT}`);
    if(PORT == 5000)
        console.log("http://localhost:5000/");
});