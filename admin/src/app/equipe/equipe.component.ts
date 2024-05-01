import { Component } from '@angular/core';
import { Equipe } from '../Entity/Equipe.Entity';
import { CrudService } from '../Service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SaveDeveloppeurEquipe } from '../Entity/SaveDeveloppeurEquipe.Entity';
import { Developpeurs } from '../Entity/Developpeurs.Entity';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent {

  userFile:any
  message:any
  imagePath:any
  imgURL:any
  id: number;

  role:String
  ListEquipe: Equipe[];
  EquipeForm:FormGroup;
  ListDeveloppeurs:Developpeurs[]
 
  constructor(private service :CrudService,  private router: Router,private route:ActivatedRoute,private fb:FormBuilder,private toast:NgToastService ) { 
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
     
      discription: new FormControl('',[
        Validators.required,]),
              developpeurs: new FormControl('',[
                Validators.required,]),
   }
   this.EquipeForm = this.fb.group(formControls)
  }
  get nom() {return this.EquipeForm.get('nom');}
  get discription() {return this.EquipeForm.get('discription');}

  get developpeurs() {return this.EquipeForm.get('developpeurs');}

//Ajouter

addNewEquipe() {
   
  let data = this.EquipeForm.value;
  
  console.log(data);
  let model:SaveDeveloppeurEquipe=new SaveDeveloppeurEquipe();
  model.id=null;
  model.nom=data.nom;
  model.discription=data.discription;
  model.idDeveloppeurs=+data.developpeurs;
 console.log("dev",model.idDeveloppeurs)
 

  if (
    data.nom == 0 ||
    data.discription == 0 ||
   
    data.developpeurs ==0 
    
  ) {
    this.toast.info({
      detail: 'Error Message',
      summary: 'Votre champs est obligatoire',
    });
  } else {
  this.service.addEquipe(model).subscribe(
    res=>{
      console.log(res);
      this.toast.success({
        detail: 'Succes Message',
        summary: 'Equipe est Envoyé avec succés',
      });

      this.router.navigate(['/Equipe']).then(()=>[window.location.reload()]);
      //parceque je peux pas acceder a la page Equipe lorsque j'ajout un Equipe
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
  Deleteequipe(equipe: Equipe){
    if(confirm("Voulez vous supprimer cet equipe avec l'ID " + equipe.id + " ?")) {
     
      this.service.onDeleteEquipe(equipe.id).subscribe(() => {
        this.router.navigate(['/Equipe']).then(() => {
          window.location.reload()
        })
      })
   
  }
}


  ngOnInit(): void {
   
    this.service.getEquipe().subscribe(equipe => {
      this.ListEquipe = equipe
    })




    
    let idEvent = this.route.snapshot.params['id'];
    this.id = idEvent;
    this.service.findEquipeById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.EquipeForm.patchValue({
        nom: event.nom,
        discription: event.discription,
        developpeurs: event.developpeurs.nom,
        
       });}); 
      
        this.service.getDeveloppeurs().subscribe(equipe => {
          this.ListDeveloppeurs = equipe
        })
  }





}
