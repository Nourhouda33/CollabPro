import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { Observable } from 'rxjs';
import { Tache } from '../Entity/Tache.Entity';
import { Projet } from '../Entity/Projet.Entity';
import { Contact } from '../Entity/Contact.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Developpeurs } from '../Entity/Developpeurs.Entity';
import { Fichier } from '../Entity/Fichier.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  apiUrl="http://localhost:8081/api"
  loginUserUrl="http://localhost:8081/api/Admin/login"
  resetMdpClt="http://localhost:8081/api/Developpeurs/forgotmdp"

  helper=new JwtHelperService()
 
  constructor(private http:HttpClient) { }
  resetMdpDeveloppeurs(developpeurs:Developpeurs){
    return this.http.post<any>(this.resetMdpClt, developpeurs);
    }
  
  
  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl + "/Admin");
  }


  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }


  addTache(tache:Tache)
   {
    return this.http.post<any>(this.apiUrl+"/Tache",tache);
   
  }
  onDeleteTache(id : number){
    const url =`${this.apiUrl+"/Tache"}/${id}` 
    return this.http.delete(url)
  }
  getTache(): Observable<Tache[]>{
    return this.http.get<Tache[]>(this.apiUrl + "/Tache");
  }
  getFichier(): Observable<Fichier[]>{
    return this.http.get<Fichier[]>(this.apiUrl + "/fichier");
  }
  addFichier(fichier:Fichier)
  {
   return this.http.post<any>(this.apiUrl+"/fichier",fichier);
  
 }
  addProjet(projet:Projet)
   {
    return this.http.post<any>(this.apiUrl+"/Projet",projet);
   
  }
  onDeleteFichier(id : number){
    const url =`${this.apiUrl+"/fichier"}/${id}` 
    return this.http.delete(url)
  }
  onDeleteProjet(id : number){
    const url =`${this.apiUrl+"/Projet"}/${id}` 
    return this.http.delete(url)
  }
  onDeleteDeveloppeurs(id : number){
    const url =`${this.apiUrl+"/Developpeurs"}/${id}` 
    return this.http.delete(url)
  }
  getDeveloppeurs(): Observable<Developpeurs[]>{
    return this.http.get<Developpeurs[]>(this.apiUrl + "/Developpeurs");
  }

  updateDeveloppeurs(developpeurs: Developpeurs,id:number,) {
    const url =` ${this.apiUrl+"/Developpeurs"}/${id}`
    return this.http.put<any>(url, developpeurs);
  }
  getProjet(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.apiUrl + "/Projet");
  }


  addContact(contact:Contact)
   {
    return this.http.post<any>(this.apiUrl+"/Contact",contact);
   
  }

  addDeveloppeurs(developpeurs:Developpeurs)
   {
    return this.http.post<any>(this.apiUrl+"/Developpeurs",developpeurs);
   
  }
  onDeleteContact(id : number){
    const url =`${this.apiUrl+"/Contact"}/${id}` 
    return this.http.delete(url)
  }
  getContact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl + "/Contact");
  }



  updateProjet(id:number,projet: Projet) {
    const url =` ${this.apiUrl+"/Projet"}/${id}`
    return this.http.put<any>(url, projet);
  }

  updateFichier(id:number,fichier: Fichier) {
    const url =` ${this.apiUrl+"/fichier"}/${id}`
    return this.http.put<any>(url, fichier);
  }


 

  findProjetById(id : number): Observable<Projet> {
    const url = `${this.apiUrl + "/Projet"}/${id};`
    return this.http.get<Projet>(url)
  }
  
  findDeveloppeursById(id : number): Observable<Developpeurs> {
    const url = `${this.apiUrl + "/Developpeurs"}/${id};`
    return this.http.get<Developpeurs>(url)
  }




  updateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/Admin"}/${id}`
    return this.http.put<any>(url, admin);
  }


 

  findAdminById(id : number): Observable<Admin> {
    const url = `${this.apiUrl + "/Admin"}/${id};`
    return this.http.get<Admin>(url)
  }

  updateTache(id:number,tache: Tache) {
    const url = `${this.apiUrl+"/Tache"}/${id}`
    return this.http.put<any>(url, tache);
  }
 
  findTacheById(id : number): Observable<Tache> {
    const url = `${this.apiUrl + "/Tache"}/${id};`
    return this.http.get<Tache>(url)
  }
  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }


  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
}
