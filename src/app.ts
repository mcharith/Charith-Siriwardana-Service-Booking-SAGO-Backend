import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.routes";
import usersRoutes from "./routes/user.routes";
import availabilityRoutes from "./routes/availability.routes";


const app = express();

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running!"
    });
});

app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/users", usersRoutes);
app.use("/availability",availabilityRoutes);

export default app;