import { Component } from '@angular/core';
import { Fichier } from '../Entity/Fichier.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent {
  totalFicher:number=0;
  constructor(
    private service:CrudService,
  ) { 
    
  }

  ngOnInit(): void {
    this.service.getFichier().subscribe(fichier =>{
      this.totalFicher=fichier.length})
             
  }

}
