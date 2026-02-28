-- employees table

CREATE TABLE `employees` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(100) NOT NULL,
   `email` varchar(100) NOT NULL,
   `salary` decimal(10,2) NOT NULL,
   `department` varchar(100) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `is_deleted` tinyint(1) DEFAULT '0',
   `deleted_at` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `unique_active_email` (((case when (`is_deleted` = 0) then `email` else NULL end))),
   KEY `idx_email` (`email`)
 ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--employee_stage tabel 

CREATE TABLE `employee_stage` (
   `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(100) DEFAULT NULL,
   `email` varchar(100) DEFAULT NULL,
   `salary` decimal(10,2) DEFAULT NULL,
   `department` varchar(100) DEFAULT NULL,
   `upload_batch_id` varchar(50) DEFAULT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `uniqueId` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
   PRIMARY KEY (`id`),
   KEY `idx_email` (`email`),
   KEY `idx_uniqueId` (`uniqueId`)
 ) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci