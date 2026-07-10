import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Check,
} from "typeorm";

@Entity({ name: "employeesDetails" })
@Check(`"age" > 18`)
@Check(`"salary" >= 0`)
export class EmployeesDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ name: "emp_no", type: "varchar", length: 30, unique: true })
  empNo!: string;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string | null;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  gender?: string | null;

  @Column({ type: "varchar", length: 100 })
  department!: string;

  @Column({ type: "varchar", length: 100 })
  designation!: string;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  salary!: number;

  @Column({ name: "date_of_joining", type: "date", default: () => "CURRENT_DATE" })
  dateOfJoining!: string;

  @Column({ type: "text", nullable: true })
  address?: string | null;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default EmployeesDetails;
