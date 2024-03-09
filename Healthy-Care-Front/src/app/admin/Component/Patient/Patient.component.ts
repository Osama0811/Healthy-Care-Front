import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EmailValidator, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IPatientDto {//get all data table
  id: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  birthDate: string | undefined;
  age: number | undefined;
  nationalNum: string | undefined;
  email: EmailValidator | undefined;
  phone: number | undefined;
  alterPhone: number | undefined;
  bloodId: string | undefined;
  bloodType: string | undefined;
  hospitalId: string | undefined;
  hospitalName: string | undefined;
  joinedDate: Date | undefined;

}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Patient' }], //controller name
})
export class PatientComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  PatientList: IPatientDto[] = []; // dto for data table
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
        label: 'Patient name',
        name: 'name',
        placeholder: 'Enter Patient Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'hospital Count',
        name: 'hospitalCount',
        placeholder: 'Enter hospital Count',
      },
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
      this.globalService.GetAll<IPatientDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.PatientList = data.resource.reduce((acc: IPatientDto[], el) => {
                let obj = el as IPatientDto;
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
      { field: 'id', header: 'Patient ID' },
      { field: 'userId', header: 'Patient Id of User' },
      { field: 'userName', header: 'Patient Name of User' },
      { field: 'birthDate', header: 'Patient Birth date' },
      { field: 'age', header: 'Patient Age' },
      { field: 'nationalNum', header: 'Patient National number' },
      { field: 'email', header: 'Patient Email' },
      { field: 'phone', header: 'Patient Phone' },
      { field: 'alterPhone', header: 'Patient Alter Phone' },
      { field: 'bloodId', header: 'Patient Blood Id' },
      { field: 'bloodType', header: 'Patient Blood Type' },
      { field: 'hospitalId', header: 'Patient Hospital Id' },
      { field: 'hospitalName', header: 'Patient Hospital Name' },
      { field: 'joinedDate', header: 'the date of join' },

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
