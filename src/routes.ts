import 'express-async-errors';
import { NextFunction, Request, Response, Router } from 'express';
import { errorHandler } from './exceptions/ErrorHandler';
import { AppError, HttpCode } from './exceptions/AppError';
import SmartCardAPI from "./SmartCardAPI";

const router = Router();
const smartCardAPI = new SmartCardAPI();

// Middleware for logging requests
router.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET endpoint to retrieve Vehicle Info
router.get("/vehicles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getVehicleInfo(id);

    if (!value) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: 'Vehicle you are looking for does not exist',
      });
    }
    res.json(value);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// GET endpoint to retrieve Security
router.get("/vehicles/:id/doors", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getSecurityStatus(id);
    if (!value) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: 'Security you are looking for does not exist',
      });
    }
    res.json(value);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// GET endpoint to retrieve Fuel Range
router.get("/vehicles/:id/fuel", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getFuelRange(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// GET endpoint to retrieve Battery Range
router.get("/vehicles/:id/battery", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const value = await smartCardAPI.getBatteryRange(id);
    res.status(200).json(value);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// POST endpoint to Start/Stop Engine
router.post("/vehicles/:id/engine", async (req: Request, res: Response) => {
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
    throw error;
  }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err);

  next(err);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default router;
