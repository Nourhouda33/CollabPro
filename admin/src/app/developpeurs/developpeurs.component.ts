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
  userFile :any
  message:any
  imgURL:any
  imagePath:any
  //ajouter
  DeveloppeursForm:FormGroup
  constructor(private service :CrudService,  private router: Router,private route:ActivatedRoute,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      img: new FormControl('',[
        Validators.required,]),
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        ]),
      pswd: new FormControl('',[
        Validators.required,]),
          etat: new FormControl('',[
            Validators.required,]),
            
          adresse: new FormControl('',[
            Validators.required,]),
            
          tel: new FormControl('',[
            Validators.required,]),
        

   }
     this.DeveloppeursForm = this.fb.group(formControls)
  }
  get img(){return this.DeveloppeursForm.get('img')}
   get nom() {return this.DeveloppeursForm.get('nom');}
  get prenom() { return this.DeveloppeursForm.get('prenom');}
  get email() {return this.DeveloppeursForm.get('email');}
  get pswd() {return this.DeveloppeursForm.get('pswd');}
  get etat() { return this.DeveloppeursForm.get('etat');}
  get adresse() { return this.DeveloppeursForm.get('adresse');}

  get tel() { return this.DeveloppeursForm.get('tel');}




  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  addNewDeveloppeurs() {
    let data = this.DeveloppeursForm.value;
    console.log(data);
  
    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0 ||
      data.pswd== 0||
      
      data.adresse ==0 ||
      data.tel ==0 
  
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
      return; // Arrête l'exécution de la fonction si des champs obligatoires sont manquants
    } 
  
    if (!this.imgURL) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Veuillez sélectionner une image',
      });
      return; // Arrête l'exécution de la fonction si aucune image n'est sélectionnée
    }
  
    let developpeurs = new Developpeurs(
      undefined, 
      this.imgURL, // Utilise l'URL de l'image sélectionnée
      data.nom,
      data.prenom,
      data.email,
      data.pswd,
   
      data.etat,
      data.adresse,
      data.tel
    );
    console.log(developpeurs);
  
    this.service.addDeveloppeurs(developpeurs).subscribe(
      res => {
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'developpeurs est Envoyé avec succès',
        });
        this.router.navigate(['/Developpeurs']).then(() => [window.location.reload()]);
      },
      err => {
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Problème de Serveur',
        });
      }
    );
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
          {let newDeveloppeurs=new Developpeurs(dev.id,
            dev.img,
            dev.nom,
            dev.prenom,
            dev.email,
            dev.pswd,
            false,
            dev.adresse,
            dev.tel)
        this.service.updateDeveloppeurs(newDeveloppeurs,dev.id).subscribe
        (
          res=>{console.log(res)
          this.ListDeveloppeurs[index]=newDeveloppeurs
          },
          err=>console.log(err)
        )
          }
         
          else{
        
            let newDeveloppeurs=new Developpeurs(dev.id,dev.img,dev.nom,dev.prenom,dev.email,dev.pswd,true,dev.adresse,dev.tel)
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