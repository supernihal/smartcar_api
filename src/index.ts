import express, { Application, Request, Response } from "express";
import SmartCardAPI from "./SmartCardAPI";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 3000;
const smartCardAPI = new SmartCardAPI();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use((req: Request, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET endpoint to retrieve Vehicle Info
app.get("/vehicles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getVehicleInfo(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
  }
});

// GET endpoint to retrieve Security
app.get("/vehicles/:id/doors", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getSecurityStatus(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
  }
});

// GET endpoint to retrieve Fuel Range
app.get("/vehicles/:id/fuel", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getSecurityStatus(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
  }
});

// GET endpoint to retrieve Battery Range
app.get("/vehicles/:id/battery", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getSecurityStatus(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
  }
});

// POST endpoint to Start/Stop Engine
app.post("/vehicles/:id/engine", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;
  try {
    let value;
    if (action === "START") {
      value = await smartCardAPI.startEngine(id);
    } else if (action === "STOP") {
      value = await smartCardAPI.stopEngine(id);
    }
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
