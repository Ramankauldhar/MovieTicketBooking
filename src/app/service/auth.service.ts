import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  //I want to save the userEmail
  private userEmail:string='';

  constructor(private http:HttpClient) { }

  setUserEmail(email:string){
    this.userEmail = email;
  }
  getUserEmail(){
    return this.userEmail;
  }

  register(data:any):Observable<any>{
    return this.http.post('http://localhost:8022/auth/register', data);
  }
  login(data:any):Observable<any>{
    return this.http.post('http://localhost:8022/auth/login',data);
  }
  booking(data:any):Observable<any>{
    return this.http.post('http://localhost:8022/auth/bookticket',data);
  }


}


