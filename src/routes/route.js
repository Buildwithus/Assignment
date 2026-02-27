import express from "express"
import employeeRouter from "./employee.routes.js";
const globalRouter=express.Router()

globalRouter.use("/employees", employeeRouter);

export default globalRouter