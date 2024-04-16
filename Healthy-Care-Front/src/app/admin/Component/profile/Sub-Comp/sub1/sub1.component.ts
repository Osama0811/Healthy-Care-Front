import { MessageService } from 'primeng/api';
import { Controller, GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { Dept } from 'src/app/Auth/Interfaces/auth';
import { IUserDto, UserDtoClass } from '../../profile.component';
import { MenusMainDetailsService } from 'src/app/admin/Services/MenusMainDetails.service';
import { IMenusMainDetailsDto } from 'src/app/admin/Model/DropDown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub1',
  templateUrl: './sub1.component.html',
  styleUrls: ['./sub1.component.css'],
  providers:[ GlobalService, { provide: Controller, useValue: 'MenusMainDetails' }]
})
export class Sub1Component implements OnInit,OnDestroy {
  //let body:Dept;
  //body={Id:undefined,Name:"Testts",Description:"Testts"};
  SubscriptionList:Subscription[]=[];
  DeptList: IMenusMainDetailsDto[] = [];
  cols: any[] = [];
  constructor(
    private menusMainDetailsService: MenusMainDetailsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
this.SubscriptionList.push(
    this.menusMainDetailsService.GetAll().subscribe(
      (data) => {
        if (data.success) {
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {

          this.DeptList = data.resource.reduce((acc: IMenusMainDetailsDto[], el) => {
            let obj = el as IMenusMainDetailsDto;
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
    ));

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'menuMainName', header: 'Menu Main' },
      { field: 'parentName', header: 'Parent ' },
      { field: 'subParentName', header: 'sub Parent' }

    ];
  }
  ngOnDestroy(): void {
    if (this.SubscriptionList) {
      this.SubscriptionList.forEach(subscription => subscription.unsubscribe());
      this.SubscriptionList = [];
    }
  }
}
