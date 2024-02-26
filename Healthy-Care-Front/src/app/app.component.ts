import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';
import { ThemeServiceService } from './admin/layout/layout/service/theme-service.service';
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
  constructor( private readonly translateService: TranslateService, private themeService: ThemeServiceService
     ,private primengConfig: PrimeNGConfig) {



    translateService.use('ar');
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.themeService.theme$.subscribe(theme => {
      this.applyTheme(theme);
  });
}
  private applyTheme(theme: string) {
    const themeLink = document.getElementById('theme-link');
    themeLink!.setAttribute('href', `assets/layout/styles/theme/${theme}/theme.css`);
  }
}
