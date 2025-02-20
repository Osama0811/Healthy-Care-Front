import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IDepartment_HospitalDto {//get all data table
  id: string | undefined;
  hospitalId: string | undefined;
  departmentId: string | undefined;
  numberOfDoctors: number | undefined;
  numderOfBeds: number | undefined;
  numberOfOccupiedBeds: number | undefined;
  hospitalName: string | undefined;
  departmentName: string | undefined;
}

@Component({
  selector: 'app-Department_Hospital',
  templateUrl: './Department_Hospital.component.html',
  styleUrls: ['./Department_Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Department_Hospital' }], //controller name
})
export class Department_HospitalComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  Department_HospitalList: IDepartment_HospitalDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {}
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
        label: 'Admin.hospitalId',
        name: 'hospitalId',
        placeholder: 'Admin.Enter  hospital',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Admin.departmentId',
        name: 'departmentId',
        placeholder: 'Admin.Enter departmentId',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Admin.numberOfDoctors',
        name: 'numberOfDoctors',
        textType:"number",
        placeholder: 'Admin.Enter  number Of Doctors',

      },
      {
        type: 'input',
        label: 'Admin.numberOfBeds',
        name: 'numberOfBeds',
        textType:"number",
        placeholder: 'Admin.Enter number Of Beds',

      },
      {
        type: 'input',
        label: 'Admin.numberOfOccupiedBeds',
        name: 'numberOfOccupiedBeds',
        textType:"number",
        placeholder: 'Admin.Enter number Of Occupied Beds',

      },

    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IDepartment_HospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.Department_HospitalList = data.resource.reduce((acc: IDepartment_HospitalDto[], el) => {
                let obj = { id: el.id, hospitalId: el.hospitalId, departmentId: el.departmentId, numberOfDoctors: el.numberOfDoctors, numderOfBeds: el.numderOfBeds, numberOfOccupiedBeds: el.numberOfOccupiedBeds, hospitalName: el.hospitalName, departmentName: el.departmentName} as IDepartment_HospitalDto;
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
      { field: 'hospitalName', header: 'Admin.hospitalName' },
      { field: 'departmentName', header: 'Admin.departmentName' },
      { field: 'numberOfDoctors', header: 'Admin.numberOfDoctors' },
      { field: 'numderOfBeds', header: 'Admin.numderOfBeds' },
      { field: 'numberOfOccupiedBeds', header: 'Admin.numberOfOccupiedBeds' },


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
