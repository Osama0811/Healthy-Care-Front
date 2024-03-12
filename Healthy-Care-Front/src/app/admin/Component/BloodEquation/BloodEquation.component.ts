import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IBloodEquationDto {//get all data table
  id: string | undefined;
  bloodFK1: string | undefined;
  fK1Name: string | undefined;
  bloodFK2: string | undefined;
  fK2Name: string | undefined;
  eqution: string | undefined;
}

@Component({
  selector: 'app-BloodEquation',
  templateUrl: './BloodEquation.component.html',
  styleUrls: ['./BloodEquation.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'BloodEquation' }], //controller name
})
export class BloodEquationComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  BloodEquationList: IBloodEquationDto[] = []; // dto for data table
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
        label: 'BloodEquation bloodFK1',
        name: 'bloodFK1',
        placeholder: 'Enter BloodEquation bloodFK1',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'BloodEquation fK1Name',
        name: 'fK1Name',
        placeholder: 'Enter BloodEquation fK1Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'BloodEquation bloodFK2',
        name: 'bloodFK2',
        placeholder: 'Enter BloodEquation bloodFK2',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'BloodEquation fK2Name',
        name: 'fK2Name',
        placeholder: 'Enter BloodEquation fK2Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'BloodEquation eqution',
        name: 'eqution',
        placeholder: 'Enter BloodEquation eqution',
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
      this.globalService.GetAll<IBloodEquationDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.BloodEquationList = data.resource.reduce((acc: IBloodEquationDto[], el) => {
                let obj = { id: el.id, bloodFK1: el.bloodFK1, fK1Name: el.fK1Name, bloodFK2: el.bloodFK2, fK2Name: el.fK2Name, eqution: el.eqution} as IBloodEquationDto;
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
      { field: 'bloodFK1', header: 'bloodFK1' },
      { field: 'fK1Name', header: 'fK1Name' },
      { field: 'bloodFK2', header: 'bloodFK2' },
      { field: 'fK2Name', header: 'fK2Name' },
      { field: 'eqution', header: 'eqution' },
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
