import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageContactModalComponent } from '../components/manage-contact-modal/manage-contact-modal.component';
import { Event } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  animal: string='';
  name: string='';
  contacts: Observable<Contact[]>;
  c: Contact = new Contact();

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private store: Store) {
    this.contacts = this.store.select(state => state.contact.contacts.data);
  }

  openDialog(): void {  

    const dialogRef = this.dialog.open(ManageContactModalComponent, {
      width: '250px',
      data: {contact: this.c, isEditting:false},
      position: {top: '20px'},
      role: 'dialog',
      enterAnimationDuration: '.3s',
      exitAnimationDuration: '.1s',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }

  // updateContactList(contacts: Contact[]) {debugger
  //   this.contacts = contacts;
  // }

  childContacts(event: any) {
debugger
  }

}
