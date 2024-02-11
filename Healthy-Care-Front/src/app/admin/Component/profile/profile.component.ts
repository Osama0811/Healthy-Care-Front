import { UserDto } from './Sub-Comp/sub1/sub1.component';
import { GeneralResponse } from './../../../Shared/GeneralResponse';
import { Dept, IDept } from './../../../Auth/Interfaces/auth';
import { GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginRequest } from 'src/app/Auth/Interfaces/auth';
export interface IUserDto{
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}
export class UserDtoClass implements IUserDto{
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  items: MenuItem[] | undefined;
  //DeptList: GeneralResponse<Dept[]> | undefined;

  activeItem: MenuItem | undefined;

  DeptList: UserDtoClass[] = [];
  cols: any[] = [];
constructor( private globalService: GlobalService<any>,
  private messageService: MessageService){

}
  ngOnInit() {
  //   this.items = [
  //     { label: 'Home', icon: 'pi pi-fw pi-home' ,routerLink:"Sub1"},
  //     { label: 'Calendar', icon: 'pi pi-fw pi-calendar',routerLink:"Sub1" },
  //     { label: 'Edit', icon: 'pi pi-fw pi-pencil' ,routerLink:"Sub1" },
  //     { label: 'Documentation', icon: 'pi pi-fw pi-file' ,routerLink:"Sub1"},
  //     { label: 'Settings', icon: 'pi pi-fw pi-cog',routerLink:"Sub1" }
  // ];
  //     this.activeItem = this.items[0];
  this.globalService.GetAll<UserDtoClass,null>().subscribe(
    (data) => {
      if (data.success) {
        console.log("hello"+data);
        if (data.resourceCount == 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'No Data found',
          });
        } else {
          this.DeptList = data.resource.map(({ id, userName, password }) => ({ id, userName, password }));

          //this.DeptList = data.resource as UserDtoClass[];
          this.DeptList.map(d=>console.log(d+"hhjj"));
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: data.message,
          });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: data.message,
        });
      }
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
      });
    }
  );

  this.cols = [
    { field: 'id', header: 'Id' },
    { field: 'userName', header: 'userName' },
    { field: 'password', header: 'password' },
  ];
  }
}
