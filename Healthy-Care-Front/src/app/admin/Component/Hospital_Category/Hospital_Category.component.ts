import { CategoryService } from './../../Services/Category.service';
import { hospitalService } from './../../Services/hospital.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { ICategoryDownModel, IhospitalDownModel } from '../../Model/DropDown';
export interface IHospital_CategoryDto {//get all data table
  id: string | undefined;
  hospitalId: string | undefined;
  categoryId: string | undefined;
  hospitalName: string | undefined;
  categoryName: string | undefined;
}

@Component({
  selector: 'app-Hospital_Category',
  templateUrl: './Hospital_Category.component.html',
  styleUrls: ['./Hospital_Category.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Hospital_Category' }], //controller name
})
export class Hospital_CategoryComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  categoryDropDown: ICategoryDownModel[] = [];
  hospitalDropDown: IhospitalDownModel[] = [];
  Hospital_CategoryList: IHospital_CategoryDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private hospitalService: hospitalService,
    private CategoryService: CategoryService
  ) {}
  ngAfterViewInit(): void {
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
              this.categoryDropDown = data.resource.reduce((acc: ICategoryDownModel[], el) => {
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
        placeholder: 'Id',
        NonVisible:true
      },

      {
        type: 'select',
        label: 'categoryId',
        name: 'categoryId',
        options: this.categoryDropDown.map(el => el.name),
        value: this.categoryDropDown.map(el => el.id),
        //placeholder: 'Enter  category',
        validation: [Validators.required],
    },
    {
      type: 'select',
      label: 'hospitalId',
      name: 'hospitalId',
      options: this.hospitalDropDown.map(el => el.name),
      value: this.hospitalDropDown.map(el => el.id),
      //placeholder: 'Enter  hospital name',
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
      this.globalService.GetAll<IHospital_CategoryDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.Hospital_CategoryList = data.resource.reduce((acc: IHospital_CategoryDto[], el) => {
                let obj = { id: el.id, hospitalId: el.hospitalId, categoryId: el.categoryId, hospitalName: el.hospitalName, categoryName: el.categoryName} as IHospital_CategoryDto;
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
      { field: 'id', header: 'id' },
      { field: 'hospitalId', header: 'hospitalId' },
      { field: 'categoryId', header: 'categoryId' },
      { field: 'hospitalName', header: 'hospitalName' },
      { field: 'categoryName', header: 'categoryName' },
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
