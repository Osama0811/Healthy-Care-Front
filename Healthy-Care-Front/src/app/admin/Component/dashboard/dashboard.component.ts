import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {



    subscription!: Subscription;

    constructor() {}

}
