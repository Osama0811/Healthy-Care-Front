import { CategoryService } from './../../Services/Category.service';
import { AddressService } from './../../Services/Address.service copy';
import { AddressDropDown, CategoryDropDown, IAddressDownModel, ICategoryDownModel } from './../../Model/DropDown';
import { Component, OnDestroy, OnInit, Type, AfterViewInit } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IHospitalDto {//get all data table
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  categoryId: string | undefined;
  categoryName: string | undefined;
  addressId: string | undefined;
  addressTitle: string | undefined;
  imagePath: string | undefined;


}

@Component({
  selector: 'app-Hospital',
  templateUrl: './Hospital.component.html',
  styleUrls: ['./Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Hospital' }], //controller name
})
export class HospitalComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  AddressDropDown: IAddressDownModel[] = [];
  CategoryDropDown: ICategoryDownModel[] = [];
  HospitalList: IHospitalDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update
  AdminList: string[] = [];
  AdminExist: boolean= false;
  userId!: string | null ;
  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private AddressService: AddressService,
    private CategoryService: CategoryService
  ) {}
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.AddressService.AddressDropDown().subscribe(
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
              this.AddressDropDown = data.resource.reduce((acc: IAddressDownModel[], el) => {
                let obj = el as IAddressDownModel;
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
      this.CategoryService.CategoryDropDown().subscribe(
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
              this.CategoryDropDown = data.resource.reduce((acc: ICategoryDownModel[], el) => {
                let obj = el as ICategoryDownModel;
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
        label: 'Admin.Hospital description',
        name: 'description',
        placeholder: 'Admin.Enter Hospital description',
        validation: [Validators.required, Validators.minLength(4)],

      }
      // {
      //   type: 'input',
      //   label: 'hospital category Id',
      //   name: 'categoryId',
      //   placeholder: 'Enter hospital category Id',
      // },
      // {
      //   type: 'input',
      //   label: 'hospital address Id',
      //   name: 'addressId',
      //   placeholder: 'Enter hospital address Id',
      // },
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
        label: 'Admin.address Id',
        name: 'addressId',
        options: this.AddressDropDown.map(el => el.title),
        value: this.AddressDropDown.map(el => el.id),
        placeholder: 'Admin.Enter  national number',
        validation: [Validators.required],
    },
      {
        type: 'select',
        label: 'Admin.category Id',
        name: 'categoryId',
        placeholder: 'Admin.Chosse hospital',
        options: this.CategoryDropDown.map(el => el.name),
        value: this.CategoryDropDown.map(el => el.id),
    },
    ];
}
  ngOnInit() {
    this.AdminList=["6e70869a-15d6-44a3-0809-08dc2ce2a623"];
    this.userId=localStorage.getItem('UserId');
    if( this.AdminList.find(d=>d==this.userId)!=null)
      {
        debugger
this.AdminExist =true;
      }
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IHospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.HospitalList = data.resource.reduce((acc: IHospitalDto[], el) => {
                let obj = el as IHospitalDto;
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
      { field: 'name', header: 'Admin.Hospital Name' },
      { field: 'description', header: 'Admin.Hospital des' },

      { field: 'categoryName', header: 'Admin.Hospital category name' },
      { field: 'addressTitle', header: 'Admin.Hospital address title' },
      { field: 'imagePath', header: 'Admin.Hospital image' },

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
