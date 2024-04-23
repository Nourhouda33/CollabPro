import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Entity/Admin.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent {
  role:String
  ListAdmin: Admin[];
 
  constructor(private service:CrudService,private router:Router ) { }


  //supprimer
  Deleteadmin(admin: Admin){
    if(confirm("Voulez vous supprimer cet admin avec l'ID " + admin.id + " ?")) {
     
      this.service.onDeleteAdmin(admin.id).subscribe(() => {
        this.router.navigate(['/ListAdmin']).then(() => {
          window.location.reload()
        })
      })
   
  }
}


  ngOnInit(): void {
    this.role=localStorage.getItem("role")as string;
    this.service.getAdmin().subscribe(admin => {
      this.ListAdmin = admin
    })
  }


}
