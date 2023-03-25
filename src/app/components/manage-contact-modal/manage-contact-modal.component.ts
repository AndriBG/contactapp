import { Component, ElementRef, Inject, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { EventEmitter } from '@angular/core';
import { AddContact } from 'src/app/state/contact.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-manage-contact-modal',
  templateUrl: './manage-contact-modal.component.html',
  styleUrls: ['./manage-contact-modal.component.scss']
})
export class ManageContactModalComponent implements OnInit {

  @ViewChild('dialogPopup', { read: TemplateRef }) dialogPopup!: TemplateRef<any>;
  @Output() contactsUpdated = new EventEmitter<Contact[]>(true);
  private id: number;  
  formContact: FormGroup;
  selectedAlign: AlignType;
  isEditting: boolean = false;
  c: Contact = new Contact();

  constructor(public dialogRef: MatDialogRef<ManageContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private contactService: ContactService, public fb: FormBuilder, private modal: MatDialog, private store: Store) {
      this.isEditting = data['isEditting'];
      this.id = data.contact.id;
      // this.emitter = new EventEmitter(true);      
      // this.selectedAlign = data.position as AlignType;
      this.selectedAlign = 'center';
      if(!this.isEditting) {

        this.formContact = this.fb.group({
          name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
          last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
          email: ['', Validators.email],
          // tel: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])]
        });
      } else {

        this.formContact = this.fb.group({
          id: [data.contact.id],
          name: [data.contact.nombre, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
          last_name: [data.contact.apellido, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
          email: [data.contact.email, Validators.email],
          // tel: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])]
        });
      }
    }

  ngOnInit(): void {}

  setContact(){

    if(this.formContact.valid) {

      this.c.id = this.id;
      this.c.nombre = this.formContact.value.name;
      this.c.apellido = this.formContact.value.last_name;
      this.c.email = this.formContact.value.email;

      const c = {
        id: this.id,
        nombre: this.formContact.value.name,
        apellido: this.formContact.value.last_name,
        email: this.formContact.value.email
      }

      const contact = Object.create(c) as Contact;
      console.log(contact)

      this.store.dispatch(new AddContact(this.c));
      this.modal.closeAll();
      // this.contactService.setContact(this.c).subscribe((data:any)=> {
      //   // const { message:string, contact_id:number, contacts: Array<object> } = data;
      //   // const contacts = data.contacts as Contact[];
      //   // EventEmitter
      //   this.contactsUpdated.emit(data.contacts);

      //   if (this.dialogPopup != undefined) {
      //     this.modal.open(this.dialogPopup, {
      //      data: {message:data.message},
      //      exitAnimationDuration: '1.5s',
      //      role: 'alertdialog'
      //    });
      //    setTimeout(()=>this.modal.closeAll(), 2000);
      //   }
      // });
    }
  }

  
  updateContact(){
debugger
    if(this.formContact.valid) {

      this.c.nombre = this.formContact.value.name;
      this.c.apellido = this.formContact.value.last_name;
      this.c.email = this.formContact.value.email;
      this.c.id = this.formContact.value.id;

      this.contactService.updateContact(this.c).pipe().subscribe((data:any)=> {
        this.contactsUpdated.emit(data.contacts);
      });
    }
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export declare type AlignType = 'start' | 'center' | 'end';