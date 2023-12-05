import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './Pages/index/index.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SlideShowComponent } from './Components/slide-show/slide-show.component';



@NgModule({
  declarations: [
    IndexComponent,
    NavBarComponent,
    SlideShowComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ],
})
export class HomeModule { }
