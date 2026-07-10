// controllers/employeeDocumentController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { EmployeeDocuments, DocumentType } from "../entities/EmployeeDocuments";
import { EmployeesDetails } from "../entities/Employee";

const documentRepository = AppDataSource.getRepository(EmployeeDocuments);
const employeeRepository = AppDataSource.getRepository(EmployeesDetails);

export const uploadEmployeeDocument = async (req: Request, res: Response) => {
  try {
    const { empNo } = req.params;
    const { documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!Object.values(DocumentType).includes(documentType)) {
      return res.status(400).json({ success: false, message: "Invalid document type" });
    }

    const employee = await employeeRepository.findOne({ where: { empNo } });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const document = documentRepository.create({
      employee,
      documentType,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    const saved = await documentRepository.save(document);

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error uploading document", error });
  }
};

// Get all documents for an employee
export const getEmployeeDocuments = async (req: Request, res: Response) => {
  try {
    const { empNo } = req.params;

    const documents = await documentRepository.find({
      where: { employee: { empNo } },
    });

    return res.status(200).json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching documents", error });
  }
};