import { GeneralResponse } from './../../../Shared/GeneralResponse';
import { Dept, IDept } from './../../../Auth/Interfaces/auth';
import { GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginRequest } from 'src/app/Auth/Interfaces/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  items: MenuItem[] | undefined;
  DeptList: GeneralResponse<Dept[]> | undefined;

  activeItem: MenuItem | undefined;

constructor(private globalService :GlobalService<any>){

}
  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' ,routerLink:"Sub1Component"},
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar',routerLink:"Sub1Component" },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' ,routerLink:"Sub1Component" },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' ,routerLink:"Sub1Component"},
      { label: 'Settings', icon: 'pi pi-fw pi-cog',routerLink:"Sub1Component" }
  ];
      this.activeItem = this.items[0];
      //let body:Dept;
      //body={Id:undefined,Name:"Testts",Description:"Testts"};
      let body={name:"Test2",hospitalCount:5}
      this.globalService.GetAll().subscribe(d=>this.DeptList=d);
      this.globalService.Add(body).subscribe(d=>console.log("Done"));
      console.log(this.DeptList);
  }
}
