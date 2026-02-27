import * as employeeRepo from "../repositories/employee.repository.js";
import { readExcelFile } from "../utils/excel.js";
import { AppError } from "../utils/function.js";
import { randomUUID } from "crypto";
export const createEmployee = async (data) => {
  const { name, email, salary, department } = data;
  const resData = await employeeRepo.createEmployee(
    name,
    email,
    salary,
    department,
  );
  if (resData === 0) {
    throw new AppError("Something Went Wrong");
  }
  return resData;
};

export const getAllEmployee = async (data) => {
  const { pageNo, limit, searchText } = data;
  const resData = await employeeRepo.getAllEmployee(pageNo, limit, searchText);
  return resData;
};

export const getEmployeeById = async (data) => {
  const { id } = data;
  const resData = await employeeRepo.getEmployeeById(id);
  return resData;
};

export const updateEmployeeById = async (data, paramsData) => {
  const { name, email, salary, department } = data;
  const { id } = paramsData;
  const resData = await employeeRepo.updateEmployeeById(
    name,
    email,
    salary,
    department,
    id,
  );
  if (resData?.affectedRows === 0) {
    throw new AppError("Something Went Wrong");
  }
  return resData;
};

export const deleteEmployeeById = async (data) => {
  const { id } = data;
  const resData = await employeeRepo.deleteEmployeeById(id);
  if (resData?.affectedRows === 0) {
    throw new AppError("Something Went Wrong");
  }
  return resData;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const uploadBulkEmployee = async (file) => {
  const buffer = file.buffer;
  const uniqueId = randomUUID()?.toString();
  const excelData = await readExcelFile(buffer);
  if (excelData.length === 0) {
    throw new AppError("Excel File is empty");
  }
  const validRows = [];
  const invalidRows = [];
  excelData.forEach((row, index) => {
    const name = row.name?.toString().trim();
    const email = row.email?.toString().trim();
    const salary = parseFloat(row.salary);
    const department = row.department?.toString().trim();
    let errors = [];
    if (!name) {
      errors.push("Name is required");
    }
    if (!email || !isValidEmail(email)) {
      errors.push("Invalid email format");
    }

    if (isNaN(salary) || salary <= 0) {
      errors.push("Salary must be a positive number");
    }
    if (errors.length > 0) {
      invalidRows.push({
        rowNumber: index + 2,
        data: row,
        errors,
      });
    } else {
      validRows.push([name, email, salary, department, uniqueId]);
    }
  });
  if (invalidRows.length > 0) {
    return { invalidRows, isError: 1 };
  }
  const resData = await employeeRepo.insertEmployeeStage(validRows, uniqueId);
  if (!resData) {
    throw new AppError("Something Went Wrong");
  }
  const result = await employeeRepo.bulkUploadEmployee(uniqueId);
  if (result.length > 0) {
    result.forEach((row, index) => {
      let errors = [];
      errors.push("Duplicate email Exists");
      invalidRows.push({
        rowNumber: index + 1,
        data: row,
        errors,
      });
    });
    return { invalidRows, isError: 1 };
  }
  return result;
};
