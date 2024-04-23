import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Projet } from '../Entity/Projet.Entity';
import { CrudService } from '../Service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {

  ListProjet:Projet[];
  updateForm: FormGroup;
  id: number;


  //ajouter
  ProjetForm:FormGroup
  constructor(private service :CrudService,  private route: Router,private router:ActivatedRoute,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      dateDebuit: new FormControl('',[
        Validators.required,]),
      dateFin: new FormControl('',[
          Validators.required,
        ]),
      discription: new FormControl('',[
        Validators.required,]),
   }
     this.ProjetForm = this.fb.group(formControls)
  }
   get nom() {return this.ProjetForm.get('nom');}
  get dateDebuit() { return this.ProjetForm.get('dateDebuit');}
  get dateFin() {return this.ProjetForm.get('dateFin');}
  get discription() {return this.ProjetForm.get('discription');}
  get status() { return this.ProjetForm.get('status');}

   addNewProjet() {
    let data = this.ProjetForm.value;
    console.log(data);
    let projet = new Projet(
     undefined, data.nom,data.dateDebuit,data.dateFin,data.discription,data.status)
    console.log(projet);

    if (
      data.nom == 0 ||
      data.dateDebuit == 0||
      data.dateFin == 0 ||
      data.discription == 0 ||
      data.status ==0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addProjet(projet).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'projet est Envoyé avec succés',
        });

        this.route.navigate(['/Projet']).then(()=>[window.location.reload()]);
        //parceque je peux pas acceder a la page projet lorsque j'ajout un projet
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
  DeleteProjet(projet: Projet){
    if(confirm("Voulez vous supprimer cet projet avec l'ID " + projet.id + " ?")) {
     
      this.service.onDeleteProjet(projet.id).subscribe(() => {
        this.route.navigate(['/Projet']).then(() => {
          window.location.reload()
        })
      })
   
    }
  }

  //modifierProjet
 
  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findProjetById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        dateDebuit: event.dateDebuit,
        dateFin : event.dateFin,
        discription: event.discription,
        status: event.status });}); 
      
        this.service.getProjet().subscribe(projet => {
          this.ListProjet = projet
        })}
  UpdateProjet() {
    let data = this.updateForm.value;
    let projet =new Projet(
      this.id,
      data.nom,
      data.dateDebuit,
      data.dateFin,
      data.discription,
      data.status
   );
    console.log(projet);
    console.log(data);
    this.service.updateProjet(this.id,projet).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/Projet'])}); }

}
