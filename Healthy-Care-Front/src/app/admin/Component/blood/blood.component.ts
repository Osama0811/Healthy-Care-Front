import { Component, OnDestroy, OnInit } from '@angular/core';
import { Controller, GlobalService } from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
export interface IBloodDto{
  id: string | undefined;
  name: string | undefined;
  hospitalCount: number | undefined;
}
export class BloodDtoClass implements IBloodDto{
  id: string | undefined;
  name: string | undefined;
  hospitalCount: number | undefined;
}
@Component({
  selector: 'app-blood',
  templateUrl: './blood.component.html',
  styleUrls: ['./blood.component.css'],
providers:[ GlobalService, { provide: Controller, useValue: 'Category' }]
})
export class BloodComponent  implements OnInit ,OnDestroy {


  SubscriptionList:Subscription[]=[];

 BloodList: IBloodDto[] = [];
  cols: any[] = [];
  constructor( private globalService: GlobalService<any>,
    private messageService: MessageService){

  }
  ngOnInit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
   this.SubscriptionList.push( this.globalService.GetAll<BloodDtoClass,null>().subscribe(
      (data) => {
        console.log(data);
        let newBloodList:IBloodDto[]=[];
             data.resource.map(el=>{
              let obj ={...newBloodList}
              console.log(obj);
            });
        if (data.success) {

          console.log("hello"+data);
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {



            //this.DeptList = data.resource as UserDtoClass[];
console.log("done");
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
    ));

  this.cols = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Blood Name' },
    { field: 'hospitalCount', header: 'Hospital Count' }
  ];
}
ngOnDestroy(): void {
  if (this.SubscriptionList) {
    this.SubscriptionList.forEach(subscription => subscription.unsubscribe());
    this.SubscriptionList = [];
  }
}
}
