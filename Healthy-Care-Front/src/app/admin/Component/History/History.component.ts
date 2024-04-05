import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IHistoryDto {//get all data table
  id: string | undefined;
  titleAr: string | undefined;
  titleEn: string | undefined;
  title: string | undefined;
  descriptionAr: string | undefined;
  descriptionEn: string | undefined;
  description: string | undefined;
  patientId: string | undefined;
  patientName: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  doctorId: string | undefined;
  doctorName: string | undefined;
  departmentId: string | undefined;
  departmentName: string | undefined;
  date: string | undefined;

}

@Component({
  selector: 'app-History',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'History' }], //controller name
})
export class HistoryComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  HistoryList: IHistoryDto[] = []; // dto for data table
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
        label: 'History title Ar',
        name: 'titleAr',
        placeholder: 'Enter History title in  Arabic',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'hospital titleEn',
        name: 'titleEn',
        placeholder: 'Enter hospital title in English',
      },
      {
        type: 'input',
        label: 'hospital description Ar',
        name: 'descriptionAr',
        placeholder: 'Enter hospital description in Arabic',
      },
      {
        type: 'input',
        label: 'hospital description En',
        name: 'descriptionEn',
        placeholder: 'Enter hospital description in English',
      },
      {
        type: 'input',
        label: 'hospital patient Id',
        name: 'patientId',
        placeholder: 'Enter hospital patient Id',
      },
      {
        type: 'input',
        label: 'hospital hospital Id',
        name: 'hospitalId',
        placeholder: 'Enter hospital hospital Id',
      },
      {
        type: 'input',
        label: 'hospital department Id',
        name: 'departmentId',
        placeholder: 'Enter hospital department Id',
      },
      {
        type: 'input',
        label: 'hospital date',
        name: 'date',
        placeholder: 'Enter hospital date',
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
      this.globalService.GetAll<IHistoryDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.HistoryList = data.resource.reduce((acc: IHistoryDto[], el) => {
                let obj = el as IHistoryDto;
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
      { field: 'id', header: 'History Id' },
      { field: 'title', header: 'History title' },

      { field: 'description', header: 'History description' },

      { field: 'patientId', header: 'History patient Id' },

      { field: 'patientName', header: 'History patient name' },

      { field: 'hospitalId', header: 'History hospital Id' },
      { field: 'hospitalName', header: 'History hospital name' },

      { field: 'doctorId', header: 'History doctor Id' },

      { field: 'doctorName', header: 'History doctor name' },

      { field: 'departmentId', header: 'History department Id' },

      { field: 'departmentName', header: 'History department name' },
      { field: 'date', header: 'History date' },



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
