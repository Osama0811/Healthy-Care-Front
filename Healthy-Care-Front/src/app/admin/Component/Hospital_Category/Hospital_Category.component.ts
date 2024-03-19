import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
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
export class Hospital_CategoryComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  Hospital_CategoryList: IHospital_CategoryDto[] = []; // dto for data table
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
        label: 'Hospital_Category hospitalId',
        name: 'hospitalId',
        placeholder: 'Enter Hospital_Category hospitalId',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Hospital_Category categoryId',
        name: 'categoryId',
        placeholder: 'Enter Hospital_Category categoryId',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Hospital_Category hospitalName',
        name: 'hospitalName',
        placeholder: 'Enter Hospital_Category hospitalName',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Hospital_Category categoryName',
        name: 'categoryName',
        placeholder: 'Enter Hospital_Category categoryName',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'hospital Count',
        name: 'hospitalCount',
        placeholder: 'Enter hospital Count',
      },
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
