import { userService } from './../../Services/user.service';
import { hospitalService } from './../../Services/hospital.service';
import { IhospitalDownModel, IuserDownModel, hospitalDropDown } from './../../Model/DropDown';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IAdmin_HospitalDto {//get all data table
  id: string | undefined;
  userId: string | undefined;
  nationalNum: number | undefined;
  userName: number | undefined;
  hospitalId: number | undefined;
  hospitalName: number | undefined;

}

@Component({
  selector: 'app-Admin_Hospital',
  templateUrl: './Admin_Hospital.component.html',
  styleUrls: ['./Admin_Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Admin_Hospital' }], //controller name
})
export class Admin_HospitalComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  hospitalDropDown: IhospitalDownModel[] = [];
  UserDropDown: IuserDownModel[] = [];

  Admin_HospitalList: IAdmin_HospitalDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private hospitalService: hospitalService,
    private userService: userService
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
      this.userService.AdminDropDown().subscribe(
        (data) => {

          if (data.success) {


              this.UserDropDown = data.resource.map(d=>d).reduce((acc: IuserDownModel[], el) => {
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
      }
 ,
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
        label: 'Admin.hospital Id',
        name: 'hospitalId',
        options: this.hospitalDropDown.map(el => el.name),
        value: this.hospitalDropDown.map(el => el.id),
        placeholder: 'Admin.Enter hospital id',
        validation: [Validators.required],
    },
    {
      type: 'select',
      label: 'Admin.user Id',
      name: 'userId',
      options: this.UserDropDown.map(el => el.nationalNum),
      value: this.UserDropDown.map(el => el.id),
      placeholder: 'Admin.Enter user id',
      validation: [Validators.required],
  },

    ];
}
  ngOnInit() {


    this.SubscriptionList.push(
      this.globalService.GetAll<IAdmin_HospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.Admin_HospitalList = data.resource.reduce((acc: IAdmin_HospitalDto[], el) => {
                let obj = el as IAdmin_HospitalDto;
                acc.push(obj);
                return acc;
              }, []);
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
      { field: 'userId', header: 'Admin.user Id' },
      { field: 'nationalNum', header: 'Admin.national number' },
      { field: 'userName', header: 'Admin.user name' },
      { field: 'hospitalId', header: 'Admin.hospital Id' },
      { field: 'hospitalName', header: 'Admin.hospital Name' },


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
