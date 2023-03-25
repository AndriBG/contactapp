import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Contact } from './models/contact';
import { ContactService } from './services/contact.service';
import { AddContact, GetContact } from './state/contact.actions';
import { ContactState } from './state/contact.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'contactapp';
  contacts: Contact[] = [];
  test: Contact[] = [];
  contactToAdd: Contact | undefined ;

  @Select(ContactState.getContactList) contacts$: Observable<Contact[]> | undefined;

  constructor(private contactService:ContactService, private store: Store){}

  ngOnInit() : void {
    this.store.dispatch(new GetContact());
  }

  createContactList(contact:Contact) {
    this.store.dispatch(new AddContact(contact));
  }
}
