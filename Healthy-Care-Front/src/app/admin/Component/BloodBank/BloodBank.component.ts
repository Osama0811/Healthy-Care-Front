import { EnumService } from './../../Services/enum.service';
import { appointmentService } from './../../Services/appointment.service';
import { IuserDownModel, userDownModel, appointmentDropDown, IappointmentDownModel, IEnumDropDown } from './../../Model/DropDown';
import { BloodService } from './../../Services/blood.service';
import { userService } from './../../Services/user.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { IBloodDropDown } from '../BloodEquation/BloodEquation.component';
export interface IBloodBankDto {
  id: string | undefined;
  senderId: string | undefined;
  senderName: string | undefined;
  receiverId: string | undefined;
  receiverName: string | undefined;
  bloodtypeId: string | undefined;
  bloodtypeName: string | undefined;
  appointmentId: string | undefined;
  quantity: number | undefined;
  status: number | undefined;
  statusName: string | undefined;
}

@Component({
  selector: 'app-BloodBank',
  templateUrl: './BloodBank.component.html',
  styleUrls: ['./BloodBank.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'BloodBank' }],
})
export class BloodBankComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = [];

  BloodBankList: IBloodBankDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];
  BloodDropDown: IBloodDropDown[]=[];
  UserDropDown: IuserDownModel[]=[];
  appointmentDropDown:IappointmentDownModel[]=[];

  BloodStatusDropDown: IEnumDropDown[] = [];
  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private userService:userService,
    private BloodService:BloodService,
    private appointmentService:appointmentService,
    private enumService:EnumService

  ) {


  }
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.userService.userDropDown().subscribe(
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
    this.SubscriptionList.push(
      this.BloodService.BloodDropDown().subscribe(
        (data) => {

          if (data.success) {


              this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el:IBloodDropDown) => {
                let obj = { id: el.id, name: el.name} as IBloodDropDown;
                acc.push(obj);
                return acc;
              }, []);

              //this.DeptList = data.resource as UserDtoClass[];
              this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el) => {
                let obj = el as IBloodDropDown;
                acc.push(obj);
                return acc;
              }, []);
              console.log(this.BloodDropDown);
              console.log('done');
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
    this.SubscriptionList.push(
      this.appointmentService.appointmentDropDown().subscribe(
        (data) => {

          if (data.success) {


              this.appointmentDropDown = data.resource.reduce((acc: IappointmentDownModel[], el:IappointmentDownModel) => {
                let obj = { id: el.id, code: el.code} as IappointmentDownModel;
                acc.push(obj);
                return acc;
              }, []);


              console.log(this.BloodDropDown);
              console.log('done');
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
    this.SubscriptionList.push(
      this.enumService.GetEnumDropDown("GetBloodStatus").subscribe(
        (data) => {

          this.BloodStatusDropDown = data.reduce((acc: IEnumDropDown[], el) => {
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
            label: 'Admin.Id',
            name: 'id',
            placeholder: 'Admin.Id',
            NonVisible: true
        },
        {
          type: 'input',
          label: 'Admin.quantity',
          name: 'quantity',
          placeholder: 'Admin.Enter quantity',
          textType:'number'
        },
        {
            type: 'select',
            label: 'Admin.blood type Id',
            name: 'bloodtypeId',
            options: this.BloodDropDown.map(el => el.name),
            value: this.BloodDropDown.map(el => el.id),
            placeholder: 'Admin.Enter blood type Id',
            validation: [Validators.required],
        },

        {
          type: 'select',
          label: 'Admin. receiver Id',
          name: 'receiverId',
          options: this.UserDropDown.map(el => el.nationalNum),
          value: this.UserDropDown.map(el => el.id),
          placeholder: 'Admin.Enter receiver Id',
          validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'Admin. appointment Id',
        name: 'appointmentId',
        options: this.appointmentDropDown.map(el => el.code),
        value: this.appointmentDropDown.map(el => el.id),
        placeholder: 'Admin.Enter receiver Id',
        validation: [Validators.required],
    },
    {
      type: 'select',
      label: 'Admin.status',
      name: 'status',
      options: this.BloodStatusDropDown.map(el => el.key),
      value: this.BloodStatusDropDown.map(el => el.value),
      placeholder: 'Admin.Enter status',
      validation: [Validators.required],
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
      this.globalService.GetAll<IBloodBankDto, null>().subscribe(
        (data) => {

          if (data.success) {

              let newBloodBankList: IBloodBankDto[] = [];
              this.BloodBankList = data.resource.reduce((acc: IBloodBankDto[], el) => {
                let obj = el as IBloodBankDto;
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
      { field: 'senderName', header: 'Admin.Sender Name' },
      { field: 'receiverName', header: 'Admin.Receiver Name' },
      { field: 'bloodtypeName', header: 'Admin.Blood Type' },
      { field: 'statusName', header: 'Admin.Status' },


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
