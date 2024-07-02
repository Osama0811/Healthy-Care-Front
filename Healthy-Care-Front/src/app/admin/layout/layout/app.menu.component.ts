import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/admin.layout.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  modellist: any[] = [];

    constructor(public layoutService: LayoutService,private readonly translateService: TranslateService){
      translateService.use(localStorage.getItem("Lang")??"en_us"); }

    ngOnInit() {
      debugger
        this.modellist = [
          {
            label: 'Admin.SystemSetting',
            icon: 'pi pi-spin pi-spinner',
            items: [

                {
                    label: 'Admin.Users',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                          label: 'Admin.Users', icon: 'pi pi-circle-fill', routerLink: ['/admin/User']
                        },
                        {
                          label: 'Admin.Patient', icon: 'pi pi-circle-fill', routerLink: ['/admin/Patient']
                        },
                    ]
                },

              {
                label: 'Admin.BloodSetting',
                icon: 'pi pi-spin pi-spinner',
                items: [
                    { label: 'Admin.blood', icon: 'pi pi-circle-fill', routerLink: ['/admin/Blood'] },
                    { label: 'Admin.BloodEquation', icon: 'pi pi-circle-fill', routerLink: ['/admin/BloodEquation'] },
                    { label: 'Admin.BloodBank', icon: 'pi pi-circle-fill', routerLink: ['/admin/BloodBank'] },
                ]
            },
            { label: 'Admin.Address', icon: 'pi pi-flag', routerLink: ['/admin/Address'] }
            ]
        },
        {
          label: 'Admin.HospitalSetting',
          icon: 'pi pi-spin pi-spinner',
          items: [



              {
                label: 'Admin.HospitalSetting',
                icon: 'pi pi-fw pi-home',
                items: [
                    {

                       label: 'Admin.Hospital', icon: 'pi pi-circle-fill', routerLink: ['/admin/Hospital']
                    },
                    { label: 'Admin.Category', icon: 'pi pi-circle-fill', routerLink: ['/admin/Category'] },
                    { label: 'Admin.Department', icon: 'pi pi-circle-fill', routerLink: ['/admin/Department'] },
                    { label: 'Admin.Department_Hospital', icon: 'pi pi-circle-fill', routerLink: ['/admin/Department_Hospital'] },
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





  //   ,{
  //     label: 'Tools',
  //     items: [
  //         { label: 'Tools', icon: 'pi pi-spin pi-cog', routerLink: ['/admin/Tools'] },
  //         { label: 'Tools_Department', icon: 'pi pi-wrench', routerLink: ['/admin/Tools_Department'] },
  //         { label: 'Tools_Hospital', icon: 'pi pi-list', routerLink: ['/admin/Tools_Hospital'] },

  //     ]
  // }
  ,


            {
              label: 'Admin.History',
              items: [
                  { label: 'Admin.Question History', icon: 'pi pi-question-circle', routerLink: ['/admin/QuestionHistory'] },
                  { label: 'Admin.History', icon: 'pi pi-hourglass', routerLink: ['/admin/History'] }
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
    label: 'Admin.X-Ray',
    items: [
        { label: 'Admin.Booking x-ray', icon: 'pi pi-book', routerLink: ['/admin/Booking_X_Ray'] }

        //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

        //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

    ]
},
    //     ]
    // },


{
  label: 'Admin.Ambulances',
  items: [
      { label: 'Admin.Ambulances', icon: 'pi pi-car', routerLink: ['/admin/Ambulances'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},
{
  label: 'Admin.Book_Ambulances',
  items: [
      { label: 'Admin.Book_Ambulances', icon: 'pi pi-car', routerLink: ['/admin/Book_Ambulances'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},
{
  label: 'Admin.X_Ray',
  items: [
      { label: 'Admin.X_Ray', icon: 'pi pi-exclamation-triangle', routerLink: ['/admin/X_Ray'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},
{
  label: 'Admin.X_Ray_Department',
  items: [
      { label: 'Admin.X_Ray_Department', icon: 'pi pi-bars', routerLink: ['/admin/X_Ray_Department'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},
{
  label: 'Admin.X_Ray_Hospital',
  items: [
      { label: 'Admin.X_Ray_Hospital', icon: 'pi pi-home', routerLink: ['/admin/X_Ray_Hospital'] }

      //{ label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },

      //{ label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },

  ]
},



        ];
    }
}
