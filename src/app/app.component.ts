import { Component } from '@angular/core';
import { Contact } from './models/contatc';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contactapp';
  contacts: Contact[] = [];
  contactToAdd: Contact = new Contact;

  constructor(private contactService:ContactService){}

  ngOnInit() : void {
      this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(({data , message} : any) =>
    {
      this.contacts = data;
    });
  }

  addModalContact() {

  }

  // setContact(c:Contact) {
  //   const res = this.contactService.setContact(c);

  // }

  deleteContact(c:Contact) {
    // const res = this.contactService.delete(c);
    // debugger
    this.contactService.delete(c).subscribe(({data , message} : any) =>
    {
      this.contacts = data;
    });
    // this.getContacts();
  }

  createContactList(contacts:Contact[]) {
    this.contacts = contacts;
  }
}
