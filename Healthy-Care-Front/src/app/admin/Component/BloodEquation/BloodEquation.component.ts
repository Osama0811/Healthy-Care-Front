import { map } from 'rxjs/operators';
import { BloodService } from './../../Services/blood.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
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
  //bloodFK1: string | undefined;
  fK1Name: string | undefined;
  //bloodFK2: string | undefined;
  fK2Name: string | undefined;
  eqution: string | undefined;
}
export interface IBloodDropDown {//get all data table
  id: string | undefined;
  name: string | undefined;
}
@Component({
  selector: 'app-BloodEquation',
  templateUrl: './BloodEquation.component.html',
  styleUrls: ['./BloodEquation.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'BloodEquation' }], //controller name
})
export class BloodEquationComponent implements OnInit, OnDestroy,AfterViewInit  {
  SubscriptionList: Subscription[] = []; // for me

  BloodEquationList: IBloodEquationDto[] = []; // dto for data table
  BloodDropDown: IBloodDropDown[] = []; // dto for DropDown
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private bloodService:BloodService
  ) {


  }
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.bloodService.BloodDropDown().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              // this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el:IBloodDropDown) => {
              //   let obj = { id: el.id, name: el.name} as IBloodDropDown;
              //   acc.push(obj);
              //   return acc;
              // }, []);

              //this.DeptList = data.resource as UserDtoClass[];
              this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el) => {
                let obj = el as IBloodDropDown;
                acc.push(obj);
                return acc;
              }, []);
              console.log(this.BloodDropDown);
              console.log('done');
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: data.message,
              });
              this.initConfigInput();
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

  }
  initConfigInput(): void {
    this.configInput = [
        {
            type: 'input',
            label: 'Id',
            name: 'id',
            placeholder: 'Id',
            NonVisible: true
        },
        {
            type: 'select',
            label: 'blood 1',
            name: 'bloodFK1',
            options: this.BloodDropDown.map(el => el.name),
            value: this.BloodDropDown.map(el => el.id),
            placeholder: 'Enter  bloodFK1',
            validation: [Validators.required],
        },
        {
            type: 'select',
            label: 'Blood 2',
            name: 'bloodFK2',
            options: this.BloodDropDown.map(el => el.name),
            value: this.BloodDropDown.map(el => el.id),
            placeholder: 'Enter  blood2',
            validation: [Validators.required],
        },
        {
            type: 'input',
            label: 'Percentage',
            name: 'percentage',
            textType: 'number',
            placeholder: 'Enter Percentage',
            validation: [Validators.required],
        },
    ];
}
  ngOnInit() {
    console.log(this.BloodDropDown);
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      },
      {
        type: 'select',
        label: 'blood 1',
        name: 'bloodFK1',
        options: this.BloodDropDown.map(el=>el.name),
        value:this.BloodDropDown.map(el=>el.id),
        placeholder: 'Enter  bloodFK1',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'select',
        label: 'Blood 2',
        name: 'bloodFK2',
        options: this.BloodDropDown.map(el=>el.name),
        value:this.BloodDropDown.map(el=>el.id),
        placeholder: 'Enter  blood2',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Percentage',
        name: 'percentage',
        textType:'number',
        placeholder: 'Enter Percentage',
        validation: [Validators.required, Validators.minLength(4)],

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
                let obj = { id: el.id, fK1Name: el.fK1Name, fK2Name: el.fK2Name, eqution: el.eqution} as IBloodEquationDto;
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
      { field: 'fK1Name', header: 'fK1Name' },
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
