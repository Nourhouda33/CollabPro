import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfilComponent } from './profil/profil.component';
import { ResetMdpDevComponent } from './reset-mdp-dev/reset-mdp-dev.component';
import { ProjetComponent } from './projet/projet.component';
import { TacheComponent } from './tache/tache.component';
import { ContactComponent } from './contact/contact.component';
import { DeveloppeursComponent } from './developpeurs/developpeurs.component';
import { ModifierProjetComponent } from './modifier-projet/modifier-projet.component';
import { ModifierDeveloppeurComponent } from './modifier-developpeur/modifier-developpeur.component';
import { FichierComponent } from './fichier/fichier.component';
import { AjouterTacheComponent } from './ajouter-tache/ajouter-tache.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashbordComponent,
    ProfilComponent,
    ResetMdpDevComponent,
    ProjetComponent,
    TacheComponent,
    ContactComponent,
    DeveloppeursComponent,
    ModifierProjetComponent,
    ModifierDeveloppeurComponent,
    FichierComponent,
    AjouterTacheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
