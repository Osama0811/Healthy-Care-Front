import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface ITools_HospitalDto {
  id: string | undefined;
  toolsId: string | undefined;
  hospitalId: string | undefined;
  quantity:number | undefined;

}

@Component({
  selector: 'app-Tools_Hospital',
  templateUrl: './Tools_Hospital.component.html',
  styleUrls: ['./Tools_Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Tools_Hospital' }],
})
export class Tools_HospitalComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  Tools_HospitalList: ITools_HospitalDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {


  }
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
        label: 'Tools Id',
        name: 'toolsId',
        placeholder: 'Enter Tools Id ',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Hospital Id',
        name: 'hospitalId',
        placeholder: 'Enter Hospital Id ',

      },
      {
        type: 'input',
        label: 'Quantity',
        name: 'quantity',
        placeholder: 'Enter Quantity ',

      },



    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<ITools_HospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newTools_HospitalList: ITools_HospitalDto[] = [];
              this.Tools_HospitalList = data.resource.reduce((acc: ITools_HospitalDto[], el) => {
                let obj = el as ITools_HospitalDto;
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
      { field: 'toolsName', header: 'Tools Name' },
      { field: 'hospitalName', header: 'Department Name' },
      { field: 'quantity', header: 'Quantity' },



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
