import { Component, Input, OnInit, Type } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalService } from 'src/app/admin/Services/global-service.service';

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

export class CrudComponent<T extends WithId> implements OnInit {



  @Input() ItemsList: T[] = [];
  @Input()  cols: ColsType[] = [];
    Item: object={} ;
    ItemsDialog: boolean = false;

    deleteItemDialog: boolean = false;

    deleteItemsDialog: boolean = false;



    selectedItems: T[] = [];
    selectedId: (string|undefined)[] = [];

    submitted: boolean = false;



    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private globalService: GlobalService<T>, private messageService: MessageService) {

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
        this.Item = {} as T;
        this.submitted = false;
        this.ItemsDialog = true;
    }

    deleteSelectedItems() {
        this.deleteItemsDialog = true;
    }

    editItem(Item: T) {
      console.log(Item);
      console.log("Item");
        this.Item = { ...Item };
        this.ItemsDialog = true;
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
        this.ItemsDialog = false;
        this.submitted = false;
    }

    saveItem() {
        this.submitted = true;

        // if (this.Item.name?.trim()) {
        //     if (this.Item.id) {
        //         // @ts-ignore
        //         this.Item.inventoryStatus = this.Item.inventoryStatus.value ? this.Item.inventoryStatus.value : this.Item.inventoryStatus;
        //         this.ItemsList[this.findIndexById(this.Item.id)] = this.Item;
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Updated', life: 3000 });
        //     } else {
        //         this.Item.id = this.createId();
        //         this.Item.code = this.createId();
        //         this.Item.image = 'Item-placeholder.svg';
        //         // @ts-ignore
        //         this.Item.inventoryStatus = this.Item.inventoryStatus ? this.Item.inventoryStatus.value : 'INSTOCK';
        //         this.ItemsList.push(this.Item);
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
        //     }

        //     this.Items = [...this.Items];
            this.ItemsDialog = false;
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
