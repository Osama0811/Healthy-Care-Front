import { GlobalService } from 'src/app/admin/Services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { Dept } from 'src/app/Auth/Interfaces/auth';

@Component({
  selector: 'app-sub1',
  templateUrl: './sub1.component.html',
  styleUrls: ['./sub1.component.css']
})
export class Sub1Component implements OnInit {

  //let body:Dept;
  //body={Id:undefined,Name:"Testts",Description:"Testts"};

  DeptList: any[] =[];
  cols: any[] = [];
constructor (private globalService :GlobalService<any>) {

}

ngOnInit() {
    this.globalService.GetAll().subscribe((data)=>
    data.resource.map(d=>this.DeptList.push(d))
    );
    console.log(this.DeptList);
    console.log("hh");
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' }
  ];

}

}
