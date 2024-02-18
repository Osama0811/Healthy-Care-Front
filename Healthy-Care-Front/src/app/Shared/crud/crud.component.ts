import { map } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalService } from 'src/app/admin/Services/global-service.service';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';

interface ColsType {
  field?: string;
  header?: string;
};
interface WithId {
  id: string|undefined;
};
@Component({
  selector:"app-data-table",
    templateUrl: './crud.component.html',
    providers: [MessageService]
})

export class CrudComponent<T extends WithId> implements OnInit , AfterViewInit {



  @Input() ItemsList: T[] = [];
  @Input()  cols: ColsType[] = [];
  @Input()  configInput: FieldConfig[] = [];
  //@Input()  configUpdateInput: FieldConfig[] = [];

    Item: object={} ;
    AddDialog: boolean = false;
    UpdateDialog: boolean = false;

    deleteItemDialog: boolean = false;

    deleteItemsDialog: boolean = false;



    selectedItems: T[] = [];
    selectedItem: object={} ;

    selectedId: (string|undefined)[] = [];

    submitted: boolean = false;



    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    @ViewChild(DynamicFormComponent) form!: DynamicFormComponent;



    constructor(private globalService: GlobalService<T>, private messageService: MessageService) {

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

     submit(value: {[name: string]: any}) {
      //dynamic method
       console.log(value);
     }
    ngOnInit() {

this.Item=  this.ItemsList;
      console.log(this.ItemsList);
      console.log("lkmlml");
        // this.statuses = [
        //     { label: 'INSTOCK', value: 'instock' },
        //     { label: 'LOWSTOCK', value: 'lowstock' },
        //     { label: 'OUTOFSTOCK', value: 'outofstock' }
        // ];
    }

    openNew() {
      this.selectedItem={};
      this.form.form.patchValue(this.selectedItem);

        this.Item = {} as T;
        this.submitted = false;
        this.AddDialog = true;
    }

    deleteSelectedItems() {
        this.deleteItemsDialog = true;
    }

    editItem(id: string) {
      console.log(id);
      this.globalService.GetById<T>(id).subscribe((data) => {
        if(data.success){
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: data.message,
          });

        this.selectedItem  = data.resource ;
        this.form.form.patchValue(this.selectedItem);
        console.log(this.form.value);
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

        this.UpdateDialog = true;
    }

    deleteItem(Item: T) {
        this.deleteItemDialog = true;
        this.Item = { ...Item };
    }

    confirmDeleteSelected() {
        this.deleteItemsDialog = false;
        console.log(this.selectedItems);
        this.selectedId =  this.selectedItems.map(obj => obj.id);
        console.log(this.selectedId);
        this.globalService.Rangedelete<string,(string|undefined)[]>(this.selectedId).subscribe((data) => {
          if(data.success){
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: data.message,
            });
          //  this.globalService.GetAll<T,null>().subscribe((data)=>{
          //   this.ItemsList=data.resource
          //  }
          //  );
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
            // this.globalService.GetAll<T,null>().subscribe((data)=>{
            //   this.ItemsList=data.resource
            //  }
            // )
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
        this.AddDialog = false;
        this.UpdateDialog = false;
        this.submitted = false;
    }

    saveItem(Input:any) {
        this.submitted = true;
console.log(Input);
this.globalService.Add(Input).subscribe(data=>console.log(data.message));
            this.AddDialog = false;
            this.Item = {} as T;
        //}
    }
    UpdateItem(Input:any) {
      this.submitted = true;

      console.log(Input);
      //{{ this.form.value  }}
      this.globalService.update(Input).subscribe(data=>console.log(data.message));
          this.AddDialog = false;
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
      return Object.keys(obj).map((name) => ({ name }));
    }
}
