import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IBook_AmbulancesDto {//get all data table
  id: string | undefined;
  patientId: string | undefined;
  ambulanceId: string | undefined;
  status: string | undefined;
  nationalNum: string | undefined;
  ambulancePhone: string | undefined;
}

@Component({
  selector: 'app-Book_Ambulances',
  templateUrl: './Book_Ambulances.component.html',
  styleUrls: ['./Book_Ambulances.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Book_Ambulances' }], //controller name
})
export class Book_AmbulancesComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  Book_AmbulancesList: IBook_AmbulancesDto[] = []; // dto for data table
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
        label: 'Admin.Id',
        name: 'id',
        placeholder: 'Admin.Id',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'Admin.Book_Ambulances name',
        name: 'name',
        placeholder: 'Admin.Enter Book_Ambulances Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      // {
      //   type: 'input',
      //   label: 'hospital Count',
      //   name: 'hospitalCount',
      //   placeholder: 'Enter hospital Count',
      // },
      // {
      //   type: 'select',
      //   label: 'select ',
      //   name: 'option',
      //   options: ["jkkj","knl","kn","hbj"],
      //   value:[1,2,3,4],
      //   placeholder: 'Select an option',
      //   validation: [Validators.required]
      // },
    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IBook_AmbulancesDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.Book_AmbulancesList = data.resource.reduce((acc: IBook_AmbulancesDto[], el) => {
                let obj = { id: el.id, patientId: el.patientId, ambulanceId: el.ambulanceId, status: el.status, nationalNum: el.nationalNum, ambulancePhone: el.ambulancePhone} as IBook_AmbulancesDto;
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
      { field: 'id', header: 'Admin.id' },
      { field: 'patientId', header: 'Admin.patientId' },
      { field: 'ambulanceId', header: 'Admin.ambulanceId' },
      { field: 'status', header: 'Admin.status' },
      { field: 'nationalNum', header: 'Admin.national num' },
      { field: 'ambulancePhone', header: 'Admin.ambulance Phone' },
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
