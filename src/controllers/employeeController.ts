import { AppDataSource } from "../config/dataSource";
import { EmployeesDetails } from "../entities/Employee"; 
import { Request, Response } from "express";


import { ILike } from "typeorm";

const employeeRepository = AppDataSource.getRepository(EmployeesDetails);  //it will create a employee object

// Create Employee
export const createEmployee = async (req: Request, res: Response) => {
  try {

    const employee = employeeRepository.create(req.body);
    const savedEmployee = await employeeRepository.save(employee);
    console.log("Employee created successfully:",savedEmployee) //m
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};


// Get All Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeRepository.find();
    
    res.status(200).json({
      count: employees.length,
      EmployeesData: employees});
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};



// getEmployeeByEmailId
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    // Get email from URL

    const {empNo} = req.body;
    
    // Find employee by email
    const employee = await employeeRepository.findOne({
      where: { empNo }
    });


    // Check if employee exists
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // Return employee
    return res.status(200).json(employee);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employee",
      error
    });
  }
};



//updateEmployeeByEmail

export const updateEmployeeById = async (req: Request, res: Response) => {
    try {
        const {empNo} = req.body;

        const employee = await employeeRepository.findOne({
            where: { empNo }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        employeeRepository.merge(employee, req.body);

        const updatedEmployee = await employeeRepository.save(employee);

        return res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}; 



//deleteEmployeeByEmail

export const deleteEmployeeById = async (req: Request, res: Response) => {

    try {

        const {empNo} = req.body;

        const employee = await employeeRepository.findOne({
            where: {
                empNo: empNo
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        await employeeRepository.remove(employee);

        return res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
            error
        });

    }
};



//updateEmployeeSalary

export const updateEmployeeSalaryById = async (
  req: Request,
  res: Response
) => {
  try {
    const {empNo} = req.body;
    const { salary } = req.body;

    // Check employee exists
    const employee = await employeeRepository.findOne({
      where: { empNo }
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // Update only salary
    employee.salary = salary;

    // Save updated employee
    const updatedEmployee = await employeeRepository.save(employee);

    return res.status(200).json({
      message: "Salary updated successfully",
      data: updatedEmployee
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
};


//getEmployeesByDepartment

export const getEmployeesByDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {department}  = req.body;

    const employees = await employeeRepository.find({
    where: {
    department: ILike(department)
  }
});

    if (employees.length === 0) {
      res.status(404).json({
        success: false,
        message: `No employees found in ${department} department.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



//getEmployeesByDesignation

export const getEmployeesByDesignation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { designation } = req.body;

    const employees = await employeeRepository.find({
      where: {
        designation:ILike(designation)
      },
    });

    if (employees.length === 0) {
      res.status(404).json({
        success: false,
        message: `No employees found with designation '${designation}'.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


















































































/*
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.createEmployee(req.body);

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({
            message: "Error creating employee",
            error,
        });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();

        res.status(200).json({
            count: employees.length,
            EmployeesData: employees,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching employees",
            error,
        });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const { empNo } = req.body;

        const employee = await employeeService.getEmployeeById(empNo);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching employee",
            error,
        });
    }
};

export const updateEmployeeById = async (req: Request, res: Response) => {
    try {
        const { empNo } = req.body;

        const employee = await employeeService.updateEmployeeById(
            empNo,
            req.body
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        return res.status(200).json({
            message: "Employee updated successfully",
            data: employee,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
    try {
        const { empNo } = req.body;

        const deleted = await employeeService.deleteEmployeeById(empNo);

        if (!deleted) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        return res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

export const updateEmployeeSalaryById = async (req: Request,res: Response) => {
    try {
        const { empNo, salary } = req.body;

        const employee = await employeeService.updateEmployeeSalary(
            empNo,
            salary
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        return res.status(200).json({
            message: "Salary updated successfully",
            data: employee,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

export const getEmployeesByDepartment = async (req: Request,res: Response) => {
    try {
        const { department } = req.body;

        const employees =
            await employeeService.getEmployeesByDepartment(department);

        if (employees.length === 0) {
            return res.status(404).json({
                message: `No employees found in ${department} department.`,
            });
        }

        return res.status(200).json({
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};

export const getEmployeesByDesignation = async (req: Request,res: Response) => {
    try {
        const { designation } = req.body;

        const employees =
            await employeeService.getEmployeesByDesignation(designation);

        if (employees.length === 0) {
            return res.status(404).json({
                message: `No employees found with designation '${designation}'.`,
            });
        }

        return res.status(200).json({
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
};



*/

































































