# 📘 Employee Management API

A production-ready Employee Management REST API built with Node.js + Express.

This project includes:
- CRUD operations
- Pagination & search
- Excel bulk upload
- Swagger API documentation
- Structured folder architecture

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Multer (File Upload)
- Swagger
- MySQL

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd project-folder
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in root directory:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
```

---

## ▶️ Run Server

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## 📄 Swagger API Documentation

Open in browser:

```
http://localhost:5000/api-docs
```

Swagger includes:

- Query parameters
- Path parameters
- Request body schemas
- File upload support

---

# 📌 API Endpoints

---

## 1️⃣ Get All Employees (Pagination + Search)

```
GET /api/employees/all?pageNo=1&limit=100&searchText=email
```

### Query Parameters

| Parameter   | Type    | Description |
|------------|---------|------------|
| pageNo     | number  | Page number |
| limit      | number  | Records per page |
| searchText | string  | Search by name/email |

---

## 2️⃣ Get Employee By ID

```
GET /api/employees/:id
```

Example:

```
GET /api/employees/6
```

---

## 3️⃣ Update Employee

```
PUT /api/employees/update/:id
```

Example Body:

```json
{
  "name": "Anuj Kumar",
  "email": "anuj1.kumar@isourse.com",
  "department": "SALES",
  "salary": 45.00
}
```

---

## 4️⃣ Delete Employee

```
DELETE /api/employees/delete/:id
```

Example:

```
DELETE /api/employees/delete/7
```

(Recommended: Implement soft delete in production)

---

## 5️⃣ Upload Employees (Excel)

```
POST /api/employees/upload
```

### Content-Type:
```
multipart/form-data
```

### Body:
- file (.xlsx)

Example (Postman):
```
file=@employees.xlsx
```

---

# 📂 Project Structure

```
src/
│
├── config/
│   └── swagger.js
│
├── controllers/
├── services/
├── repository/
├── routes/
├── middlewares/
├── docs/
├── utils/
│
server.js
app.js
```

---

# 🏗 Recommended REST Structure (Improvement)

For production-level APIs, preferred endpoints:

```
GET    /employees/all
GET    /employees/{id}
POST   /employees/create
PUT    /employees/update/{id}
DELETE /employees/{id}
POST   /employees/upload
```

---

# 🛡 Features

✔ Pagination & Search  
✔ Excel Bulk Import  
✔ Swagger Documentation  
✔ Structured Folder Architecture  

---

# 🧠 Future Improvements

- Global error handling middleware
- Reusable Swagger schemas
- Validation using Joi
- Soft delete implementation
- Docker support

---
## ⏱ Time Taken

Total Time Taken: 14 hours

Breakdown:
- Project Setup & Architecture: 1 hours
- CRUD APIs with Validation: 3 hours
- Pagination & Search: 0.2 hours
- Excel Bulk Upload with Transactions: 0.5 hours
- Documentation & README: 0.2 hours

# 👨‍💻 Author

Anuj Kumar
Backend Developer  

