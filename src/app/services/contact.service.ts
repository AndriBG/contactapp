import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: string = 'contactservice.php';

  constructor(private http: HttpClient, ) { }

  public getContacts() : Observable<Contact[]> {
      return  this.http.get<Contact[]>(`${environment.apiUrl}${this.url}`);
  }

  public setContact(contact:Contact) : Observable<Contact> {
    const httpOptions = {
      // headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=something'})
    };
    const formData1 = new FormData();
    formData1.append('nombre', contact.nombre);
    formData1.set('apellido', contact.apellido);
    formData1.set('email', contact.email);
    return this.http.post<Contact>(`${environment.apiUrl}${this.url}`, formData1, httpOptions);
  }

  public updateContact(contact:Contact) : Observable<Contact[]> {
       const httpOptions = {
      // headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=something'})
    };
    const formData1 = new FormData();
    formData1.append('id', contact.id.toString());
    formData1.append('nombre', contact.nombre);
    formData1.set('apellido', contact.apellido);
    formData1.set('email', contact.email);
    return this.http.put<Contact[]>(`${environment.apiUrl}${this.url}`, formData1, httpOptions);
  }

  delete(contact: Contact) {
    const id = typeof contact.id == 'undefined' ? 0 : contact.id;
    let url = `${environment.apiUrl}${this.url}/${id}`;debugger
    return this.http.delete<Contact[]>(url);
  }

}
// "http://localhost/apicontact/v1/capa_servicio/contactservice.php/14"