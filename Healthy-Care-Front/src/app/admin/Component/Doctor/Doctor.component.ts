import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { DoctorService } from '../../Services/doctor.service';
export interface IDoctorDto {
  id: string | undefined;
  userId: string | undefined;
  hospitalId: string | undefined;
  type: number | undefined;
}
export interface IDoctorDropDown {//get all data table
  id: string | undefined;
  name: string | undefined;
}

@Component({
  selector: 'app-Doctor',
  templateUrl: './Doctor.component.html',
  styleUrls: ['./Doctor.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Doctor' }],
})
export class DoctorComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  DoctorList: IDoctorDto[] = [];
  DoctorDropDown: IDoctorDropDown[] = []; // dto for DropDown

  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private doctorService: DoctorService
  ) {


  }
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.doctorService.DoctorDropDown().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              // this.DoctorDropDown = data.resource.reduce((acc: IDoctorDropDown[], el:IDoctorDropDown) => {
              //   let obj = { id: el.id, name: el.name} as IDoctorDropDown;
              //   acc.push(obj);
              //   return acc;
              // }, []);

              //this.DeptList = data.resource as UserDtoClass[];
              this.DoctorDropDown = data.resource.reduce((acc: IDoctorDropDown[], el) => {
                let obj = el as IDoctorDropDown;
                acc.push(obj);
                return acc;
              }, []);
              console.log(this.DoctorDropDown);
              console.log('done');
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
            label: 'Id',
            name: 'id',
            placeholder: 'Id',
            NonVisible: true
        },
        {
          type: 'input',
          label: ' User Id',
          name: 'userId',
          placeholder: 'Enter User Id ',
          validation: [Validators.required],

        },
        {
          type: 'input',
          label: ' Hospital Id',
          name: 'hospitalId',
          placeholder: 'Enter Hospital Id ',

        },
        {
          type: 'input',
          label: ' Type',
          name: 'type',
          placeholder: 'Enter Type',

        },
        {
          type: 'select',
          label: 'Type',
          name: 'type',
          options: this.DoctorDropDown.map(el => el.name),
          value: this.DoctorDropDown.map(el => el.id),
          placeholder: 'Enter Type',
          validation: [Validators.required],
      },
    ];
}
  ngOnInit() {
    console.log(this.DoctorDropDown);
    // this.configInput = [
    //   {
    //     type: 'input',
    //     label: 'Id',
    //     name: 'id',
    //     placeholder: 'Id',
    //     NonVisible:true
    //   },
    //   {
    //     type: 'input',
    //     label: ' User Id',
    //     name: 'userId',
    //     placeholder: 'Enter User Id ',
    //     validation: [Validators.required],

    //   },
    //   {
    //     type: 'input',
    //     label: ' Hospital Id',
    //     name: 'hospitalId',
    //     placeholder: 'Enter Hospital Id ',

    //   },
    //   {
    //     type: 'input',
    //     label: ' Type',
    //     name: 'type',
    //     placeholder: 'Enter Type',

    //   },

    //];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IDoctorDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newDoctorList: IDoctorDto[] = [];
              this.DoctorList = data.resource.reduce((acc: IDoctorDto[], el) => {
                let obj = el as IDoctorDto;
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
      { field: 'nationalNum', header: 'National Number' },
      { field: 'hospitalName', header: 'Hospital Name' },
      { field: 'typeName', header: 'Type Name' },


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
