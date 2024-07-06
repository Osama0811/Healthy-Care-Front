import { hospitalService } from './../../Services/hospital.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import { IhospitalDownModel, hospitalDropDown, X_RayDropDown, IX_RayDownModel } from './../../Model/DropDown';

import { X_RayService } from '../../Services/X_Ray.service';

import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';

export interface IBoooking_X_RayDto {//get all data table
  id: string | undefined;
  x_RayId: string | undefined;
  x_RayName: string | undefined;
  patientId: string | undefined;
  patientNationalNum: string | undefined;
  date: string | undefined;

  hospitalId: string | undefined;

  hospitalName: string | undefined;

  code: number | undefined;

  status: number | undefined;

}

@Component({
  selector: 'app-Booking_X_Ray',
  templateUrl: './Booking_X_Ray.component.html',
  styleUrls: ['./Booking_X_Ray.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Booking_X_Ray' }], //controller name
})
export class Booking_X_RayComponent implements OnInit, OnDestroy ,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  Booking_X_RayList: IBoooking_X_RayDto[] = []; // dto for data table: IDepartmentDto[] = []; // dto for data table
  X_RayDropDown: IX_RayDownModel[] = []; // dto for data table
  hospitalDropDown: IhospitalDownModel[] = [];
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update


  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private x_RayService:X_RayService,
    private hospitalService:hospitalService
  ) {}
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.hospitalService.hospitalDropDown().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              // this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el:IBloodDropDown) => {
              //   let obj = { id: el.id, name: el.name} as IBloodDropDown;
              //   acc.push(obj);
              //   return acc;
              // }, []);

              //this.DeptList = data.resource as UserDtoClass[];
              this.hospitalDropDown = data.resource.reduce((acc: IhospitalDownModel[], el) => {
                let obj = el as IhospitalDownModel;
                acc.push(obj);
                return acc;
              }, []);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: data.message,
              });
              this.initConfigInput();
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
  this.SubscriptionList.push(
      this.x_RayService.X_RayDropDown().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              // this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el:IBloodDropDown) => {
              //   let obj = { id: el.id, name: el.name} as IBloodDropDown;
              //   acc.push(obj);
              //   return acc;
              // }, []);

              //this.DeptList = data.resource as UserDtoClass[];
              this.X_RayDropDown = data.resource.reduce((acc: IX_RayDownModel[], el) => {
                let obj = el as IX_RayDownModel;
                acc.push(obj);
                return acc;
              }, []);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: data.message,
              });
              this.initConfigInput();
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

  }
  initConfigInput(): void {
    this.configInput = [
      {
        type: 'input',
        label: 'id',
        name: 'id',
        placeholder: 'Enter your id',
        NonVisible:true,

      },
      // {
      //   type: 'input',
      //   label: 'x_RayId',
      //   name: 'x_RayId',
      //   placeholder: 'Enter x_Ray Id',
      //   validation: [Validators.required],

      // },
      {
        type: 'select',
        label: 'Admin.hospital id',
        name: 'hospitalId',
        options: this.hospitalDropDown.map(el => el.name),
        value: this.hospitalDropDown.map(el => el.id),
        placeholder: 'Admin.Enter x-hospital Id',
        validation: [Validators.required],

      },
      {
        type: 'select',
        label: 'Admin.X_Ray id',
        name: 'x_RayId',
        options: this.X_RayDropDown.map(el => el.title),
        value: this.X_RayDropDown.map(el => el.id),
        placeholder: 'Admin.Enter x-Ray Id',
         validation: [Validators.required],

      },

      // {
      //   type: 'input',
      //   label: 'Booking_X_Ray specialFlag',
      //   name: 'specialFlag',
      //   placeholder: 'Enter Booking_X_Ray specialFlag',
      //   validation: [Validators.required, Validators.minLength(4)],
      // },
    //   {
    //     type: 'select',
    //     label: 'specialFlag',
    //     name: 'specialFlag',
    //     options: this.Booking_X_RayTypeDropDown.map(el => el.key),
    //     value: this.Booking_X_RayTypeDropDown.map(el => el.value),
    //     placeholder: 'Enter  special Flag',
    //     validation: [Validators.required],
    // },

    ]
}
ngOnInit() {


  this.SubscriptionList.push(
    this.globalService.GetAll<IBoooking_X_RayDto, null>().subscribe(
      (data) => {

        if (data.success) {
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {

            this.Booking_X_RayList = data.resource.reduce((acc: IBoooking_X_RayDto[], el) => {
              let obj = el as IBoooking_X_RayDto;
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
   // { field: 'id', header: 'ID' },
    // { field: 'id', header: 'Admin. id' },
    // { field: 'x_RayId', header: 'Admin.x_Ray Id' },
    { field: 'x_RayName', header: 'Admin.x_Ray name' },
    // { field: 'patientId', header: 'Admin.patient id' },
    { field: 'patientNationalNum', header: 'Admin.National number of patient' },
    { field: 'date', header: 'Admin.Birth date' },
    // { field: 'hospitalId', header: 'Admin.hospital Id' },
    { field: 'hospitalName', header: 'Admin.hospital name' },
    { field: 'code', header: 'Admin.code' },
    { field: 'status', header: 'Admin.status' },

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
