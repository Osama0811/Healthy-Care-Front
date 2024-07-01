import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { GlobalService } from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { MenusMainDetailsService } from '../../Services/MenusMainDetails.service';
export interface ICountryDto {//get all data table
  id: string | undefined;
  name: string | undefined;
  hospitalCount: number | undefined;
}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  CategoryList: ICountryDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private MenusMainDetailsService: MenusMainDetailsService,
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
        label: 'Admin.Category name',
        name: 'name',
        placeholder: 'Admin.Enter Category Name',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'Admin.hospital Count',
        name: 'hospitalCount',
        placeholder: 'Admin.Enter hospital Count',
        textType:'number',
      },

    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    // this.SubscriptionList.push(
    //   this.globalService.GetAll<ICategoryDto, null>().subscribe(
    //     (data) => {

    //       if (data.success) {
    //         if (data.resourceCount == 0) {
    //           this.messageService.add({
    //             severity: 'success',
    //             summary: 'Success',
    //             detail: 'No Data found',
    //           });
    //         } else {

    //           this.CategoryList = data.resource.reduce((acc: ICategoryDto[], el) => {
    //             let obj = el as ICategoryDto;
    //             acc.push(obj);
    //             return acc;
    //           }, []);
    //           //this.DeptList = data.resource as UserDtoClass[];
    //           console.log('done');
    //           this.messageService.add({
    //             severity: 'success',
    //             summary: 'Success',
    //             detail: data.message,
    //           });
    //         }
    //       } else {
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error',
    //           detail: data.message,
    //         });
    //       }
    //     },
    //     (error) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: error.message,
    //       });
    //     }
    //   )
    // );

    this.cols = [
      { field: 'name', header: 'Admin.Category Name' },
      { field: 'hospitalCount', header: 'Admin.hospital Count' },

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

