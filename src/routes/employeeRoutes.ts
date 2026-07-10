import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  updateEmployeeSalaryById,
  getEmployeesByDepartment,
  getEmployeesByDesignation
} from "../controllers/employeeController";

import { validateEmployee } from "../middleware/validateEmployee";
import { checkEmployeeExists } from "../middleware/checkEmployeeExists";
import { upload } from "../config/multerConfig";
import { uploadEmployeeDocument, getEmployeeDocuments } from "../controllers/employeeDocumentController";


const router = Router();

router.post("/create", validateEmployee, checkEmployeeExists, createEmployee);
router.get("/getAllEmployees", getAllEmployees);
router.get("/getEmployeeById",getEmployeeById);  
router.put("/updateEmployeeById",updateEmployeeById);
router.delete("/deleteEmployeeById",deleteEmployeeById);
router.patch("/updateEmployeeSalaryById",updateEmployeeSalaryById);

router.get("/getEmployeesByDepartment",getEmployeesByDepartment);
router.get("/getEmployeesByDesignation",getEmployeesByDesignation);


router.post("/documents/:empNo", upload.single("file"), uploadEmployeeDocument);
router.get("/documents/:empNo", getEmployeeDocuments);


export default router;