import express, { Application,Request,Response } from "express";
import cors from "cors";
import { AppDataSource } from "./config/dataSource";

import router from "./routes/employeeRoutes";

const app: Application = express();

app.use(cors());

app.use(cors({
  origin: "http://192.168.0.9:5175"   // Replace with your frontend PC's IP and port
}));

app.use(express.json());

// --- Health check ---
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Employee API is running" });
});


app.get("/health", async (_req: Request, res: Response) => {
  try {
    await AppDataSource.query("SELECT 1");
    res.status(200).json({ success: true, status: "ok", db: "connected" });
  } catch {
    res.status(503).json({ success: false, status: "error", db: "disconnected" });
  }
});

// --- Routes ---
app.use("/api/employees", router);


//app.use("/emp",router);



 

app.get("/api/test", (req, res) => {

    console.log("Test run SuccessFully");
    res.status(200).json({
        success: true,
        message: "Backend is working!"
    });
});

export default app;