import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../Entity/Contact.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  ListContact: Contact[];
 
  constructor(private service:CrudService,private router:Router ) { }


  //supprimer
  DeleteContact(contact: Contact){
    if(confirm("Voulez vous supprimer cet Contact avec l'ID " + contact.id + " ?")) {
     
      this.service.onDeleteContact(contact.id).subscribe(() => {
        this.router.navigate(['/ListContact']).then(() => {
          window.location.reload()
        })
      })
   
  }
}


  ngOnInit(): void {
    this.service.getContact().subscribe(contact => {
      this.ListContact = contact
    })
  }


}
