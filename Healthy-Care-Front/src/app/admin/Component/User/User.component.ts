import { EnumService } from './../../Services/enum.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { IEnumDropDown } from '../../Model/DropDown';
export interface IUserDto {//get all data table
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  roleId: number | undefined;
  roleType: string | undefined;
  birthDate: string | undefined;
  nationalNum: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  alterPhone: string | undefined;
  createdBy: string | undefined;
  bloodTypeId: string | undefined;
  bloodType: string | undefined;
  addressTitle: string | undefined;
  countryId: string | undefined;
  countryName: string | undefined;
}

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'User' }], //controller name
})
export class UserComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  RoleTypeDropDown: IEnumDropDown[] = [];

  UserList: IUserDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private EnumService:EnumService
  ) {}

  ngAfterViewInit(): void { //This Will return my drop data from service
    this.SubscriptionList.push(
      this.EnumService.GetEnumDropDown("GetRoleType").subscribe(
        (data) => {
console.log(data);
          this.RoleTypeDropDown = data.reduce((acc: IEnumDropDown[], el) => {
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
        NonVisible:true
      },
      {
        type: 'input',
        label: 'Admin.userNamee',
        name: 'userNamee',
        placeholder: 'Admin.Enter userName',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.password',
        name: 'password',
        placeholder: 'Admin.Enter password',
        validation: [Validators.required, Validators.minLength(4)],

      },

      // {
      //   type: 'input',
      //   label: 'roleType',
      //   name: 'roleType',
      //   placeholder: 'Enter roleType',
      //   validation: [Validators.required, Validators.minLength(4)],

      // },
      {
        type: 'select',
        label: 'Admin.Role Type',
        name: 'RoleType',
        options: this.RoleTypeDropDown.map(el => el.key),
        value: this.RoleTypeDropDown.map(el => el.value),
        placeholder: 'Admin.Enter  special Flag',
        validation: [Validators.required],
    },
      {
        type: 'input',
        label: 'Admin.birthDate',
        name: 'birthDate',
        placeholder: 'Admin.Enter birthDate',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.nationalNum',
        name: 'nationalNum',
        placeholder: 'Admin.Enter nationalNum',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.email',
        name: 'email',
        placeholder: 'Admin.Enter email',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.phone',
        name: 'phone',
        placeholder: 'Admin.Enter phone',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.alterPhone',
        name: 'alterPhone',
        placeholder: 'Admin.Enter alterPhone',
        validation: [Validators.required, Validators.minLength(4)],

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
    ];
}
  ngOnInit() {

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IUserDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.UserList = data.resource.reduce((acc: IUserDto[], el) => {
                let obj = { id: el.id, userName: el.userName, password: el.password, roleId: el.roleId, roleType: el.roleType, birthDate: el.birthDate, nationalNum: el.nationalNum, email: el.email, phone: el.phone, alterPhone: el.alterPhone, createdBy: el.createdBy, bloodTypeId: el.bloodTypeId, bloodType: el.bloodType, addressTitle: el.addressTitle, countryId: el.countryId, countryName: el.countryName} as IUserDto;
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
      { field: 'userName', header: 'Admin.userName' },
      { field: 'roleType', header: 'Admin.User roleType' },
      { field: 'birthDate', header: 'Admin.User birthDate' },
      { field: 'nationalNum', header: 'Admin.User nationalNum' },
      { field: 'email', header: 'Admin.User email' },
      { field: 'phone', header: 'Admin.User phone' },
      { field: 'alterPhone', header: 'Admin.User alterPhone' },

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
