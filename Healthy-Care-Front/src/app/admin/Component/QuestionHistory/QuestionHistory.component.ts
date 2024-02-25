import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
export interface IQuestionHistoryDto {
  id: string | undefined;
  titleAr: string | undefined;
  titleEn: string | undefined;
  title: string | undefined;
  questionAr: string | undefined;
  questionEn: string | undefined;
  question: string | undefined;
  ageGroup: number | undefined;
  ageGroupTitle: string | undefined;
}

@Component({
  selector: 'app-QuestionHistory',
  templateUrl: './QuestionHistory.component.html',
  styleUrls: ['./QuestionHistory.component.css'],
  providers: [GlobalService, { provide: Controller, useValue: 'QuestionHistory' }],
})
export class QuestionHistoryComponent implements OnInit, OnDestroy {
  SubscriptionList: Subscription[] = [];

  QuestionHistoryList: IQuestionHistoryDto[] = [];
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
      },
      {
        type: 'input',
        label: ' titleAr',
        name: 'titleAr',
        textType:"text",
        placeholder: 'Enter title in arabic',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: ' titleEn',
        name: 'titleEn',
        textType:"text",
        placeholder: 'Enter title in english',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: ' questionAr',
        name: 'questionAr',
        textType:"text",
        placeholder: 'Enter title question in arabic',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: ' questionEn',
        name: 'questionEn',
        textType:"text",
        placeholder: 'Enter title question in English',
        validation: [Validators.required, Validators.minLength(4)],

      },
      {
        type: 'input',
        label: 'age Group',
        name: 'ageGroup',
        textType:"number",
        placeholder: 'Enter age Group'
      },

    ];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'No Data found',
    });
    this.SubscriptionList.push(
      this.globalService.GetAll<IQuestionHistoryDto, null>().subscribe(
        (data) => {

          if (data.success) {
            if (data.resourceCount == 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'No Data found',
              });
            } else {
              let newQuestionHistoryList: IQuestionHistoryDto[] = [];
              this.QuestionHistoryList = data.resource.reduce((acc: IQuestionHistoryDto[], el) => {
                let obj = el as IQuestionHistoryDto;
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
      { field: 'title', header: ' Title' },
      { field: 'question', header: ' Question' },
      { field: 'ageGroupTitle', header: ' Age Group Title' },


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
