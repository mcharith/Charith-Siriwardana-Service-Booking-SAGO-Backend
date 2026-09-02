import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log("PORT:", process.env.PORT);

const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);

    });

};

startServer();