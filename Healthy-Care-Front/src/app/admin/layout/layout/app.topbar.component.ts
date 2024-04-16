import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/admin.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService ,private router: Router) { }
    ChangeLang():void{
      debugger
      if(localStorage.getItem("Lang")=="ar"){
        localStorage.setItem("Lang","en_us")
      }else{
        localStorage.setItem("Lang","ar")
      }
      window.location.reload();
    }
    Logout():void{
      localStorage.removeItem("Token")
      this.router.navigateByUrl('Authentication/Login');
    }
}
