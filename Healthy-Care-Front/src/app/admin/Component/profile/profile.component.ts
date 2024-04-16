import { Subscription } from 'rxjs';
import { GeneralResponse } from './../../../Shared/GeneralResponse';
import { Dept, IDept } from './../../../Auth/Interfaces/auth';
import { Controller, GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginRequest } from 'src/app/Auth/Interfaces/auth';
import { TranslateService } from '@ngx-translate/core';
import { MenusMainDetailsService } from '../../Services/MenusMainDetails.service';
export interface IUserDto{
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}
export class UserDtoClass implements IUserDto{
  id: string | undefined;
  userName: string | undefined;
  password: string | undefined;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ GlobalService, { provide: Controller, useValue: 'Address' }]
})
export class ProfileComponent  implements OnInit,OnDestroy  {
  items: MenuItem[] | undefined;
  //DeptList: GeneralResponse<Dept[]> | undefined;
 SubscriptionList:Subscription[]=[];
  activeItem: MenuItem | undefined;

  DeptList: UserDtoClass[] = [];
  cols: any[] = [];
constructor( private globalService: GlobalService<any>,
  private messageService: MessageService,private readonly translateService: TranslateService,
  public MenusMainDetailsService:MenusMainDetailsService){
    translateService.use(localStorage.getItem("Lang")??"en_us");
}

  ngOnInit() {
    this.items = [
      { label: 'Country', icon: 'pi pi-fw pi-home' ,routerLink:"Sub1"},
      { label: 'City', icon: 'pi pi-fw pi-calendar',routerLink:"Sub1" },
      { label: 'Area', icon: 'pi pi-fw pi-pencil' ,routerLink:"Sub1" },
      //{ label: 'Address', icon: 'pi pi-fw pi-file' ,routerLink:"Sub1"},
  ];
      this.activeItem = this.items[0];


  }
  sendTabDataToChild(tabLabel: string) {

    this.MenusMainDetailsService.sendTabData(tabLabel);
  }
  ngOnDestroy(): void {
    if (this.SubscriptionList) {
      this.SubscriptionList.forEach(subscription => subscription.unsubscribe());
      this.SubscriptionList = [];
    }
  }
}
