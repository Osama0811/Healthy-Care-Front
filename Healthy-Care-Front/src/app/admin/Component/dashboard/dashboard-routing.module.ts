import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { IndexComponent } from '../index/index.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
