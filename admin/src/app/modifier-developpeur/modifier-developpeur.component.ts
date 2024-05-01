import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Developpeurs } from '../Entity/Developpeurs.Entity';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-modifier-developpeur',
  templateUrl: './modifier-developpeur.component.html',
  styleUrls: ['./modifier-developpeur.component.css']
})
export class ModifierDeveloppeurComponent {
  userDetails:any
  totalProjet =0
  totalTache =0
  totalContact =0

  DeveloppeursForm: FormGroup;
  id: number;
  currentDeveloppeurs = new Developpeurs()
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
     
      prenom: new FormControl('', [Validators.required]),

      
      email: new FormControl('', [Validators.required]),
      pswd: new FormControl('', [Validators.required]),

    };
    this.userDetails = this.service.userDetails();
    this.DeveloppeursForm = this.fb.group(formControles);
  }

  get nom() {
    return this.DeveloppeursForm.get('nom');
  }
  get prenom() {
    return this.DeveloppeursForm.get('prenom');
  }
  get email() {
    return this.DeveloppeursForm.get('email');
  }
 

  get pswd() {
    return this.DeveloppeursForm.get('pswd');
  }
 



  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findDeveloppeursById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.DeveloppeursForm.patchValue({
        nom: event.nom,
        prenom: event.prenom, 
        email: event.email, 
        pswd: event.pswd,
      });});
    
    
      this.service.getContact().subscribe(contact =>{
        this.totalContact=contact.length})
    
    
      this.service.getProjet().subscribe(projet =>{
        this.totalProjet=projet.length})
        
      this.service.getTache().subscribe(tache =>{
        this.totalTache=tache.length})}
  updateDeveloppeurs() {
    let data = this.DeveloppeursForm.value;
    let developpeurs =new Developpeurs(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.pswd, 
      );
    console.log(developpeurs);
    console.log(data);
    this.service.updateDeveloppeurs(developpeurs,this.id).subscribe((res) => {
      console.log(res);
      this.route.navigate([''])}); }

}
