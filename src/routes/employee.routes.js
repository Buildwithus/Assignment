import express from "express";
import * as employeeController from "../controllers/employee.controller.js";
import { validateBody } from "../middlewares/bodyvalidate.middleware.js";
import {
  createEmployeeBodySchema,
  updateEmployeeBodySchema,
} from "../validation/employee.validation.js";
import { uploadFile } from "../middlewares/multer.js";
const employeeRouter = express.Router();

employeeRouter.post(
  "/create",
  validateBody(createEmployeeBodySchema),
  employeeController.createEmployee,
);
employeeRouter.get("/all", employeeController.getAllEmployee);
employeeRouter.get("/:id", employeeController.getEmployeeById);
employeeRouter.put(
  "/update/:id",
  validateBody(updateEmployeeBodySchema),
  employeeController.updateEmployeeById,
);
employeeRouter.delete("/delete/:id", employeeController.deleteEmployeeById);
employeeRouter.post(
  "/upload",
  uploadFile.single("file"),
  employeeController.uploadBulkEmployee,
);

export default employeeRouter;
