import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Healthy-Care-Front';
  /**
   *
   */
  constructor( private readonly translateService: TranslateService,private primengConfig: PrimeNGConfig) {


    translateService.use('ar');
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
}
}
