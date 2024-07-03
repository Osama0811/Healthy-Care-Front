import { DepartmentService } from './../../Services/department.service copy';
import { DepartmentDropDown, IDepartmentDownModel } from './../../Model/DropDown';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { IX_RayDownModel } from '../../Model/DropDown';
import { X_RayService } from '../../Services/X_Ray.service';
export interface IX_Ray_DepartmentDto {//get all data table
  id: string | undefined;
  x_RayId: string | undefined;
  x_RayName: string | undefined;
  departmentId: string | undefined;
  departmentName: string | undefined;
}

@Component({
  selector: 'app-X_Ray_Department',
  templateUrl: './X_Ray_Department.component.html',
  styleUrls: ['./X_Ray_Department.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'X_Ray_Department' }], //controller name
})
export class X_Ray_DepartmentComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  X_RayDropDown: IX_RayDownModel[] = [];
  DepartmentDropDown: IDepartmentDownModel[] = [];
  X_Ray_DepartmentList: IX_Ray_DepartmentDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private x_RayService:X_RayService,
    private DepartmentService:DepartmentService
  ) {}

    ngAfterViewInit(): void {
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
    this.SubscriptionList.push(
        this.x_RayService.X_RayDropDown().subscribe(
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
                this.X_RayDropDown = data.resource.reduce((acc: IX_RayDownModel[], el) => {
                  let obj = el as IX_RayDownModel;
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
  initConfigInput() {
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      },
      // {
      //   type: 'input',
      //   label: 'x_RayId',
      //   name: 'x_RayId',
      //   placeholder: 'Enter x_RayId',
      //   validation: [Validators.required, Validators.minLength(4)],

      // },
      // {
      //   type: 'input',
      //   label: 'departmentId',
      //   name: 'departmentId',
      //   placeholder: 'Enter departmentId',
      //   validation: [Validators.required, Validators.minLength(4)],

      // },
      // {
      //   type: 'input',
      //   label: 'hospital Count',
      //   name: 'hospitalCount',
      //   placeholder: 'Enter hospital Count',
      // },
      {
        type: 'select',
        label: 'Admin.Department id',
        name: 'id',
        options: this.DepartmentDropDown.map(el => el.name),
        value: this.DepartmentDropDown.map(el => el.id),
        placeholder: 'Admin.Enter x-hospital Id',
        validation: [Validators.required],

      },
      {
        type: 'select',
        label: 'Admin.X_Ray id',
        name: 'x_RayId',
        options: this.X_RayDropDown.map(el => el.title),
        value: this.X_RayDropDown.map(el => el.id),
        placeholder: 'Admin.Enter x-Ray Id',
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
      this.globalService.GetAll<IX_Ray_DepartmentDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.X_Ray_DepartmentList = data.resource.reduce((acc: IX_Ray_DepartmentDto[], el) => {
                let obj = { id:el.id, x_RayId:el.x_RayId, x_RayName:el.x_RayName, departmentId:el.departmentId, departmentName:el.departmentName} as IX_Ray_DepartmentDto;
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
      { field: 'x_RayId', header: 'x_RayId' },
      { field: 'x_RayName', header: 'x_RayName' },
      { field: 'departmentId', header: 'departmentId' },
      { field: 'departmentName', header: 'departmentName' },
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
