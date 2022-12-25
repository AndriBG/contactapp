import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

import { Contact } from '../models/contact.interface';
import { ContactService } from '../services/contact.service';
import { AddContact, /**ContactAction ,**/ GetContact, UpdateContact } from './contact.actions';

export class ContactStateModel {
  // public items: string[] = [];
  public contacts: Contact[];
  public selectedContact: Contact;
}

const defaults = {
  items: []
};

@State<ContactStateModel>({
  name: 'contact',
  defaults: {
    contacts: [],
    selectedContact: null,
  }
})
@Injectable()
export class ContactState {
  // @Action(ContactAction) // Metodo Action que esta asosiado al ContactAction, entonces cuando ContactAction es cambiado en el state, se dispara una accion y se ejecuta el metodo add.
  // add({ getState, setState }: StateContext<ContactStateModel>, { payload }: ContactAction) {
  //   const state = getState();
  //   setState({ items: [ ...state.items, payload ] });
  // }

  constructor(private readonly contactSvc : ContactService) {

  }

  @Selector()
  public static getContactList({ contacts }: ContactStateModel) : Contact[] {
    return contacts;
  }

  @Selector()
  public static getSelectedContact({ selectedContact }) : Contact {
    return selectedContact;
  }

  @Action(AddContact)
  addContact({ getState, patchState }: StateContext<ContactStateModel>, { payload }: AddContact) : Observable<any>{
    // const state = getState();
    return this.contactSvc.setContact(payload).pipe(
      tap((contact:Contact) => {
        const state = getState();
        patchState({
          contacts: [...state.contacts, contact],
        });
      })
    );
    // setState({ items: [ ...state.items, payload ] });
  }

  @Action(GetContact)
  getContact({getState, setState}: StateContext<ContactStateModel>) : Observable<Contact[]> {
    return this.contactSvc.getContacts().pipe(
      tap((contacts:Contact[]) => {
        const state = getState();
        setState({...state, contacts});
      })
    );
  }

  @Action(UpdateContact)
  updateContact({getState, setState}: StateContext<ContactStateModel>, { payload }: UpdateContact) : void {
    const state = getState();
  }

}
