import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Projet } from '../Entity/Projet.Entity';
import { CrudService } from '../Service/crud.service';
import { Developpeurs } from '../Entity/Developpeurs.Entity';

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.css']
})
export class ModifierProjetComponent {
  ListDeveloppeurs:Developpeurs[];
  id: number;
  DeveloppeursForm:FormGroup;
  updateForm: FormGroup;
 
  currentProjet = new Projet()
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(4),
      ]),
     
      dateDebut: new FormControl('', [Validators.required]),

      
      dateFin: new FormControl('', [Validators.required]),
      discription: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),

     
    };
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get dateDebut() {
    return this.updateForm.get('dateDebut');
  }
  get dateFin() {
    return this.updateForm.get('dateFin');
  }

  get discription() {
    return this.updateForm.get('discription');
  }
  get status() {
    return this.updateForm.get('status');
  }
  get logo() {
    return this.updateForm.get('logo');
  }



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findProjetById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        dateDebut: event.dateDebuit, 
        dateFin: event.dateFin, 
        discription: event.discription, 
        status: event.status,
        logo: event.logo, });});
      
      
      
        this.service.findDeveloppeursById(idEvent).subscribe((result) => {
          let event = result;
          console.log(event);
          this.DeveloppeursForm.patchValue({
            nom: event.nom,
            prenom: event.prenom, 
            email: event.email,
            mdp: event.pswd,
          role: event.role,});});
        this.service.getDeveloppeurs().subscribe(developpeurs => {
          this.ListDeveloppeurs = developpeurs
        })}
  UpdateProjet() {
    let data = this.updateForm.value;
    let projet =new Projet(
      this.id,
      data.nom,
      data.dateDebut,
      data.dateFin,
      data.discription,
      data.status, 
    data.logo);
    console.log(projet);
    console.log(data);
    this.service.updateProjet(this.id,projet).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/projet'])}); }

}
