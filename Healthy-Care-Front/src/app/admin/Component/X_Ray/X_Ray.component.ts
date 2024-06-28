import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IX_RayDto {//get all data table
  id: string | undefined;
  title: string | undefined;
  notes: string | undefined;
}

@Component({
  selector: 'app-X_Ray',
  templateUrl: './X_Ray.component.html',
  styleUrls: ['./X_Ray.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'X_Ray' }], //controller name
})
export class X_RayComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = []; // for me

  X_RayList: IX_RayDto[] = []; // dto for data table
  cols: any[] = []; // colims in data table
  configInput: FieldConfig[] = []; // input add update

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      },
      {
        type: 'input',
        label: 'X_Ray title',
        name: 'title',
        placeholder: 'Enter X_Ray title',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'X_Ray notes',
        name: 'notes',
        placeholder: 'Enter X_Ray notes',
        validation: [Validators.required, Validators.minLength(4)],

      },
      // {
      //   type: 'input',
      //   label: 'hospital Count',
      //   name: 'hospitalCount',
      //   placeholder: 'Enter hospital Count',
      // },
      {
        type: 'select',
        label: 'select ',
        name: 'option',
        options: ["jkkj","knl","kn","hbj"],
        value:[1,2,3,4],
        placeholder: 'Select an option',
        validation: [Validators.required]
      },
    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IX_RayDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {

              this.X_RayList = data.resource.reduce((acc: IX_RayDto[], el) => {
                let obj = { id:el.id, title:el.title, notes:el.notes} as IX_RayDto;
                acc.push(obj);
                return acc;
              }, []);
              //this.DeptList = data.resource as UserDtoClass[];
              console.log('done');
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: data.message,
              });
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: data.message,
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        }
      )
    );

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'title', header: 'title' },
      { field: 'notes', header: 'notes' },
    ];
  }
  ngOnDestroy(): void {
    if (this.SubscriptionList) {
      this.SubscriptionList.forEach((subscription) =>
        subscription.unsubscribe()
      );
      this.SubscriptionList = [];
    }
  }
}
