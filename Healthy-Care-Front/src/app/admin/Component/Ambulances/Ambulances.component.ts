import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IAmbulancesDto {//get all data table
  id: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  phone: string | undefined;
  status: string | undefined;
}

@Component({
  selector: 'app-Ambulances',
  templateUrl: './Ambulances.component.html',
  styleUrls: ['./Ambulances.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Ambulances' }], //controller name
})
export class AmbulancesComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  AmbulancesList: IAmbulancesDto[] = []; // dto for data table
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
        label: 'latitude',
        name: 'latitude',
        placeholder: 'Enter latitude',
      },
      {
        type: 'input',
        label: 'longitude',
        name: 'longitude',
        placeholder: 'Enter longitude',
      },
      {
        type: 'input',
        label: 'phone',
        name: 'phone',
        placeholder: 'Enter phone',
      },
      {
        type: 'input',
        label: 'status',
        name: 'status',
        placeholder: 'Enter status',
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
      this.globalService.GetAll<IAmbulancesDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.AmbulancesList = data.resource.reduce((acc: IAmbulancesDto[], el) => {
                let obj = { id: el.id, latitude: el.latitude, longitude: el.longitude, phone: el.phone, status: el.status} as IAmbulancesDto;
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
      { field: 'latitude', header: 'latitude' },
      { field: 'longitude', header: 'longitude' },
      { field: 'phone', header: 'phone' },
      { field: 'status', header: 'status' },
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
