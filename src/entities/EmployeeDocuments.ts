// entities/EmployeeDocument.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { EmployeesDetails } from "./Employee";

export enum DocumentType {
  MARKSHEET_10 = "10th_marksheet",
  MARKSHEET_12 = "12th_marksheet",
  COLLEGE_MARKSHEET = "college_marksheet",
  AADHAR_CARD = "aadhar_card",
  PAN_CARD = "pan_card",
  BANK_BOOK = "bank_book",
  PROVISIONAL_CERTIFICATE = "provisional_certificate",
  COURSE_CERTIFICATE = "course_certificate",
}

@Entity("employee_documents")
export class EmployeeDocuments {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => EmployeesDetails, (employee) => employee.documents, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "emp_no" })
  employee!: EmployeesDetails;

  @Column({ type: "enum", enum: DocumentType })
  documentType!: DocumentType;

  @Column()
  fileName!: string;

  @Column()
  filePath!: string; // where the file is stored (disk path or S3 URL)

  @CreateDateColumn()
  uploadedAt!: Date;
}