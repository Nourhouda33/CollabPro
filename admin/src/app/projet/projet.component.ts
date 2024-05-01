import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Projet } from '../Entity/Projet.Entity';
import { CrudService } from '../Service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SaveProjetEquipe } from '../Entity/SaveProjetEquipe.Entity';
import { Tache } from '../Entity/Tache.Entity';
import { Equipe } from '../Entity/Equipe.Entity';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {

  ListProjet:Projet[];
  updateForm: FormGroup;
  id: number;
  userFile :any;
  message : any;
  imagePath : any;
  imgURL :any;
  Listtache:Tache[]
  Listequipe:Equipe[]


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
        logo: new FormControl('',[
          Validators.required,]),
          status: new FormControl('',[
            Validators.required,]),
            equipe: new FormControl('',[
              Validators.required,]),
              tache: new FormControl('',[
                Validators.required,]),
   }
     this.ProjetForm = this.fb.group(formControls)
  }
   get nom() {return this.ProjetForm.get('nom');}
  get dateDebuit() { return this.ProjetForm.get('dateDebuit');}
  get dateFin() {return this.ProjetForm.get('dateFin');}
  get discription() {return this.ProjetForm.get('discription');}
  get logo() { return this.ProjetForm.get('logo');}
  get status() { return this.ProjetForm.get('status');}
  get equipe() { return this.ProjetForm.get('equipe');}
  get tache() { return this.ProjetForm.get('tache');}
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
   addNewProjet() {
   
    let data = this.ProjetForm.value;

    console.log(data);
    let model:SaveProjetEquipe=new SaveProjetEquipe();
    model.id=null;
    model.nom=data.nom;
    model.dateDebuit=data.dateDebuit;
    model.dateFin=data.dateFin;
    model.discription=data.discription;
    model.logo=this.imgURL;
    model.status=data.status;
    model.idEquipe=+data.equipe;
    model.idTache=+data.tache;
   

    if (
      data.nom == 0 ||
      data.dateDebuit == 0||
      data.dateFin == 0 ||
      data.discription == 0 ||
      data.status ==0 ||
      data.equipe ==0 ||
      data.tache ==0 
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addProjet(model).subscribe(
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
        status: event.status,
        equipe: event.equipe.nom,
        
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
      data.status
   );
    console.log(projet);
    console.log(data);
    this.service.updateProjet(this.id,projet).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/Projet'])}); }

}
