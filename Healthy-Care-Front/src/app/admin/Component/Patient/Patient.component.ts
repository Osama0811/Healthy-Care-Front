import { hospitalService } from './../../Services/hospital.service';
import { BloodService } from './../../Services/blood.service';
import { IhospitalDownModel, IuserDownModel, userDownModel, hospitalDropDown } from './../../Model/DropDown';
import { userService } from './../../Services/user.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EmailValidator, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IPatientDto {//get all data table
  id: string | undefined;
  userId:string | undefined;
  userName: string | undefined;
  birthDate: string | undefined;
  age: number | undefined;
  nationalNum: string | undefined;
  email: EmailValidator | undefined;
  phone: number | undefined;
  alterPhone: number | undefined;
  bloodId: string | undefined;
  bloodType: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  joinedDate: Date | undefined;

}
export interface IBloodDropDown {//get all data table
  id: string | undefined;
  name: string | undefined;
}


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Patient' }], //controller name
})
export class PatientComponent implements OnInit, OnDestroy , AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me

  userDropDown: IuserDownModel[] = [];
  BloodDropDown: IBloodDropDown[] = [];
  hospitalDropDown: IhospitalDownModel[] = [];
  PatientList: IPatientDto[] = [];// dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private userService: userService,
    private BloodService: BloodService,
    private hospitalService:hospitalService

  ) {}
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.userService.userDropDown().subscribe(
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
              this.userDropDown = data.resource.reduce((acc: IuserDownModel[], el) => {
                let obj = el as IuserDownModel;
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
      this.BloodService.BloodDropDown().subscribe(
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
              this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el) => {
                let obj = el as IBloodDropDown;
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

  }
  initConfigInput(): void {
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'userId',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'hospital Id',
        name: 'hospitalId',
        placeholder: 'Enter hospital Id',
        validation: [Validators.required],

      },
      // {
      //   type: 'input',
      //   label: 'Patient blood Id',
      //   name: 'bloodId',
      //   placeholder: 'Enter blood Id',
      //   validation: [Validators.required, Validators.minLength(4)],

      // },
      {
        type: 'select',
        label: ' blood ',
        name: 'bloodId',
        options: this.BloodDropDown.map(el => el.name),
        value: this.BloodDropDown.map(el => el.id),
        placeholder: 'Enter blood Id',
        validation: [Validators.required],
    },
      {
        type: 'input',
        label: 'Patient imageBase',
        name: 'imageBase64',
        placeholder: 'Enter your image',

      },
      {
        type: 'input',
        label: 'Patient file Name',
        name: 'fileName',
        placeholder: 'Enter file Name',

      },
      {
        type: 'select',
        label: 'National number',
        name: 'userId',
        options: this.userDropDown.map(el => el.nationalNum),
        value: this.userDropDown.map(el => el.id),
        placeholder: 'Enter  national number',
        validation: [Validators.required],
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
    ];
}
  ngOnInit() {


    this.SubscriptionList.push(
      this.globalService.GetAll<IPatientDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.PatientList = data.resource.reduce((acc: IPatientDto[], el) => {
                let obj = el as IPatientDto;
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
      { field: 'id', header: 'Patient ID' },
      { field: 'userId', header: 'Patient Id of User' },
      { field: 'userName', header: 'Patient Name of User' },
      { field: 'birthDate', header: 'Patient Birth date' },
      { field: 'age', header: 'Patient Age' },
      { field: 'nationalNum', header: 'Patient National number' },
      { field: 'email', header: 'Patient Email' },
      { field: 'phone', header: 'Patient Phone' },
      { field: 'alterPhone', header: 'Patient Alter Phone' },
      { field: 'bloodId', header: 'Patient Blood Id' },
      { field: 'bloodType', header: 'Patient Blood Type' },
      { field: 'hospitalId', header: 'Patient Hospital Id' },
      { field: 'hospitalName', header: 'Patient Hospital Name' },
      { field: 'joinedDate', header: 'the date of join' },

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
