import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IBloodBankDto {
  id: string | undefined;
  senderId: string | undefined;
  senderName: string | undefined;
  receiverId: string | undefined;
  receiverName: string | undefined;
  bloodtypeId: string | undefined;
  bloodtypeName: string | undefined;
  appointmentId: string | undefined;
  quantity: number | undefined;
  status: number | undefined;
  statusName: string | undefined;
}

@Component({
  selector: 'app-BloodBank',
  templateUrl: './BloodBank.component.html',
  styleUrls: ['./BloodBank.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'BloodBank' }],
})
export class BloodBankComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  BloodBankList: IBloodBankDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService
  ) {


  }
  ngOnInit() {
    this.configInput = [
      {
        type: 'input',
        label: 'Id',
        name: 'id',
        placeholder: 'Id',
        NonVisible:true
      }
      ,{
        type: 'input',
        label: 'National Number',
        name: 'nationalNumber',
        placeholder: 'National Number',
        textType:'number',
        validation: [ Validators.minLength(14)],
      },

    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IBloodBankDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newBloodBankList: IBloodBankDto[] = [];
              this.BloodBankList = data.resource.reduce((acc: IBloodBankDto[], el) => {
                let obj = el as IBloodBankDto;
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
      { field: 'senderName', header: 'Sender Name' },
      { field: 'receiverName', header: 'Receiver Name' },
      { field: 'bloodtypeName', header: 'Blood Type' },
      { field: 'statusName', header: 'Status' },


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
