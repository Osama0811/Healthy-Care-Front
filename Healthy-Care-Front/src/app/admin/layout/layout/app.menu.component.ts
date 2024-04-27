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
            label: 'BloodBank',
            items: [
                { label: 'BloodBank', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/BloodBank'] },

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },{
          label: 'Category',
          items: [
              { label: 'Category', icon: 'pi pi-list', routerLink: ['/admin/Category'] },

              //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

              //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

          ]
      }
      ,{
        label: 'Doctor',
        items: [
            { label: 'Doctor', icon: 'pi pi-list', routerLink: ['/admin/Doctor'] },

            //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

            //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

        ]
    }
    ,{
      label: 'Doctor_Department',
      items: [
          { label: 'Doctor_Department', icon: 'pi pi-list', routerLink: ['/admin/Doctor_Department'] },

          //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

          //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

      ]
  }
  ,{
    label: 'Doctor_Hospital',
    items: [
        { label: 'Doctor_Hospital', icon: 'pi pi-list', routerLink: ['/admin/Doctor_Hospital'] },

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
}
    ,{
      label: 'Tools',
      items: [
          { label: 'Tools', icon: 'pi pi-list', routerLink: ['/admin/Tools'] },

          //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

          //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

      ]
  }
  ,{
    label: 'Tools_Department',
    items: [
        { label: 'Tools_Department', icon: 'pi pi-list', routerLink: ['/admin/Tools_Department'] },

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
},{
  label: 'Tools_Hospital',
  items: [
      { label: 'Tools_Hospital', icon: 'pi pi-list', routerLink: ['/admin/Tools_Hospital'] },

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
            label: 'Categories',
            items: [
                { label: 'category', icon: 'pi pi-copy', routerLink: ['/admin/Category'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },
        {
          label: 'Patients',
          items: [
              { label: 'Patient', icon: 'pi pi-user-plus', routerLink: ['/admin/Patient'] }

              //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

              //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

          ]
      },
      {
        label: 'Address',
        items: [
            { label: 'Address', icon: 'pi pi-flag', routerLink: ['/admin/Address'] }

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
            label: 'User',
            items: [
                { label: 'User', icon: 'pi pi-user', routerLink: ['/admin/User'] }

                //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

                //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

            ]
        },
        {
        label: 'Appointment',
        items: [
            { label: 'Appointment', icon: 'pi pi-clock', routerLink: ['/admin/Appointment'] }

            //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

            //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

        ]
    },
    {
      label: 'Historys',
      items: [
          { label: 'History', icon: 'pi pi-hourglass', routerLink: ['/admin/History'] }

          //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

          //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

      ]
  },
  {
    label: 'Hospital',
    items: [
        { label: 'Hospital', icon: 'pi pi-home', routerLink: ['/admin/Hospital'] }

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
},
{
  label: 'Ambulances',
  items: [
      { label: 'Ambulances', icon: 'pi pi-car', routerLink: ['/admin/Ambulances'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},



        ];
    }
}
