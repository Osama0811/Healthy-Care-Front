import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../admin/Services/patient.service';
import { IHistoryInfo, IPatientHistoryInfo, PatientHistoryInfo } from '../admin/Model/DropDown';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/Service/auth.service';
import { HistoryService } from '../admin/Services/history.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent  implements OnInit,OnDestroy {
  SubscriptionList: Subscription[] = []; // for me
  isAuthenticated:boolean = this.authService.isLoggedIn();
  userId: string = '';
 userInfo:PatientHistoryInfo|any;
 tabs:IHistoryInfo[]|undefined;
  constructor(private route: ActivatedRoute,
    private router: Router,private patientservice: PatientService,private authService:AuthService,private historyService :HistoryService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    debugger
    this.userId = this.route.snapshot.paramMap.get('PatientId') || '';

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('PatientId') || '';
    });
    this.SubscriptionList.push(
      this.patientservice.GetUserInfo(this.userId).subscribe(
        (data) => {
          if (data.success) {
              this.userInfo = data.resource;
            }
          } 
        
      )
    );

    if(this.isAuthenticated){
      this.SubscriptionList.push(
        this.historyService.GetUserHistory(this.userId).subscribe(
          (data) => {
            if (data.success) {
              this.tabs = data.resource.reduce((acc: IHistoryInfo[], el) => {
                let obj = el as IHistoryInfo;
                acc.push(obj);
                return acc;
              }, []);
              }
            } 
          
        )
      );
    }
  }
  

ngOnDestroy(): void {
  if (this.SubscriptionList) {
    this.SubscriptionList.forEach((subscription) =>
      subscription.unsubscribe()
    );
    this.SubscriptionList = [];
  }
}
Login():void{
  localStorage.removeItem("Token")
  this.router.navigateByUrl('Authentication/Login/'+this.userId);
}
}
