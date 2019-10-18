import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any;
  role: any;
  empoyeesUpdate: any = {
    id: 0,
    name: "",
    password: "",
    role: "",
    username: ""
  }
  employeeAdd: any = {
    id: 0,
    name: "",
    password: "",
    role: "",
    username: ""
  }
  arrRoleAdd: string[] = [];
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      rs => {
        rs.splice(rs.findIndex(admin => admin.username == "admin"), 1);
        this.employees = rs;
        this.employees.forEach(employee => {
          employee.arrRole = employee.role.split('.')
        });
        console.log(rs)
      }, err => {
        console.log(err);
      }
    )
  }
  insertEmployee() {
    let roleTem: string = "";
    this.arrRoleAdd.forEach(role => {
      roleTem = roleTem + role + ".";
    })
    this.employeeAdd.role = roleTem;

    console.log(this.employeeAdd);
    this.employeeService.addEmployee(this.employeeAdd).subscribe(
      rs => {
        let employeeTemp = this.employeeAdd;
        employeeTemp.arrRole = this.arrRoleAdd;
        this.employees.push(employeeTemp)
      }, err => {
        console.log(err)
      }
    )
  }
  updateEmployee(id: number) {
    // console.log(this.employees)
    let roleTemp: string = "";
    let temp = this.employees[this.employees.findIndex(admin => admin.id == id)];
    temp.arrRole.forEach(element => {
      roleTemp = roleTemp + element + ".";
    });
    this.empoyeesUpdate.id = id;
    this.empoyeesUpdate.name = temp.name;
    this.empoyeesUpdate.password = temp.password;
    this.empoyeesUpdate.role = roleTemp;
    this.empoyeesUpdate.username = temp.username;
    console.log(this.empoyeesUpdate)
    this.employeeService.updateEmployee(this.empoyeesUpdate).subscribe(
      rs=>{

      },err=>{

      }
    )
  }
  checkRole(role: string, arr: any): boolean {
    if (arr.findIndex(roleEm => roleEm == role) != -1) {
      return true;
    } else {
      return false;
    }
  }
  addRole(role: string, arrRole: any) {
    if (arrRole.findIndex(roleEm => roleEm == role) == -1) {
      arrRole.push(role);
    } else {
      arrRole.splice(arrRole.findIndex(roleEm => roleEm == role), 1);
    }
  }
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees()
  }

}
