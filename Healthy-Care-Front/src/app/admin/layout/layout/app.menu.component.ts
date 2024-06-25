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
            label: 'System Setting',
            icon: 'pi pi-spin pi-spinner',
            items: [

                {
                    label: 'Users',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                          label: 'User', icon: 'pi pi-circle-fill', routerLink: ['/admin/User']
                        },
                        {
                          label: 'Patient', icon: 'pi pi-circle-fill', routerLink: ['/admin/Patient']
                        },
                        { label: 'Doctor', icon: 'pi pi-circle-fill', routerLink: ['/admin/Doctor'] },
                    ]
                },

              {
                label: 'Blood Setting',
                icon: 'pi pi-spin pi-spinner',
                items: [
                  { label: 'Blood1', icon: 'pi pi-circle-fill', routerLink: ['/admin/Blood'] },
                    { label: 'BloodEquation', icon: 'pi pi-circle-fill', routerLink: ['/admin/BloodEquation'] },
                    { label: 'BloodBank', icon: 'pi pi-circle-fill', routerLink: ['/admin/BloodBank'] },
                ]
            },
            { label: 'Address', icon: 'pi pi-flag', routerLink: ['/admin/Address'] }
            ]
        },
        {
          label: 'Hospital Setting',
          icon: 'pi pi-spin pi-spinner',
          items: [



              {
                label: 'Hospital Setting',
                icon: 'pi pi-fw pi-home',
                items: [
                    {

                       label: 'Hospital', icon: 'pi pi-circle-fill', routerLink: ['/admin/Hospital']
                    },
                    { label: 'Category', icon: 'pi pi-circle-fill', routerLink: ['/admin/Category'] },
                    { label: 'Department', icon: 'pi pi-circle-fill', routerLink: ['/admin/Department'] },
                    { label: 'Doctor_Hospital', icon: 'pi pi-circle-fill', routerLink: ['/admin/Doctor_Hospital'] },
                    { label: 'Department_Hospital', icon: 'pi pi-circle-fill', routerLink: ['/admin/Department_Hospital'] },
                    { label: 'Doctor_Department', icon: 'pi pi-circle-fill', routerLink: ['/admin/Doctor_Department'] },
                ]
            }
          ]
      }
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
            // {
            //     label: 'Users',
            //     items: [
            //         { label: 'Profile', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Profile'] },
            //         { label: 'Index', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/Index'] },

            //         //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

            //         //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            //     ]
            // },





    ,{
      label: 'Tools',
      items: [
          { label: 'Tools', icon: 'pi pi-spin pi-cog', routerLink: ['/admin/Tools'] },
          { label: 'Tools_Department', icon: 'pi pi-wrench', routerLink: ['/admin/Tools_Department'] },
          { label: 'Tools_Hospital', icon: 'pi pi-list', routerLink: ['/admin/Tools_Hospital'] },

      ]
  },


            {
              label: 'History',
              items: [
                  { label: 'Question History', icon: 'pi pi-question-circle', routerLink: ['/admin/QuestionHistory'] },
                  { label: 'History', icon: 'pi pi-hourglass', routerLink: ['/admin/History'] }
                  //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                  //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

              ]
          },








    //     {
    //     label: 'Appointment',
    //     items: [
    //         { label: 'Appointment', icon: 'pi pi-clock', routerLink: ['/admin/Appointment'] }

    //         //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

    //         //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  
  {
    label: 'Hospital',
    items: [
        { label: 'Hospital', icon: 'pi pi-home', routerLink: ['/admin/Hospital'] }

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
},
{
    label: 'X-Ray',
    items: [
        { label: 'Booking x-ray', icon: 'pi pi-book', routerLink: ['/admin/Booking_X_Ray'] }

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
},{
  label: 'Book Ambulances',
  items: [
      { label: 'Booking Ambulances', icon: 'pi pi-truck', routerLink: ['/admin/Book_Ambulances'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},
    //     ]
    // },





        ];
    }
}
