import * as employeeService from "../services/employee.service.js";
import { sendResponse } from "../utils/function.js";

export const createEmployee = async (req, res, next) => {
  try {
    await employeeService.createEmployee(req.body);
    return sendResponse(res, "Emplyee Created Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployee(req?.query);
    return sendResponse(res, "Emplyees Fetched Successfully", 201, employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params);
    return sendResponse(res, "Emplyee Fetched Successfully", 200, employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeById = async (req, res, next) => {
  try {
    await employeeService.updateEmployeeById(req.body, req?.params);
    return sendResponse(res, "Updated Successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeeById = async (req, res, next) => {
  try {
    await employeeService.deleteEmployeeById(req.params);
    return sendResponse(res, "Emplyee Deleted Successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const uploadBulkEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.uploadBulkEmployee(req?.file);
    if (employee.isError === 0) {
      return sendResponse(
        res,
        "Emplyee Uploaded Successfully",
        201,
        employee?.invalidRows,
      );
    }
    return sendResponse(
      res,
      "Duplicate entry found",
      409,
      employee?.invalidRows,
    );
  } catch (error) {
    next(error);
  }
};
