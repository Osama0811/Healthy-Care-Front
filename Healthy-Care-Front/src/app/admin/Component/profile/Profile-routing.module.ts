import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { IndexComponent } from '../index/index.component';
import { Sub1Component } from './Sub-Comp/sub1/sub1.component';

@NgModule({
    imports: [RouterModule.forChild( [{
      path: '', component: ProfileComponent,
      children: [
        { path: 'Sub1', loadChildren: () => import('./Sub-Comp/sub1/Sub1.module').then(m => m.Sub1Module) },
      ]

  }
])],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }
