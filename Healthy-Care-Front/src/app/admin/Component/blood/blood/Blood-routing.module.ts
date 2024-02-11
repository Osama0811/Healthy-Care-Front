import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BloodComponent } from '../blood.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BloodComponent },
    ])],
    exports: [RouterModule]
})
export class BloodRoutingModule { }
