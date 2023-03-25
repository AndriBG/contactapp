import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss']
})
export class ManageContactComponent implements OnInit {
  @Input() contact?: Contact;
  @Output() contactsUpdated = new EventEmitter<Contact[]>();
  // formContact: FormGroup;

  constructor(private route: ActivatedRoute) {
   // First get the product id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = Number(routeParams.get('productId'));

  // Find the product that correspond with the id provided in route.
  // this.product = products.find(product => product.id === productIdFromRoute);
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

//   setContact(){
//     // var formData: any = new FormData();
//     // formData.append('name', this.formContact.get('name')?.value);
//     // formData.append('last_name', this.formContact.get('apellido')?.value);
//     // formData.append('email', this.formContact.get('email')?.value);
//     let n = this.formContact.get('name')?.value;
//     let l = this.formContact.get('last_name')?.value;
//     let e = this.formContact.get('email')?.value;
//     const o = new Contact();
// // debugger
//     o.nombre = n;
//     o.apellido = l;
//     o.email = e;

//     this.contactService.setContact(o).subscribe((contacts:Contact[])=> {
//       this.contactsUpdated.emit(contacts);
//     });;
//   }

}
