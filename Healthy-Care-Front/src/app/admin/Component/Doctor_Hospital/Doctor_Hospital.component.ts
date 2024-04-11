import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IDoctor_HospitalDto {
  id: string | undefined;
  doctorId: string | undefined;
  hospitalId: string | undefined;
  dateStart:  string | undefined;
  dateEnd:  string |undefined;

}

@Component({
  selector: 'app-Doctor_Hospital',
  templateUrl: './Doctor_Hospital.component.html',
  styleUrls: ['./Doctor_Hospital.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Doctor_Hospital' }],
})
export class Doctor_HospitalComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  Doctor_HospitalList: IDoctor_HospitalDto[] = [];
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
        label: 'Admin.Doctor Id',
        name: 'doctorId',
        placeholder: 'Admin.Enter Doctor Id',
        validation: [Validators.required],

      },
      {
        type: 'input',
        label: 'Admin.Hospital Id',
        name: 'hospitalId',
        placeholder: 'Admin.Enter Hospital Id',
        validation: [Validators.required],


      },{
        type: 'input',
        label: 'Admin.Date Start',
        name: 'dateStart',
        placeholder: 'Admin.Enter Date Start',
        validation: [Validators.required],


      },{
        type: 'input',
        label: 'Admin.Date End',
        name: 'dateEnd',
        placeholder: 'Admin.Enter Date End',


      },



    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IDoctor_HospitalDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newDoctor_HospitalList: IDoctor_HospitalDto[] = [];
              this.Doctor_HospitalList = data.resource.reduce((acc: IDoctor_HospitalDto[], el) => {
                let obj = el as IDoctor_HospitalDto;
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
      { field: 'doctorName', header: 'Admin.Doctor Name' },
      { field: 'hospitalName', header: 'Admin.Hospital Name' },
      { field: 'dateStart', header: 'Admin.Date Start' },
      { field: 'dateEnd', header: 'Admin.Date End' },



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
