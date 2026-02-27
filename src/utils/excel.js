import xlsx from "xlsx";
import { AppError } from "./function.js";

export const readExcelFile = async (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const requiredColumns = ["name", "email", "salary", "department"];
  const data = xlsx.utils.sheet_to_json(sheet);
  const actualColumns = Object.keys(data[0]).map((col) => col.trim());
  const missingColumns = requiredColumns.filter(
    (col) => !actualColumns.includes(col),
  );
  if (missingColumns.length > 0) {
    throw new AppError(`Missing required columns: ${missingColumns.join(", ")}`);
  }
  return data;
};
