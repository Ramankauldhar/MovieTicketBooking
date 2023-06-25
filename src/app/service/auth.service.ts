import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
 
  //I want to save the userEmail
  private userEmail:string='';

  constructor(private http:HttpClient) { }
  

  setUserEmail(email:string){
    this.userEmail = email;
    localStorage.setItem('email', email)
  }
  getUserEmail(): string {
    const email = localStorage.getItem('email');
    return email !== null ? email : '';
  }


  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  register(data:any):Observable<any>{
    return this.http.post('https://movieticketbookingbackend.onrender.com/auth/register', data);
  }
  login(data:any):Observable<any>{
    this.isAuthenticated = true;
    return this.http.post('https://movieticketbookingbackend.onrender.com/auth/login',data);
  }
  booking(data:any):Observable<any> {
    return this.http.post('https://movieticketbookingbackend.onrender.com/auth/bookticket',data);
  }

  logout() {
    this.isAuthenticated = false;
  }

}


