
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
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
export class Book_AmbulancesComponent implements OnInit, OnDestroy  {
  SubscriptionList: Subscription[] = []; // for me

  Book_AmbulancesList: IBook_AmbulancesDto[] = []; // dto for data table

  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService

  ) {}

//   ngOnInit(){
//     this.configInput = [
//       {
//         type: 'input',
//         label: 'x_RayId',
//         name: 'x_RayId',
//         placeholder: 'Enter x_Ray Id',
//         NonVisible:true
//       },
//       {
//         type: 'input',
//         label: 'hospital Id',
//         name: 'hospitalId',
//         placeholder: 'Enter hospital Id',
//         // validation: [Validators.required, Validators.minLength(4)],

//       },
//       {
//         type: 'input',
//         label: 'date',
//         name: 'date',
//         placeholder: 'Enter The date',
//         validation: [Validators.required, Validators.minLength(4)],

//       },
//       // {
//       //   type: 'input',
//       //   label: 'Book_Ambulances specialFlag',
//       //   name: 'specialFlag',
//       //   placeholder: 'Enter Book_Ambulances specialFlag',
//       //   validation: [Validators.required, Validators.minLength(4)],
//       // },
//     //   {
//     //     type: 'select',
//     //     label: 'specialFlag',
//     //     name: 'specialFlag',
//     //     options: this.Book_AmbulancesTypeDropDown.map(el => el.key),
//     //     value: this.Book_AmbulancesTypeDropDown.map(el => el.value),
//     //     placeholder: 'Enter  special Flag',
//     //     validation: [Validators.required],
//     // },
//     //   {
//     //     type: 'input',
//     //     label: 'Book_Ambulances description',
//     //     name: 'description',
//     //     placeholder: 'Enter Book_Ambulances description',
//     //     validation: [Validators.required, Validators.minLength(4)],
//     //   },{
//     //     type: 'input',
//     //     label: 'Imagebase64',
//     //     name: 'imageBase64',
//     //     NonVisible:true
//     //   },
//     //   {
//     //     type: 'input',
//     //     label: ' FileName',
//     //     name: 'fileName',
//     //     textType:'file',
//     //     placeholder: 'Enter Image',
//     //     //validation: [Validators.required],
//     //   },
//     ]
// }
ngOnInit() {


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
              let obj = el as IBook_AmbulancesDto;
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
    { field: 'patientId', header: 'patient Id' },
    { field: 'ambulanceId', header: 'ambulance Id' },
    { field: 'status', header: 'status' },
    { field: 'nationalNum', header: 'National number' },
    { field: 'ambulancePhone', header: 'ambulance Phone' },

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
