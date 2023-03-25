import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { AddContact, /**ContactAction ,**/ GetContact, UpdateContact } from './contact.actions';

export class ContactStateModel {
  // public items: string[] = [];
  public name: string;
  public contacts: Contact[];
  public selectedContact: Contact;
}

@State<ContactStateModel>({
  name: 'contact',
  defaults: {
    name: ContactState.STATE_NAME,
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
  static STATE_NAME = 'ContactState';

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
      tap((contact:any) => {
        const state: any = getState();
        patchState({
          contacts: [...state.contacts.data, contact.contact],
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
  updateContact({getState, patchState}: StateContext<ContactStateModel>, { payload }: UpdateContact) : void {
    const state = getState();
    
    // patchState({selectedContact: payload});
  }


// @Action(LoadMainState)
// async loadMainState(ctx: StateContext<ContactStateModel>) {
//   const _activeState = await this.getActiveState(store);
//   ctx.patchState({ mainState: _activeState });
// }
}
