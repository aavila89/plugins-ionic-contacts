import { Component, OnInit } from '@angular/core';
import {
  ContactPayload,
    Contacts,
    PermissionStatus,
    PhoneType
  } from '@capacitor-community/contacts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  contacts: ContactPayload[] = [];
  img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAw1JREFUWEeNV1uW2jAMldLfAkPCgoaVJaxs6H5I6KH97KAe2XIsxbIhP8w4th73XkkOwpvPx/3++U008nYE+ORfArgi0S/++zEMU80Uxr3Og2xLTK5byu37eZ4AcQyuw+OYo+flMZxUENlOPYBsUQzHrfYAwn6ZawmYWDrE8+/j8WpT9W2mgymlKhE5+9dcMSV/h/5MfrgVElxmMg67ZflKnPshZLw4gD99f/YQMGvpCBYUlC4Oy0Lkkqj0oN4/hh6tRFoKSAEU2sqH9suiANXG1N86gL63tDr+t1ZcdJISOQCF2MvkHtsAjLz9mtuoPsUTE4kIVEBwRBEDKJXvYcdrK1w1pgwFVS3kADUCZnvFQQigBjGv/6xVAefJ2CjDugpeSy8GbRCwPY7bJLkBVI0TXVot2W/GmnIqmy3PgCfRV9GxnQW/E2a3MSXutPGX08dCHE56TEMnA2ibxSq3MAvSQGoToG3Ymq1g9LEoFJRm9Hat/kpZqe1Zda8DkGPHOI4jFZsUfgCe7zyEgl0/+xombwaQj+eyjGuG90apZc3bSeUGUNhRCzGAdIyg1vlKpBBAj0kpY7Ek/9k6DDa4CnjTv81tKMWkb0Vd113tfSA1i7IFq+IrcWOn7NAq/01l87bv54XrK96QBHKuN0Eg3DGA4HE6TaYMWe3fQGOY/01/a/FtLmd23bsfsHNEHINWn3RZNbC+8ErRaVbepScrIxvRGiluVyQBxBfd+P7USwNP9Cil54GWAtjPN/EhwUnbRl3fqYzDkHHaxjq4FJ8twPgdB3CY54nCrdo6D/YKWBrNZA1ADG8bUnlbAciZS0qc+WmYVm3u7wshyXCotFkvy4Jb+TjJNCAc5pvKnKtAz4uYTm5EDoF6SXfvNMk4i5Bh140ho8QrAOxu8wRdgt1znntDg0Zx22ixO/PVRIBElwB2hfNNQbUQsF5bbcGronX/eknxLbizIHJDMtg2KLh2UKjASIWj9nzx0004fgY6j5ZS7cu2PGZq/c3rmfo4KsdkbYQG1xVOYp9vf67r0P8DI4mxCTczOUYAAAAASUVORK5CYII=';
  constructor() {}

  async ngOnInit() {
    const permissionState: PermissionStatus = await Contacts.requestPermissions();
    if (permissionState.contacts === 'granted') {
        console.log('Permission granted!!');
        await this.getContacts();
    }
  }
  async getContacts(event?: any) {
      const {contacts} = await Contacts.getContacts({projection: {
        name: true,
        phones: true,
        image: true
      }});

      this.contacts = contacts;
      // this.contacts = contacts.filter((i) => {
      //   if (i.name?.given) 
      //      return i.name?.given.indexOf('Contact') !== -1;
      //   else
      //      return;
      // });
      
      if (event)  event.target.complete();
  }

  async addContacts() {
   const {contactId} = await Contacts.createContact({contact:{
      name: {given: 'New Contact'},
      phones: [{
        type: PhoneType.Mobile,
        number: '(098) 777-6544'
      }]
    }});

    console.log({contactId});
    if (contactId) await this.getContacts();
  }

  async deleteContacts(contactId: string) {
    await Contacts.deleteContact({contactId});
    await this.getContacts();
  }
}
