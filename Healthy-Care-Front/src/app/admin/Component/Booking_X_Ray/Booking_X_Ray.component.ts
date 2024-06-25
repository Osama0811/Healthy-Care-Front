import { hospitalService } from './../../Services/hospital.service';
import { BookingService } from './../../Services/Booking.service';
import { EnumService } from '../../Services/enum.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import { IhospitalDownModel, hospitalDropDown, Booking_X_RayDropDown, IBooking_X_RayDownModel } from './../../Model/DropDown';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IBoooking_X_RayDto {//get all data table
  id: string | undefined;
  x_RayId: string | undefined;
  x_RayName: string | undefined;
  Booking_X_RayId: string | undefined;
  Booking_X_RayNationalNum: string | undefined;
  date: string | undefined;

  hospitalId: string | undefined;

  hospitalName: string | undefined;

  code: number | undefined;

  status: number | undefined;

}

@Component({
  selector: 'app-Booking_X_Ray',
  templateUrl: './Booking_X_Ray.component.html',
  styleUrls: ['./Booking_X_Ray.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Booking_X_Ray' }], //controller name
})
export class Booking_X_RayComponent implements OnInit, OnDestroy ,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me

  Booking_X_RayList: IBoooking_X_RayDto[] = []; // dto for data table
  hospitalDropDown: IhospitalDownModel[] = [];
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private BookingService:BookingService,
    private hospitalService:hospitalService
  ) {}
  ngAfterViewInit(): void {
    this.SubscriptionList.push(
      this.hospitalService.hospitalDropDown().subscribe(
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
              this.hospitalDropDown = data.resource.reduce((acc: IhospitalDownModel[], el) => {
                let obj = el as IhospitalDownModel;
                acc.push(obj);
                return acc;
              }, []);
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
        label: 'x_RayId',
        name: 'x_RayId',
        placeholder: 'Enter x_Ray Id',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'hospital Id',
        name: 'hospitalId',
        options: this.hospitalDropDown.map(el => el.name),
        value: this.hospitalDropDown.map(el => el.id),
        placeholder: 'Enter hospital Id',
        // validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'date',
        name: 'date',
        placeholder: 'Enter The date',
        validation: [Validators.required, Validators.minLength(4)],

      },
      // {
      //   type: 'input',
      //   label: 'Booking_X_Ray specialFlag',
      //   name: 'specialFlag',
      //   placeholder: 'Enter Booking_X_Ray specialFlag',
      //   validation: [Validators.required, Validators.minLength(4)],
      // },
    //   {
    //     type: 'select',
    //     label: 'specialFlag',
    //     name: 'specialFlag',
    //     options: this.Booking_X_RayTypeDropDown.map(el => el.key),
    //     value: this.Booking_X_RayTypeDropDown.map(el => el.value),
    //     placeholder: 'Enter  special Flag',
    //     validation: [Validators.required],
    // },
    //   {
    //     type: 'input',
    //     label: 'Booking_X_Ray description',
    //     name: 'description',
    //     placeholder: 'Enter Booking_X_Ray description',
    //     validation: [Validators.required, Validators.minLength(4)],
    //   },{
    //     type: 'input',
    //     label: 'Imagebase64',
    //     name: 'imageBase64',
    //     NonVisible:true
    //   },
    //   {
    //     type: 'input',
    //     label: ' FileName',
    //     name: 'fileName',
    //     textType:'file',
    //     placeholder: 'Enter Image',
    //     //validation: [Validators.required],
    //   },
    ]
}
ngOnInit() {


  this.SubscriptionList.push(
    this.globalService.GetAll<IBoooking_X_RayDto, null>().subscribe(
      (data) => {

        if (data.success) {
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {

            this.Booking_X_RayList = data.resource.reduce((acc: IBoooking_X_RayDto[], el) => {
              let obj = el as IBoooking_X_RayDto;
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
   // { field: 'id', header: 'ID' },
    { field: 'userName', header: ' Name of User' },
    { field: 'birthDate', header: 'Birth date' },
    { field: 'age', header: 'Age' },
    { field: 'nationalNum', header: 'National number' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'alterPhone', header: 'Alter Phone' },
    { field: 'bloodType', header: 'Blood Type' },
    { field: 'hospitalName', header: 'Hospital' },

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
