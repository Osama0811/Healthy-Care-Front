import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/admin.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Users',
                items: [
                    { label: 'Profile', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Profile'] },
                    { label: 'Index', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Index'] },

                    //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                    //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

                ]
            },
            {
              label: 'Blood',
              items: [
                  { label: 'Blood1', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Blood'] },
                  { label: 'Blood2', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Blood2'] },

                  //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                  //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

              ]
          },

            {
                label: 'Blood',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Blood',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Blood1',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Blood2',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Blood3',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },

                ]
            },
            {
              label: 'History',
              items: [
                  { label: 'History', icon: 'pi pi-question-circle', routerLink: ['/admin/QuestionHistory'] }

                  //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                  //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

              ]
          },
          {
            label: 'Blood Equation',
            items: [
                { label: 'BloodEquation', icon: 'pi pi-arrow-right-arrow-left', routerLink: ['/admin/BloodEquation'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },
        {
            label: 'Department',
            items: [
                { label: 'Department', icon: 'pi pi-search', routerLink: ['/admin/Department'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },
        {
            label: 'Department Hospital',
            items: [
                { label: 'Department_Hospital', icon: 'pi pi-search', routerLink: ['/admin/Department_Hospital'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },
        {
            label: 'Hospital Category',
            items: [
                { label: 'Hospital_Category', icon: 'pi pi-search', routerLink: ['/admin/Hospital_Category'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },


        ];
    }
}
