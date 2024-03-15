import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IDepartmentDto {//get all data table
  id: string | undefined;
  name: string | undefined;
  specialFlag: number | undefined;
  description: string | undefined;
  imagePath: string | undefined;
}

@Component({
  selector: 'app-Department',
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Department' }], //controller name
})
export class DepartmentComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  DepartmentList: IDepartmentDto[] = []; // dto for data table
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
        label: 'Department name',
        name: 'name',
        placeholder: 'Enter Department Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Department specialFlag',
        name: 'specialFlag',
        placeholder: 'Enter Department specialFlag',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Department description',
        name: 'description',
        placeholder: 'Enter Department description',
        validation: [Validators.required, Validators.minLength(4)],

      },{
        type: 'input',
        label: 'Imagebase64',
        name: 'imageBase64',
        NonVisible:true
      },
      {
        type: 'input',
        label: ' FileName',
        name: 'fileName',
        textType:'file',
        placeholder: 'Enter Image',
        //validation: [Validators.required],
      },
    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IDepartmentDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.DepartmentList = data.resource.reduce((acc: IDepartmentDto[], el) => {
                let obj = { id: el.id, name: el.name, specialFlag: el.specialFlag, description: el.description, imagePath: el.imagePath} as IDepartmentDto;
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
      { field: 'name', header: 'Name' },
      { field: 'specialFlag', header: 'SpecialFlag' },
      { field: 'description', header: 'Description' }
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
