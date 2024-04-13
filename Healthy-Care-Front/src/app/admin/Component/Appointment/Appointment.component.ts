import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IAppointmentDto {//get all data table
  id: string | undefined;
  patientId: string | undefined;
  patientName: string | undefined;
  date: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  departmentId: string | undefined;
  departmentName: string | undefined;
  doctorId: string | undefined;
  doctorName: string | undefined;
  code: number | undefined;
  status: number | undefined;



}

@Component({
  selector: 'app-Appointment',
  templateUrl: './Appointment.component.html',
  styleUrls: ['./Appointment.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Appointment' }], //controller name
})
export class AppointmentComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  AppointmentList: IAppointmentDto[] = []; // dto for data table
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
        label: 'Admin.patient Id',
        name: 'patientId',
        placeholder: 'Admin.Enter patient Id',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.date',
        name: 'date',
        placeholder: 'Admin.Enter date',
      },
      {
        type: 'input',
        label: 'Admin.hospital Id',
        name: 'hospitalId',
        placeholder: 'Admin.Enter hospital Id',
      },
      {
        type: 'input',
        label: 'Admin.department Id',
        name: 'departmentId',
        placeholder: 'Admin.Enter department Id',
      },
      {
        type: 'input',
        label: 'Admin.doctor Id',
        name: 'doctorId',
        placeholder: 'Admin.Enter doctorId',
      },
      {
        type: 'input',
        label: 'Admin.status',
        name: 'status',
        placeholder: 'Admin.Enter status',
      },

    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IAppointmentDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.AppointmentList = data.resource.reduce((acc: IAppointmentDto[], el) => {
                let obj = el as IAppointmentDto;
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
      //{ field: 'id', header: 'Appointment Id' },
     // { field: 'patientId', header: 'Appointment patient Id' },

      { field: 'patientName', header: 'Admin.Appointment patient Name' },
      { field: 'date', header: 'Admin.Appointment date' },
     // { field: 'hospitalId', header: 'Appointment hospital Id' },
      { field: 'hospitalName', header: 'Admin.Appointment hospital Name' },
     // { field: 'departmentId', header: 'Appointment department Id' },
      { field: 'departmentName', header: 'Admin.Appointment department Name' },
     // { field: 'doctorId', header: 'Appointment doctor Id' },
      { field: 'doctorName', header: 'Admin.Appointment doctor Name' },
      { field: 'code', header: 'Admin.Appointment code' },
      { field: 'status', header: 'Admin.Appointment status' },




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
