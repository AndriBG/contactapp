import { Contact } from '../models/contact';

// cada una de estas acciones se despacha cuando ocurre un evento (click,enter,etc) en la app.

export class AddContact {
  static readonly type = '[Contacts] Add';
  constructor(public payload: Contact) {}
}

export class GetContact {
  static readonly type = '[Contacts] Get';
}

export class UpdateContact {
  static readonly type = '[Contacts] Update';
  constructor(public payload: Contact) {}
}

export class DeleteContact {
  static readonly type = '[Contacts] Delete';
  constructor(public id: Contact) {}
}

// export class ContactAction {
//   static readonly type = '[Contact] Add item'; // es una propiedad unica y sirve para agregar un nuevo item.
//   constructor(public payload: string) { }
// }
