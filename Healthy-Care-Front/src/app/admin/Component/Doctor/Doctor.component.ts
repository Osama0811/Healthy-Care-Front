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
import { EnumService } from '../../Services/enum.service';
import { IEnumDropDown } from '../../Model/DropDown';
export interface IDoctorDto {
  id: string | undefined;
  userId: string | undefined;
  hospitalId: string | undefined;
  type: number | undefined;
}
// export interface IDoctorTypeDropDown {//get all data table
//   key: string | undefined;
//   value: string | undefined;
// }

@Component({
  selector: 'app-Doctor',
  templateUrl: './Doctor.component.html',
  styleUrls: ['./Doctor.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Doctor' }],
})
export class DoctorComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  DoctorList: IDoctorDto[] = [];
  DoctorTypeDropDown: IEnumDropDown[] = []; // dto for DropDown

  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private enumService: EnumService
  ) {


  }
  ngAfterViewInit(): void { //This Will return my drop data from service
    this.SubscriptionList.push(
      this.enumService.GetEnumDropDown("GetDepartmentType").subscribe(
        (data) => {

          this.DoctorTypeDropDown = data.reduce((acc: IEnumDropDown[], el) => {
            let obj = el as IEnumDropDown;
            acc.push(obj);
            return acc;
          }, []);
          this.initConfigInput();
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
          label: 'Admin.User Id',
          name: 'userId',
          placeholder: 'Admin.Enter User Id',
          validation: [Validators.required],

        },
        {
          type: 'input',
          label: 'Admin.Hospital Id',
          name: 'hospitalId',
          placeholder: 'Admin.Enter Hospital Id',

        },
        {
          type: 'select',
          label: 'Admin.Type',
          name: 'type',
          options: this.DoctorTypeDropDown.map(el => el.key),
          value: this.DoctorTypeDropDown.map(el => el.value),
          placeholder: 'Admin.Enter Type',
          validation: [Validators.required],
      },
    ];
}
  ngOnInit() {
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
      { field: 'nationalNum', header: 'Admin.National Number' },
      { field: 'hospitalName', header: 'Admin.Hospital Name' },
      { field: 'typeName', header: 'Admin.Type Name' },


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
