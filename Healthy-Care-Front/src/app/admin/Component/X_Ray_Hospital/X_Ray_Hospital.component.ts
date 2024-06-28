import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IX_Ray_HospitalDto {//get all data table
  id: string | undefined;
  x_RayId: string | undefined;
  x_RayName: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  imagePath: string | undefined;
}

@Component({
  selector: 'app-X_Ray_Hospital',
  templateUrl: './X_Ray_Hospital.component.html',
  styleUrls: ['./X_Ray_Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'X_Ray_Hospital' }], //controller name
})
export class X_Ray_HospitalComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  X_Ray_HospitalList: IX_Ray_HospitalDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {}
  ngOnInit() {
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
        label: 'x_RayId',
        name: 'x_RayId',
        placeholder: 'Enter x_RayId',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'hospitalId',
        name: 'hospitalId',
        placeholder: 'Enter hospitalId',
        validation: [Validators.required, Validators.minLength(4)],

      },
      // {
      //   type: 'input',
      //   label: 'hospital Count',
      //   name: 'hospitalCount',
      //   placeholder: 'Enter hospital Count',
      // },
      {
        type: 'select',
        label: 'select ',
        name: 'option',
        options: ["jkkj","knl","kn","hbj"],
        value:[1,2,3,4],
        placeholder: 'Select an option',
        validation: [Validators.required]
      },
    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IX_Ray_HospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.X_Ray_HospitalList = data.resource.reduce((acc: IX_Ray_HospitalDto[], el) => {
                let obj = { id:el.id, x_RayId:el.x_RayId, x_RayName:el.x_RayName, hospitalId:el.hospitalId, hospitalName:el.hospitalName, imagePath:el.imagePath} as IX_Ray_HospitalDto;
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
      { field: 'hospitalId', header: 'hospitalId' },
      { field: 'hospitalName', header: 'hospitalName' },
      { field: 'imagePath', header: 'imagePath' },
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
