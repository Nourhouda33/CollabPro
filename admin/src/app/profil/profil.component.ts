import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../Service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../Entity/Admin.Entity';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userDetails:any
  totalProjet =0
  totalTache =0
  totalContact=0
  totalDeveloppeurs=0
  id : number;
  AdminForm: FormGroup;
  champsEditable: boolean = false;
  boutonVisible: boolean = false;


  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
  
    this.userDetails = this.service.userDetails();
  
    this.AdminForm = this.fb.group({
      nom: [this.userDetails ? this.userDetails.nom : '', [
        Validators.required,
      
      ]],
      prenom: [this.userDetails ? this.userDetails.prenom : '', [Validators.required]],
      email: [this.userDetails ? this.userDetails.email : '', [Validators.required]],
      pswd: [this.userDetails ? this.userDetails.pswd : '', [Validators.required]],
      adresse: [this.userDetails ? this.userDetails.adresse : '', [Validators.required]],
      phone: [this.userDetails ? this.userDetails.phone : '', [Validators.required]],
    });
  
    this.AdminForm.disable();
  }
  

     logout(){
      console.log("logout");
      localStorage.clear()
     
      this.route.navigate(['/Login']);
     }
     ngOnInit(): void {
      this.id = this.userDetails.id;
  
    this.service.findAdminById(this.id).subscribe(
      (result) => {
        // Succès : mettre à jour le formulaire avec les détails de l'admin
        this.AdminForm.patchValue({
          nom: result.nom,
          prenom: result.prenom,
          email: result.email,
          pswd: result.pswd,
          
          adresse: result.adresse,
          phone: result.phone,
          
        });
      },
    
    );



      this.service.getProjet().subscribe(projet =>{
        this.totalProjet=projet.length})
      this.service.getTache().subscribe(tache =>{
        this.totalTache=tache.length})
        this.service.getContact().subscribe(contact =>{
          this.totalContact=contact.length})
          this.service.getDeveloppeurs().subscribe(tache =>{
            this.totalDeveloppeurs=tache.length})
     }
     updateAdmin() {
      let data = this.AdminForm.value;
      let admin =new Admin(
        this.id,
        data.nom,
        data.prenom,
        data.email,
        data.pswd,
        data.adresse,
        data.phone, 
        );
      console.log(admin);
      console.log(data);
      this.service.updateAdmin(this.id,admin).subscribe((res) => {
        console.log(res);
        this.route.navigate(['/profil'])}); }
        
    basculerEditionChamps() {
      this.champsEditable = !this.champsEditable;
      if (this.champsEditable) {
        this.AdminForm.enable();
        this.boutonVisible = true;
      } else {
        this.AdminForm.disable();
        this.boutonVisible = false;
      }
    }
   
}
