import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { catchError, map, observable, Observable, of, pipe } from 'rxjs';
import { ManageContactModalComponent } from '../components/manage-contact-modal/manage-contact-modal.component';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { GetContact } from '../state/contact.actions';
import { ContactState, ContactStateModel } from '../state/contact.state';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contact>;
  @Output() contactsUpdated = new EventEmitter<Contact[]>();
  // @Input('mat-dialog-actions')dialogActions :any;
  dataSource: TableDataSource;
  contacts: Contact[] = [];
  @Select(ContactState.getContactList) contacts$: Observable<ContactStateModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'actions'];

  constructor(private contactService: ContactService, private dialog: MatDialog, private store: Store) {
    this.dataSource = new TableDataSource();
  }

  ngOnInit() {

    this.contacts$.subscribe((res: any) => {
      
      if (!Array.isArray(res)) {
        
        if(res.status) {

          this.dataSource.data = res.data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;

          } else {
            throw Error('Bad Response!')
          }
          
        }
        
      }),
      catchError(() => of([]));
      
      // this.store.selectSnapshot<GetContact>(GetContact).getContactList((data: Array<any>) => {
        //   this.table.dataSource = data;
        //   console.log(data);
        // });
      // this.table.dataSource = this.store.select(state => state.contact.contacts.data);
  }
    
    editContact(contact:Contact) {
      this.table.dataSource;
      this.dataSource
      // debugger
      const dialogRef = this.dialog.open(ManageContactModalComponent, {
        width: '250px',
        data: {contact: contact, isEditting:true},
        position:   {top: '20px'},
        role: 'dialog',
        enterAnimationDuration: '.5s',
        exitAnimationDuration: '.4s',
      });

      // dialogRef.align = center;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        
      });
    }

  deleteContact(contact:Contact) {
    this.contactService.delete(contact).subscribe((data:any)=>{debugger
      // this.contactsUpdated.emit(contacts);
    })

    // deleteContact(c:Contact) {
    //   this.contactService.delete(c).subscribe(({data , message} : any) =>
    //   {
    //     this.contacts = data;
    //   });
    // }

  }
 
}


