import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import {
  Controller,
  GlobalService,
} from '../../Services/global-service.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/Shared/dynamic-form/models/field-config.interface';
import { EnumService } from '../../Services/enum.service';
import { IEnumDropDown } from '../../Model/DropDown';
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
export class QuestionHistoryComponent implements OnInit, OnDestroy,AfterViewInit {
  SubscriptionList: Subscription[] = [];
  AgeGroupDropDown: IEnumDropDown[] = [];

  QuestionHistoryList: IQuestionHistoryDto[] = [];
  cols: any[] = [];
  configInput: FieldConfig[] = [];

  constructor(
    private globalService: GlobalService<any>,
    private messageService: MessageService,
    private enumService:EnumService
  ) {
 }
 ngAfterViewInit(): void { //This Will return my drop data from service
  this.SubscriptionList.push(
    this.enumService.GetEnumDropDown("GetAgeGroup").subscribe(
      (data) => {

        this.AgeGroupDropDown = data.reduce((acc: IEnumDropDown[], el) => {
          let obj = el as IEnumDropDown;
          acc.push(obj);
          return acc;
        }, []);
        this.initConfigInput();
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

}
initConfigInput(): void {
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
      label: 'Admin.TitleAr',
      name: 'titleAr',
      placeholder: 'Admin.EnterTitleAr',
      validation: [Validators.required, Validators.minLength(4)],

    },
    {
      type: 'input',
      label: 'Admin.titleEn',
      name: 'titleEn',
      placeholder: 'Admin.Enter title in english',
      validation: [Validators.required, Validators.minLength(4)],

    },
    {
      type: 'input',
      label: 'Admin.questionAr',
      name: 'questionAr',
      placeholder: 'Admin.Enter title question in arabic',
      validation: [Validators.required, Validators.minLength(4)],

    },
    {
      type: 'input',
      label: 'Admin.questionEn',
      name: 'questionEn',
      placeholder: 'Admin.Enter title question in English',
      validation: [Validators.required, Validators.minLength(4)],

    },
    // {
    //   type: 'input',
    //   label: 'age Group',
    //   name: 'ageGroup',
    //   placeholder: 'Enter age Group'
    // },
    {
      type: 'select',
      label: 'Admin.age Group',
      name: 'ageGroup',
      options: this.AgeGroupDropDown.map(el => el.key),
      value: this.AgeGroupDropDown.map(el => el.value),
      placeholder: 'Admin.Enter  special Flag',
  },
  ];
}
  ngOnInit() {
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
      { field: 'title', header: 'Admin.Title' },
      { field: 'question', header: 'Admin.Question' },
      { field: 'ageGroupTitle', header: 'Admin.Age Group Title' },


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
