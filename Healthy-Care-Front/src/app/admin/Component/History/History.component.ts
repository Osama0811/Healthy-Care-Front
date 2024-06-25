
import { DepartmentService } from './../../Services/department.service copy';
import { hospitalService } from './../../Services/hospital.service';
import { PatientService } from './../../Services/patient.service';
import { IPatientDownModel, hospitalDropDown, IhospitalDownModel, DepartmentDropDown, IDepartmentDownModel, IAddressDownModel, ICategoryDownModel } from './../../Model/DropDown';
import { Component, OnDestroy, OnInit, Type, AfterViewInit } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IHistoryDto {//get all data table
  id: string | undefined;
  titleAr: string | undefined;
  titleEn: string | undefined;
  title: string | undefined;
  descriptionAr: string | undefined;
  descriptionEn: string | undefined;
  description: string | undefined;
  patientId: string | undefined;
  patientName: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  departmentId: string | undefined;
  departmentName: string | undefined;
  date: string | undefined;

}

@Component({
  selector: 'app-History',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'History' }], //controller name
})
export class HistoryComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  patientDropDown: IPatientDownModel[] = [];
  hospitalDropDown: IhospitalDownModel[] = [];
  DepartmentDropDown: IDepartmentDownModel[] = [];
  AddressDropDown: IAddressDownModel[] = [];
  CategoryDropDown: ICategoryDownModel[] = [];

  HistoryList: IHistoryDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private patientService: PatientService,
    private hospitalService: hospitalService,
    private DepartmentService: DepartmentService,
  ) {}
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.patientService.PatientDropDown().subscribe(
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
              this.patientDropDown = data.resource.reduce((acc: IPatientDownModel[], el) => {
                let obj = el as IPatientDownModel;
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
      this.DepartmentService.DepartmentDropDown().subscribe(
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
              this.DepartmentDropDown = data.resource.reduce((acc: IDepartmentDownModel[], el) => {
                let obj = el as IDepartmentDownModel;
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
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      },
      {
        type: 'input',
        label: ' title Ar',
        name: 'titleAr',
        placeholder: 'Enter  title in Arabic',


      },
      {
        type: 'input',
        label: ' title En',
        name: 'titleEn',
        placeholder: 'Enter title in English',


      },
      {
        type: 'input',
        label: ' description Ar',
        name: 'descriptionAr',
        placeholder: 'Enter  description in Arabic',


      },
      {
        type: 'input',
        label: ' description En',
        name: 'descriptionEn',
        placeholder: 'Enter description in English',


      },
      {
        type: 'input',
        label: ' date',
        name: 'date',
        textType:"date",
        placeholder: 'Enter date',


      }

      ,{
        type: 'input',
        label: 'Imagebase64',
        name: 'imageBase64',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'Admin.FileName',
        name: 'fileName',
        textType:'file',
        placeholder: 'Admin.Enter Image',
        //validation: [Validators.required],
      },

      // {
      //   type: 'select',
      //   label: 'select ',
      //   name: 'option',
      //   options: ["jkkj","knl","kn","hbj"],
      //   value:[1,2,3,4],
      //   placeholder: 'Select an option',
      //   validation: [Validators.required]
      // },
      {
        type: 'select',
        label: 'address Id',
        name: 'addressId',
        options: this.AddressDropDown.map(el => el.title),
        value: this.AddressDropDown.map(el => el.id),
        placeholder: 'Enter  national number',
        validation: [Validators.required],
    },
      {
        type: 'select',
        label: 'hospital Id',
        name: 'hospitalId',
        placeholder: 'Chosse hospital',
        options: this.hospitalDropDown.map(el => el.name),
        value: this.hospitalDropDown.map(el => el.id),
    },

  {
    type: 'select',
    label: 'hospital Id',
    name: 'hospitalId',
    placeholder: 'Chosse hospital',
    options: this.DepartmentDropDown.map(el => el.name),
    value: this.DepartmentDropDown.map(el => el.id),
},
    ];
}
  ngOnInit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IHistoryDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.HistoryList = data.resource.reduce((acc: IHistoryDto[], el) => {
                let obj = el as IHistoryDto;
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
      //{ field: 'id', header: 'Admin.History Id' },
      { field: 'title', header: 'Admin.History title' },

      { field: 'description', header: 'Admin.History description' },

      //{ field: 'patientId', header: 'History patient Id' },

      { field: 'patientName', header: 'Admin.History patient name' },

      //{ field: 'hospitalId', header: 'History hospital Id' },
      { field: 'hospitalName', header: 'Admin.History hospital name' },

      //{ field: 'doctorId', header: 'History doctor Id' },


     // { field: 'departmentId', header: 'History department Id' },

      { field: 'departmentName', header: 'Admin.History department name' },
      { field: 'date', header: 'Admin.History date' },



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
