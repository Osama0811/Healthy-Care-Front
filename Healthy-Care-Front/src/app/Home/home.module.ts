import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './Pages/index/index.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SlideShowComponent } from './Components/slide-show/slide-show.component';
import { WhoWeAreComponent } from './Components/who-we-are/who-we-are.component';
import { HelpingComponent } from './Components/helping/helping.component';
import { HealthyComponent } from './Components/healthy/healthy.component';
import { FooterComponent } from './Components/footer/footer.component';



@NgModule({
  declarations: [
    IndexComponent,
    NavBarComponent,
    SlideShowComponent,
    WhoWeAreComponent,
    HelpingComponent,
    HealthyComponent,
    FooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ],
})
export class HomeModule { }
