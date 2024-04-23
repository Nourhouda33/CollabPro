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


    constructor( private fb: FormBuilder,
      private service: CrudService,
      private router: Router,
      private route: ActivatedRoute)
     { 
      let formControles = {
        nom: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-z A-Z .'-]+"), 
          Validators.minLength(4),
        ]),
        prenom: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        pswd: new FormControl('', [Validators.required]),
        adresse: new FormControl('', [Validators.required]),

        phone: new FormControl('', [Validators.required]),

  
      };
      this.userDetails = this.service.userDetails();

     }
     

     logout(){
      console.log("logout");
      localStorage.clear()
     
      this.router.navigate(['/Login']);
     }
     ngOnInit(): void {



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
        );
      console.log(admin);
      console.log(data);
      this.service.updateAdmin(this.id,admin).subscribe((res) => {
        console.log(res);
        this.router.navigate([''])}); }
   
}
