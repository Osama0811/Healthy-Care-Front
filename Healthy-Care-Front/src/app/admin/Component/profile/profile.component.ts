import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' ,target:"self",routerLink:"Sub1Component"},
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar',target:"self",routerLink:"Sub1Component" },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' ,target:"self",routerLink:"Sub1Component" },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' ,target:"self",routerLink:"Sub1Component"},
      { label: 'Settings', icon: 'pi pi-fw pi-cog' ,target:"self",routerLink:"Sub1Component" }
  ];
      this.activeItem = this.items[0];
  }
}
