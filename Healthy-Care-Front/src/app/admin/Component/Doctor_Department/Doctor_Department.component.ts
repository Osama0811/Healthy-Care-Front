import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IDoctor_DepartmentDto {
  id: string | undefined;
  doctorId: string | undefined;
  departmentId: string | undefined;
  isActive:     boolean|undefined;
  dateStart:  string | undefined;
  dateEnd:  string |undefined;

}

@Component({
  selector: 'app-Doctor_Department',
  templateUrl: './Doctor_Department.component.html',
  styleUrls: ['./Doctor_Department.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Doctor_Department' }],
})
export class Doctor_DepartmentComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  Doctor_DepartmentList: IDoctor_DepartmentDto[] = [];
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
        label: 'Admin.Doctor Id',
        name: 'doctorId',
        placeholder: 'Admin.Enter Doctor Id',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Admin.Department Id',
        name: 'departmentId',
        placeholder: 'Admin.Enter Department Id',
        validation: [Validators.required],


      },
      {
        type: 'input',
        label: 'Admin.Is Active',
        name: 'isActive',
        placeholder: 'Admin.Enter true/false',
        validation: [Validators.required],


      },{
        type: 'input',
        label: 'Admin.Date Start',
        name: 'dateStart',
        placeholder: 'Admin.Enter Date Start',
        validation: [Validators.required],


      },{
        type: 'input',
        label: 'Admin.Date End',
        name: 'dateEnd',
        placeholder: 'Admin.Enter Date End',


      },



    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IDoctor_DepartmentDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newDoctor_DepartmentList: IDoctor_DepartmentDto[] = [];
              this.Doctor_DepartmentList = data.resource.reduce((acc: IDoctor_DepartmentDto[], el) => {
                let obj = el as IDoctor_DepartmentDto;
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
      { field: 'doctorName', header: 'Admin.Doctor Name' },
      { field: 'departmentName', header: 'Admin.Department Name' },
      { field: 'isActive', header: 'Admin.Is Active' },
      { field: 'dateStart', header: 'Admin.Date Start' },
      { field: 'dateEnd', header: 'Admin.Date End' },



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
