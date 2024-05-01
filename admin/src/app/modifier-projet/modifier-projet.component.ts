import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Projet } from '../Entity/Projet.Entity';
import { CrudService } from '../Service/crud.service';
import { Developpeurs } from '../Entity/Developpeurs.Entity';
import { Equipe } from '../Entity/Equipe.Entity';
import { Tache } from '../Entity/Tache.Entity';

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.css']
})
export class ModifierProjetComponent {
  ListEquipe:Equipe[];
  id: number;
  EquipeForm:FormGroup;
  updateForm: FormGroup;
  ListProjet :Projet[];
  Listequipe :Equipe[];
  Listtache:Tache[];
  userFile :any
  message:any
  imagePath:any
  imgURL:any
  
  champsEditable: boolean = false;
  boutonVisible: boolean = false;
 
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
     
      dateDebuit: new FormControl('', [Validators.required]),

      
      dateFin: new FormControl('', [Validators.required]),
      discription: new FormControl('', [Validators.required]),
      logo: new FormControl('',[
        Validators.required,]),
        status: new FormControl('',[
          Validators.required,]),
          equipeNom: new FormControl('',[
            Validators.required,]),
            equipeLogo: new FormControl('',[
              Validators.required,]),
              
            equipeDis: new FormControl('',[
              Validators.required,]),

     
    };
    this.updateForm = this.fb.group(formControles);
    this.EquipeForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get dateDebuit() {
    return this.updateForm.get('dateDebuit');
  }
  get dateFin() {
    return this.updateForm.get('dateFin');
  }

  get discription() {
    return this.updateForm.get('discription');
  }
  
  get logo() { return this.updateForm.get('logo');}
  get status() { return this.updateForm.get('status');}
  get equipe() { return this.updateForm.get('equipe');}
  get tache() { return this.updateForm.get('tache');}
  
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


  ngOnInit(): void {
    
    this.service.getEquipe().subscribe(equipe => {
      this.Listequipe = equipe
    })
    this.service.getTache().subscribe(tache => {
      this.Listtache = tache
    })
      
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
              logo: event.logo,
              status: event.status,
              equipeNom: event.equipe.nom,
              equipeDis :event.equipe.discription,


       });}); 
            
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
      this.imgURL,
      data.status, 
      data.equipeNom, 
      
     
    
    
    
  
  );
    console.log(projet);
    console.log(data);
    this.service.updateProjet(this.id,projet).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/projet'])}); }







      basculerEditionChamps() {
        this.champsEditable = !this.champsEditable;
        if (this.champsEditable) {
          this.updateForm.enable();
          this.boutonVisible = true;
        } else {
          this.updateForm.disable();
          this.boutonVisible = false;
        }
      }

}
