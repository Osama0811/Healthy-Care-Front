import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface ITools_DepartmentDto {
  id: string | undefined;
  toolsId: string | undefined;
  departmentId: string | undefined;

}

@Component({
  selector: 'app-Tools_Department',
  templateUrl: './Tools_Department.component.html',
  styleUrls: ['./Tools_Department.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Tools_Department' }],
})
export class Tools_DepartmentComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  Tools_DepartmentList: ITools_DepartmentDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {


  }
  ngOnInit() {
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'Tools Id',
        name: 'toolsId',
        placeholder: 'Enter Tools Id ',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Department Id',
        name: 'departmentId',
        placeholder: 'Enter Department Id ',

      },



    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<ITools_DepartmentDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newTools_DepartmentList: ITools_DepartmentDto[] = [];
              this.Tools_DepartmentList = data.resource.reduce((acc: ITools_DepartmentDto[], el) => {
                let obj = el as ITools_DepartmentDto;
                acc.push(obj);
                return acc;
              }, []);
              //this.DeptList = data.resource as UserDtoClass[];
              console.log('done');
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
      )
    );

    this.cols = [
      { field: 'toolsName', header: 'Tools Name' },
      { field: 'departmentName', header: 'Department Name' },


    ];
  }
  ngOnDestroy(): void {
    if (this.SubscriptionList) {
      this.SubscriptionList.forEach((subscription) =>
        subscription.unsubscribe()
      );
      this.SubscriptionList = [];
    }
  }
}
