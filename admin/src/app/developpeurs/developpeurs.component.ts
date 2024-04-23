import { Component } from '@angular/core';
import {  Router ,ActivatedRoute } from '@angular/router';
import { Developpeurs } from '../Entity/Developpeurs.Entity';
import { CrudService } from '../Service/crud.service';
import { NgToastService } from 'ng-angular-popup';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-developpeurs',
  templateUrl: './developpeurs.component.html',
  styleUrls: ['./developpeurs.component.css']
})
export class DeveloppeursComponent {
  
  p:number=1;
  collection:any[]
  ListDeveloppeurs:Developpeurs[];
  id: number;


  //ajouter
  DeveloppeursForm:FormGroup
  constructor(private service :CrudService,  private router: Router,private route:ActivatedRoute,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        ]),
      pswd: new FormControl('',[
        Validators.required,]),
        role: new FormControl('',[
          Validators.required,]),
          etat: new FormControl('',[
            Validators.required,]),
        

   }
     this.DeveloppeursForm = this.fb.group(formControls)
  }
   get nom() {return this.DeveloppeursForm.get('nom');}
  get prenom() { return this.DeveloppeursForm.get('prenom');}
  get email() {return this.DeveloppeursForm.get('email');}
  get pswd() {return this.DeveloppeursForm.get('pswd');}
  get role() { return this.DeveloppeursForm.get('role');}
  get etat() { return this.DeveloppeursForm.get('etat');}

   addNewDeveloppeurs() {
    let data = this.DeveloppeursForm.value;
    console.log(data);
    let developpeurs = new Developpeurs(
     undefined, data.nom,data.prenom,data.email,data.pswd,data.role,data.etat)
    console.log(developpeurs);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.role ==0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addDeveloppeurs(developpeurs).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'developpeurs est Envoyé avec succés',
        });

        this.router.navigate(['/Developpeurs']).then(()=>[window.location.reload()]);
        //parceque je peux pas acceder a la page developpeurs lorsque j'ajout un developpeurs
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )

    }
  }
  //supprimer
  DeleteDeveloppeur(developpeurs: Developpeurs){
    if(confirm("Voulez vous supprimer cet developpeurs avec l'ID " + developpeurs.id + " ?")) {
     
      this.service.onDeleteDeveloppeurs(developpeurs.id).subscribe(() => {
        this.router.navigate(['/Developpeurs']).then(() => {
          window.location.reload()
        })
      })
   
    }
  }

  //modifierDeveloppeurs
 
  ngOnInit(): void {

      
        this.service.getDeveloppeurs().subscribe(developpeurs => {
          this.ListDeveloppeurs = developpeurs
        })}

        updatedevetat(dev:Developpeurs){
          console.log(dev);
        
          let index=this.ListDeveloppeurs.indexOf(dev);
          if(dev.etat==true)
          {let newDeveloppeurs=new Developpeurs(dev.id,dev.nom,dev.prenom,dev.email,dev.pswd,dev.role,false)
        this.service.updateDeveloppeurs(newDeveloppeurs,dev.id).subscribe
        (
          res=>{console.log(res)
          this.ListDeveloppeurs[index]=newDeveloppeurs
          },
          err=>console.log(err)
        )
          }
         
          else{
        
            let newDeveloppeurs=new Developpeurs(dev.id,dev.nom,dev.prenom,dev.email,dev.pswd,dev.role,true)
            this.service.updateDeveloppeurs(newDeveloppeurs,dev.id).subscribe
          (
            res=>{console.log(res)
            this.ListDeveloppeurs[index]=newDeveloppeurs
            },
            err=>console.log(err)
          )
        
          }
        
        
        
        }

      }