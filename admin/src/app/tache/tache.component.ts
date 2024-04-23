import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Tache } from '../Entity/Tache.Entity';
import { CrudService } from '../Service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent {
  
  ListTache: Tache[];
  id : number

  p:number=1;
 collection:any[]
 TacheForm:FormGroup

  
 constructor(
  private fb: FormBuilder,
  private service: CrudService,
  private router: Router,
  private route: ActivatedRoute,
  private toast:NgToastService
){  let formControls = {
    nom: new FormControl('',[
      Validators.required,]),
    dateDebuit: new FormControl('',[
      Validators.required,]),
    dateFin: new FormControl('',[
        Validators.required,
      Validators.required]),
    discription: new FormControl('',[
      Validators.required,])}
   this.TacheForm= this.fb.group(formControls)
 }
 
 get nom() {return this.TacheForm.get('nom');}
 get dateDebuit() { return this.TacheForm.get('dateDebuit');}
 get dateFin() {return this.TacheForm.get('dateFin');}
 get discription() {return this.TacheForm.get('discription');}
 
 addNewTache() {
  let data = this.TacheForm.value;
  console.log(data);
  let tache = new Tache(
   undefined, data.nom,data.dateDebuit,data.dateFin,data.discription);
  console.log(tache);

  if (
    data.nom == 0 ||
    data.dateDebuit == 0||
    data.dateFin== 0 ||
    data.discription == 0
  ) {
    this.toast.info({
      detail: 'Error Message',
      summary: 'Votre champs est obligatoire',
    });
  } else {
  this.service.addTache(tache).subscribe(
    res=>{
      console.log(res);
      this.toast.success({
        detail: 'Succes Message',
        summary: 'Tache est Envoyé avec succés',
      });

      this.router.navigate(['/ListTache']);
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
   DeleteTache(tache: Tache){
     if(confirm("Voulez vous supprimer cet tache avec l'ID " + tache.id + " ?")) {
      
       this.service.onDeleteTache(tache.id).subscribe(() => {
         this.router.navigate(['/listTache']).then(() => {
           window.location.reload()
         })
       })
    
   }
 }
 updateTache() {
  let data = this.TacheForm.value;
  let tache =new Tache(
    this.id,
    data.nom,
    data.dateDebuit,
    data.dateFin,
    data.discription,
     );
  console.log(tache);
  console.log(data);
  this.service.updateTache(this.id,tache).subscribe((res) => {
    console.log(res);
    this.router.navigate(['/Tache'])}); }

 
 
   ngOnInit(): void {
     this.service.getTache().subscribe(tache => {
       this.ListTache = tache
     });
     let idEvent = this.route.snapshot.params['id'];
     this.id = idEvent;
     this.service.findTacheById(idEvent).subscribe((result) => {
       let event = result;
       console.log(event);
       this.TacheForm.patchValue({
         nom: event.nom,
         dateDebuit: event.dateDebuit, 
         dateFin: event.dateFin,
         discription: event.discription,});});
   }
 
 
 
}
