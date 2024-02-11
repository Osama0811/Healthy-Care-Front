import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
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
  styleUrls: ['./blood.component.css']
})
export class BloodComponent  implements OnInit  {

  // items: MenuItem[] | undefined;
  // //BloodList: GeneralResponse<Dept[]> | undefined;

  // activeItem: MenuItem | undefined;

 BloodList: IBloodDto[] = [];
  cols: any[] = [];
  constructor( private globalService: GlobalService<any>,
    private messageService: MessageService){

  }
  ngOnInit() {

    this.globalService.GetAll<BloodDtoClass,null>().subscribe(
      (data) => {
        if (data.success) {
          console.log("hello"+data);
          if (data.resourceCount == 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'No Data found',
            });
          } else {
            this.BloodList = data.resource.map(({ id, name ,hospitalCount}) => ({ id, name ,hospitalCount}));

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
    );

  this.cols = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Blood Name' },
    { field: 'hospitalCount', header: 'Hospital Count' }
  ];
}
}
