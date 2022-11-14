import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contatc';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss']
})
export class ManageContactComponent implements OnInit {
  @Input() contact?: Contact;
  @Output() contactsUpdated = new EventEmitter<Contact[]>();
  formContact: FormGroup;

  constructor(private contactService: ContactService, public fb: FormBuilder) {
    this.formContact = this.fb.group({
      name: [''],
      last_name: [],
      email: ['']
    })
   }

  ngOnInit(): void {}

  // setContact(c:Contact) {
  //   this.contactService.setContact(c)
  //   .subscribe((contacts:Contact[])=> {
  //     this.contactsUpdated.emit(contacts);
  //   });
  // }

  deleteContact(c:Contact) {
    // this.contactService.delete(c)
    // .subscribe((contacts:Contact[])=> {
    //   this.contactsUpdated.emit(contacts);
    // });
  }

  setContact(){
    // var formData: any = new FormData();
    // formData.append('name', this.formContact.get('name')?.value);
    // formData.append('last_name', this.formContact.get('apellido')?.value);
    // formData.append('email', this.formContact.get('email')?.value);
    let n = this.formContact.get('name')?.value;
    let l = this.formContact.get('last_name')?.value;
    let e = this.formContact.get('email')?.value;
    const o = new Contact();
// debugger
    o.nombre = n;
    o.apellido = l;
    o.email = e;

    this.contactService.setContact(o).subscribe((contacts:Contact[])=> {
      this.contactsUpdated.emit(contacts);
    });;
  }

}
