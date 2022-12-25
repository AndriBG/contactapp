import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ManageContactModalComponent } from '../components/manage-contact-modal/manage-contact-modal.component';
import { Contact } from '../models/contact.interface';
import { ContactService } from '../services/contact.service';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contact>;
  @Output() contactsUpdated = new EventEmitter<Contact[]>();
  // @Input('mat-dialog-actions')dialogActions :any;
  dataSource: TableDataSource;
  contacts: Contact[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'actions'];

  constructor(private contactService: ContactService, private dialog: MatDialog) {
    this.dataSource = new TableDataSource();
  }
  
  ngAfterViewInit(): void {
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.contactService.getContacts().subscribe(({data , message} : any) => {
      this.table.dataSource = data;
      });
  }

  // getContacts() {
  //   this.contactService.getContacts().subscribe(({data , message} : any) =>
  //   {
  //     this.contacts = data;
  //   });
  // }
  
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
 
  
  // openDialog(c): void {
  //   const dialogRef = this.dialog.open(, {
  //     width: '250px',
  //     position:   {top: '20px'},
  //     role: 'alertdialog',
  //     enterAnimationDuration: '.5s',
  //     exitAnimationDuration: '.4s',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed',result);
      
  //   });
  // }
  
}


