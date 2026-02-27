import multer from "multer";

const storage = multer.memoryStorage();

export const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only Excel files are allowed"));
    }
    cb(null, true);
  },
});
