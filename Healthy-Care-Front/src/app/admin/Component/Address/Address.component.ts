import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { MenusMainDetailsService } from '../../Services/MenusMainDetails.service';
import { IMenusMainDetailsDownModel } from '../../Model/DropDown';
export interface IAddressDto {//get all data table
  id: string | undefined;
  title: string | undefined;
  countryName: string | undefined;
  cityName: string | undefined;
  areaName: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  notes: string | undefined;
}

@Component({
  selector: 'app-Address',
  templateUrl: './Address.component.html',
  styleUrls: ['./Address.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'Address' }], //controller name
})
export class AddressComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = []; // for me
  CountryDropDown: IMenusMainDetailsDownModel[] = [];
  CityDropDown: IMenusMainDetailsDownModel[] = [];
  AreaDropDown: IMenusMainDetailsDownModel[] = [];
  AddressList: IAddressDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private menusMainDetailsService:MenusMainDetailsService
  ) {}
  ngAfterViewInit(): void {
    this.GetMenusMainDetailsDDL("GetAllCountry",this.CountryDropDown);
    this.GetMenusMainDetailsDDL("GetAllCity",this.CityDropDown);
    this.GetMenusMainDetailsDDL("GetAllArea",this.AreaDropDown);

  }
  GetMenusMainDetailsDDL(Action:string,List:IMenusMainDetailsDownModel[]):IMenusMainDetailsDownModel[]{
    this.SubscriptionList.push(  this.menusMainDetailsService.MenusMainDetailsDropDown(Action).subscribe(
      (data) => {

        if (data.success) {


            // this.BloodDropDown = data.resource.reduce((acc: IBloodDropDown[], el:IBloodDropDown) => {
            //   let obj = { id: el.id, name: el.name} as IBloodDropDown;
            //   acc.push(obj);
            //   return acc;
            // }, []);

            //this.DeptList = data.resource as UserDtoClass[];
            List = data.resource.reduce((acc: IMenusMainDetailsDownModel[], el) => {
              let obj = el as IMenusMainDetailsDownModel;
              acc.push(obj);
              return acc;
            }, []);
            if(Action=="GetAllCountry"){
              this.CountryDropDown=List;
            }else if(Action=="GetAllCity"){
              this.CityDropDown=List;
            }else{
              this.AreaDropDown=List;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
            this.initConfigInput();
          
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
    return List;
  }
  initConfigInput(): void {
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
        label: 'Admin.title',
        name: 'title',
        placeholder: 'Admin.Enter title',
        validation: [Validators.required, Validators.minLength(4)],
      },
      {
        type: 'select',
        label: 'Admin.Country',
        name: 'countryId',
        options: this.CountryDropDown.map(el => el.name),
        value: this.CountryDropDown.map(el => el.id),
        placeholder: 'Admin.Chosse Country'
    },
    {
      type: 'select',
      label: 'Admin.City',
      name: 'cityId',
      options: this.CityDropDown.map(el => el.name),
      value: this.CityDropDown.map(el => el.id),
      placeholder: 'Admin.Chosse City'
  },
  {
    type: 'select',
    label: 'Admin.Area',
    name: 'areaId',
    options: this.AreaDropDown.map(el => el.name),
    value: this.AreaDropDown.map(el => el.id),
    placeholder: 'Admin.Chosse Area'
},
      {
        type: 'input',
        label: 'Admin.Latitude',
        name: 'latitude',
        placeholder: 'Admin.Enter latitude',
        textType:'number'
      },
      {
        type: 'input',
        label: 'Admin.Longitude',
        name: 'longitude',
        placeholder: 'Admin.Enter longitude',
        textType:'number'
      },
      {
        type: 'input',
        label: 'Admin.Notes',
        name: 'notes',
        placeholder: 'Admin.Enter address notes',

      },


    ];
}
  ngOnInit() {


    this.SubscriptionList.push(
      this.globalService.GetAll<IAddressDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.AddressList = data.resource.reduce((acc: IAddressDto[], el) => {
                let obj = el as IAddressDto;
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
      { field: 'title', header: 'Admin.Address title' },
      { field: 'countryName', header: 'Admin.Country' },
      { field: 'cityName', header: 'Admin.City' },
      { field: 'areaName', header: 'Admin.Area' },
      { field: 'latitude', header: 'Admin.Address latitude' },
      { field: 'longitude', header: 'Admin.Address longtude' },
      { field: 'notes', header: 'Admin.Address note' },
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
