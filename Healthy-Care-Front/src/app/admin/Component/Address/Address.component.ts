import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IAddressDto {//get all data table
  id: string | undefined;
  title: string | undefined;
  countryId: string | undefined;
  countryName: string | undefined;
  cityId: string | undefined;
  cityName: string | undefined;
  areaId: string | undefined;
  areaName: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  notes: string | undefined;
}

@Component({
  selector: 'app-Address',
  templateUrl: './Address.component.html',
  styleUrls: ['./Address.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Address' }], //controller name
})
export class AddressComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  AddressList: IAddressDto[] = []; // dto for data table
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
        label: 'Add title',
        name: 'title',
        placeholder: 'Enter address title',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add country Id',
        name: 'countryId',
        placeholder: 'Enter address country Id',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add city Id',
        name: 'cityId',
        placeholder: 'Enter address city Id',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add area Id',
        name: 'areaId',
        placeholder: 'Enter address area Id',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add latitude',
        name: 'latitude',
        placeholder: 'Enter address latitude',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add longitude',
        name: 'longitude',
        placeholder: 'Enter address longitude',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'input',
        label: 'Add notes',
        name: 'notes',
        placeholder: 'Enter address notes',
        validation: [Validators.required, Validators.minLength(4)],
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
      this.globalService.GetAll<IAddressDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.AddressList = data.resource.reduce((acc: IAddressDto[], el) => {
                let obj = el as IAddressDto;
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
      { field: 'title', header: 'Address title' },
      { field: 'countryId', header: 'Address country-id' },
      { field: 'cityId', header: 'Address city-id' },
      { field: 'areaId', header: 'Address area-id' },
      { field: 'latitude', header: 'Address latitude' },
      { field: 'longitude', header: 'Address longtude' },
      { field: 'notes', header: 'Address note' },
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
