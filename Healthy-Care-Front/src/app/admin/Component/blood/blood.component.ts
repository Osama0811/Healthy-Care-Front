import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IBloodDto {
  id: string | undefined;
  name: string | undefined;
}
export class BloodDtoClass implements IBloodDto {
  id: string | undefined;
  name: string | undefined;
}
@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Category' }],
})
export class BloodComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  BloodList: IBloodDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];
  configUpdateInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {

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
        label: 'Blood name',
        name: 'name',
        placeholder: 'Enter Blood Name',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'hospital Count',
        name: 'hospitalCount',
        placeholder: 'Enter hospital Count',
      },
      // {
      //   type: 'input',
      //   label: 'Password',
      //   name: 'Pass',
      //   placeholder: 'Enter your Pass',
      //   validation: [Validators.required, Validators.minLength(4)],
      //   // type: 'Input',
      //   // label: 'Favourite Food',
      //   // name: 'food',
      //   // options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      //   // placeholder: 'Select an option',
      //   // validation: [Validators.required]
      // },
    ];
  }
  ngOnInit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<BloodDtoClass, null>().subscribe(
        (data) => {
          console.log(data);
          let newBloodList: IBloodDto[] = [];
          data.resource.map((el) => {
            let obj = { ...newBloodList };
            console.log(obj);
          });
          if (data.success) {
            console.log('hello' + data);
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newBloodList: IBloodDto[] = [];
              this.BloodList = data.resource.reduce((acc: IBloodDto[], el) => {
                let obj = { id: el.id, name: el.name } as IBloodDto;
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
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Blood Name' },
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
