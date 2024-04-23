import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { Contact } from '../Entity/Contact.Entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  TotalContact=0
  totalProjet=0

  userDetails:any
  ListContact: Contact[];
    constructor(private router:Router,private service:CrudService)
     { this.userDetails = this.service.userDetails();}
     

  ngOnInit(): void {
    this.service.getContact().subscribe(contact => {
      this.ListContact = contact
    })
    this.service.getProjet().subscribe(dev=>{
      this.totalProjet=dev.length
    })
  }
  

  
  logout(){
    console.log("logout");
    localStorage.clear()
   
    this.router.navigate(['/login']);
   
    
  }

  

}
