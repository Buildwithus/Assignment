import { pool } from "../config/db.js";
import { AppError } from "../utils/function.js";

export const createEmployee = async (name, email, salary, department) => {
  const [exists] = await pool.query(
    "select 1 from employees where email=? and is_deleted=0",
    [email],
  );
  if (exists.length > 0) {
    throw new AppError("Email Already Exist", 409);
  }
  const query = `
    insert into employees 
    (name, email, salary, department)
    values (?, ?, ?, ?)
  `;
  const values = [name, email, salary, department];
  const [result] = await pool.query(query, values);
  return result;
};

export const getAllEmployee = async (
  pageNo = 1,
  limit = 10,
  searchText = "",
) => {
  pageNo = Number(pageNo);
  limit = Number(limit);
  const offset = (pageNo - 1) * limit;
  let query = `
    select id, name, email, salary, department
    from employees
    where is_deleted = 0
  `;
  let countQuery = `
    select COUNT(1) as total
    from employees
    where is_deleted = 0
  `;
  const values = [];
  if (searchText) {
    query += ` AND (name like ? OR email like ? OR department like ?)`;
    countQuery += ` AND (name like ? OR email like ? OR department like ?)`;
    const searchValue = `%${searchText}%`;
    values.push(searchValue, searchValue, searchValue);
  }
  query += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
  values.push(limit, offset);
  const [rows] = await pool.query(query, values);
  const [countResult] = await pool.query(
    countQuery,
    searchText ? values.slice(0, 3) : [],
  );
  return {
    data: rows,
    total: countResult[0].total,
    currentPage: pageNo,
  };
};

export const getEmployeeById = async (id) => {
  const query = `select id,name,email,salary,department from employees where id=? and is_deleted=0`;
  const values = [id];
  const [result] = await pool.query(query, values);
  return result;
};

export const updateEmployeeById = async (
  name,
  email,
  salary,
  department,
  id,
) => {
  const [exists] = await pool.query(
    "select 1 from employees where email=? and is_deleted=0 and id!=?",
    [email, id],
  );
  if (exists.length > 0) {
    throw new AppError("Email Already Exist", 409);
  }
  const query = `
  update employees set name=?,email=?,salary=?,department=?,updated_at=NOW() 
  where is_deleted=0 and id=?
  `;
  const values = [name, email, salary, department, id];
  const [result] = await pool.query(query, values);
  return result;
};

export const deleteEmployeeById = async (id) => {
  const query = `update employees set is_deleted=1,deleted_at=NOW() where id=? and is_deleted=0`;
  const values = [id];
  const [result] = await pool.query(query, values);
  return result;
};

export const insertEmployeeStage = async (data, uniqueId) => {
  const query = `
  insert into employee_stage (name, email, salary, department, uniqueId)
  values ?`;
  const [result] = await pool.query(query, [data]);
  if (data.length !== result.affectedRows) {
    await pool.query("delete from employee_stage where uniqueId=?", [uniqueId]);
    return false;
  }
  return true;
};

export const bulkUploadEmployee = async (uniqueId) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [existing] = await pool.query(
      `select es.name,es.email,es.salary,es.department,'Email Already Exists' as error 
    from employee_stage es inner join employees e on e.email=es.email
    where e.is_deleted=0 and es.uniqueId=?
    `,
      [uniqueId],
    );
    if (existing.length > 0) {
      return existing;
    }
    await connection.beginTransaction();
    const query = `
    insert into employees (name, email, salary, department)
    select name, email, salary, department from employee_stage where uniqueId=?`;
    const [result] = await pool.query(query, [uniqueId]);
    await connection.commit();
    if (result.affectedRows === 0) {
      throw new AppError("Something Went Wrong");
    }
    await pool.query("delete from employee_stage where uniqueId=?", [uniqueId]);
    return { invalidRows: [], isError: 0 };
  } catch (error) {
    await connection.rollback();
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
