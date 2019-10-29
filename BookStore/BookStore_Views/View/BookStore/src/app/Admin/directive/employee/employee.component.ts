import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { GetUsername, alert2 } from '../../config/config';
import { alert } from '../../config/config';
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
  showall: boolean = false;
  alert: any;
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      rs => {
        console.log(rs);
        rs.splice(rs.findIndex(admin => admin.username == "admin"), 1);
        //   rs.splice(rs.findIndex(admin => admin.username == GetUsername()), 1);
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
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            let employeeTemp = this.employeeAdd;
            employeeTemp.arrRole = this.arrRoleAdd;
            this.employees.push(employeeTemp)
            alert2("INSERTED","Đã thêm mới nhân viên",'success')
            break;
          }
        }

      }, err => {
        console.log(err)
      }
    )
  }
  updateEmployee(id: number) {
    // console.log(this.employees)
    let roleTemp: string = "";
    let temp: any = this.employees[this.employees.findIndex(admin => admin.id == id)];
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
      rs => {
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            alert2("UPDATED","Đã cập nhật nhân viên",'success')
            break;
          }
        }
      }, err => {

      }
    )
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteAdmin(id).subscribe(
      rs => {
        switch (rs.Error) {
          case 1: {
            alert2('ERROR', 'Đã xảy ra lỗi không xác định','error');
            break;
          }
          case 2: {
            alert2('TOKEN EXPIRED', 'Đã hết phiên đăng nhập','info');
            break;
          }
          case 3: {
            alert2('NO AUTHORITY', 'Tài khoản không đủ quyền','warning');
            break;
          }
          default: {
            let index = this.employees.findIndex(emp => emp.id == id);
            this.employees.splice(index, 1);
            alert2('DELETED',"Đã xóa nhân viên thành công",'success')
            break;
          }
        }
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
