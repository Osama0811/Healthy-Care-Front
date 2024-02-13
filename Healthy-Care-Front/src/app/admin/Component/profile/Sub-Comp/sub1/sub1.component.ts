import { MessageService } from 'primeng/api';
import { Controller, GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { Dept } from 'src/app/Auth/Interfaces/auth';
import { IUserDto, UserDtoClass } from '../../profile.component';
export interface UserDto{
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}
@Component({
  selector: 'app-sub1',
  templateUrl: './sub1.component.html',
  styleUrls: ['./sub1.component.css'],
  providers:[ GlobalService, { provide: Controller, useValue: 'User' }]
})
export class Sub1Component implements OnInit {
  //let body:Dept;
  //body={Id:undefined,Name:"Testts",Description:"Testts"};

  DeptList: UserDto[] = [];
  cols: any[] = [];
  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.globalService.GetAll<UserDto,null>().subscribe(
      (data) => {
        if (data.success) {
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {
            let newBloodList:IUserDto[]=[];
            this.DeptList=data.resource.reduce((acc: IUserDto[], el) => {
              let obj = { id: el.id, userName: el.userName ,password:el.password} as IUserDto;
              acc.push(obj);
              return acc;
          }, []);

           // this.DeptList = data.resource as IUserDto[];
            //this.DeptList.map(d=>console.log(d ));
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
