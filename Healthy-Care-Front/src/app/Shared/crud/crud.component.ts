import { map } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalService } from 'src/app/admin/Services/global-service.service';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface ColsType {
  field: string;
  header: string;
};
interface WithId {
  id: string|undefined;
};
interface FormControls {
  [key: string]: AbstractControl;
}
@Component({
  selector:"app-data-table",
    templateUrl: './crud.component.html',
    providers: [MessageService],
    styleUrls: ['./crud.component.css']
})

export class CrudComponent<T extends WithId> implements OnInit , AfterViewInit {



  @Input() ItemsList: T[] = [];
  @Input()  cols: ColsType[] = [];
  @Input()  AddFlag: boolean = true;
  @Input()  EditFlag: boolean = true;
  @Input()  DeletedFlag: boolean = true;
  @Input()  configInput: FieldConfig[] = [];
  //@Input()  configUpdateInput: FieldConfig[] = [];



    Item: object={} ;
    isDialogVisible: boolean = false;
    IsAdd: boolean = false;
    IsUpdate: boolean = false;

    deleteItemDialog: boolean = false;

    deleteItemsDialog: boolean = false;



    selectedItems: T[] = [];
    selectedItem: object={} ;

    selectedId: (string|undefined)[] = [];

    submitted: boolean = false;



    statuses: any[] = [];

    rowsPerPageOptions = [10, 15, 30];

    @ViewChild(DynamicFormComponent) form!: DynamicFormComponent;



    constructor(private globalService: GlobalService<T>, private messageService: MessageService,private readonly translateService: TranslateService) {
      translateService.use(localStorage.getItem("Lang")??"en_us");
     }

     ngAfterViewInit() {
       let previousValid = this.form.valid;
       this.form.changes.subscribe(() => {
         if (this.form.valid !== previousValid) {
           previousValid = this.form.valid;
           this.form.setDisabled('submit', !previousValid);
         }
       });

       this.form.setDisabled('submit', true);
     }



    ngOnInit() {

this.Item=  this.ItemsList;

        // this.statuses = [
        //     { label: 'INSTOCK', value: 'instock' },
        //     { label: 'LOWSTOCK', value: 'lowstock' },
        //     { label: 'OUTOFSTOCK', value: 'outofstock' }
        // ];
    }

   patchFormValuesToNull(form: FormGroup<FormControls>): void {
    Object.keys(form.controls).forEach((key) => {
        const control = form.get(key);
        if (control) {
            control.patchValue(null);
        }
    });
}
    openNew() {
      this.selectedItem={};
      this.patchFormValuesToNull(this.form.form);
console.log(this.form.form.value);
        this.Item = {} as T;
        this.submitted = false;
        this.isDialogVisible = true;
        this.IsAdd=true;
    }

    deleteSelectedItems() {
        this.deleteItemsDialog = true;
    }

    editItem(id: string) {
      this.globalService.GetById<T>(id).subscribe((data) => {
        if(data.success){


        this.selectedItem  = data.resource ;
        console.log(data.resource);
        console.log(this.form.form);
        this.form.form.patchValue(this.selectedItem);
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.message,
          });
        }
      },
      (error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
      ()=>{
        this.selectedItem =  this.selectedItem;
        this.form.form.patchValue(this.selectedItem);

      }
      );

        this.isDialogVisible = true;
        this.IsUpdate = true;
    }

    deleteItem(Item: T) {
        this.deleteItemDialog = true;
        this.Item = { ...Item };
    }

    confirmDeleteSelected() {
        this.deleteItemsDialog = false;
        this.selectedId =  this.selectedItems.map(obj => obj.id);
        this.globalService.Rangedelete<string,(string|undefined)[]>(this.selectedId).subscribe((data) => {
          if(data.success){
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
            this.globalService.GetAll<T, null>().subscribe(
              (data) => {

                if (data.success) {
                  if (data.resourceCount == 0) {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'No Data found',
                    });
                  } else {
                    this.ItemsList = data.resource.reduce((acc: T[], el) => {
                      let obj = el as T;
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
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: data.message,
            });
          }
        },
        (error)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        }
        );
        this.selectedItems = [];
    }

    confirmDelete() {
        this.deleteItemDialog = false;
        const id = (this.Item as any)?.id;
        this.globalService.delete<string>(id).subscribe((data) => {
          if(data.success){
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
            this.globalService.GetAll<T, null>().subscribe(
              (data) => {

                if (data.success) {

                    this.ItemsList = data.resource.reduce((acc: T[], el) => {
                      let obj = el as T;
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
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: data.message,
            });
          }
        },
        (error)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        }
        );
        this.Item = {} as T;
    }

    hideDialog() {
        this.isDialogVisible = false;
        this.isDialogVisible = false;
        this.IsAdd = false;
        this.IsUpdate = false;

        this.submitted = false;
    }

    saveItem(Input:any) {
        this.submitted = true;
this.globalService.Add(Input).subscribe((data) => {
  if(data.success){
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: data.message,
    });
    this.globalService.GetAll<T, null>().subscribe(
      (data) => {

        if (data.success) {

            this.ItemsList = data.resource.reduce((acc: T[], el) => {
              let obj = el as T;
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
  }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: data.message,
    });
  }
},
(error)=>{
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: error.message,
  });
}
);

            this.isDialogVisible = false;
            this.IsAdd = false;
            this.Item = {} as T;
        //}
    }
    UpdateItem(Input:any) {
      this.submitted = true;

      this.globalService.update(Input).subscribe((data) => {
        if(data.success){
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: data.message,
          });
          this.globalService.GetAll<T, null>().subscribe(
            (data) => {

              if (data.success) {

                  this.ItemsList = data.resource.reduce((acc: T[], el) => {
                    let obj = el as T;
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
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.message,
          });
        }
      },
      (error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
      );

      this.isDialogVisible = false;
      this.IsUpdate = false;
          this.Item = {} as T;
      //}
  }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.Items.length; i++) {
    //         if (this.Items[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    getObjectProperties(obj: any): any[] {
      return Object.keys(obj).map((name) => ({ name: name }));
    }
}
