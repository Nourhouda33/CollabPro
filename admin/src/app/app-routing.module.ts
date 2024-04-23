import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Service/Auth.service';
import { ProfilComponent } from './profil/profil.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProjetComponent } from './projet/projet.component';
import { DeveloppeursComponent } from './developpeurs/developpeurs.component';
import { ResetMdpDevComponent } from './reset-mdp-dev/reset-mdp-dev.component';
import { ModifierProjetComponent } from './modifier-projet/modifier-projet.component';
import { ModifierDeveloppeurComponent } from './modifier-developpeur/modifier-developpeur.component';
import { TacheComponent } from './tache/tache.component';
import { FichierComponent } from './fichier/fichier.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'Login',component :LoginComponent},
  {path:'',component:DashbordComponent,canActivate:[AuthGuard]},
  {path:'Projet',component:ProjetComponent,canActivate:[AuthGuard]},
  {path:'Developpeurs',component:DeveloppeursComponent,canActivate:[AuthGuard]},
  {path:'ResetMdpDev',component:ResetMdpDevComponent},
  {path:'ModifierProjet/:id',component:ModifierProjetComponent,canActivate:[AuthGuard]},
  {path:'ModifierDev/:id',component:ModifierDeveloppeurComponent,canActivate:[AuthGuard]},
  {path:'Tache',component:TacheComponent ,canActivate:[AuthGuard]},
  {path:'Fichier',component:FichierComponent ,canActivate:[AuthGuard]},
  {path:'Profile',component:ProfilComponent ,canActivate:[AuthGuard]},
  {path:'contact',component:ContactComponent ,canActivate:[AuthGuard]},



  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
