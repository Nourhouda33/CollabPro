import { Component } from '@angular/core';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  totalAdmins:number=0;
  totalProjet:number=0;
  totalTache : number=0;
  totalContact: number=0;
  totalDeveloppeurs: number=0;
 
  constructor(
    private service:CrudService,
  ) { 
    
  }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(admin =>{
      this.totalAdmins=admin.length})
      this.service.getProjet().subscribe(projet =>{
        this.totalProjet=projet.length})
        
      this.service.getTache().subscribe(tache =>{
        this.totalTache=tache.length})
        this.service.getContact().subscribe(contact =>{
          this.totalContact=contact.length})

          this.service.getDeveloppeurs().subscribe(dev =>{
            this.totalDeveloppeurs=dev.length})
             
  }

}
