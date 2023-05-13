import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  register(data:any):Observable<any>{
    return this.http.post('http://localhost:8028/auth/register', data);
  }
  login(data:any):Observable<any>{
    return this.http.post('http://localhost:8028/auth/login',data);
  }
}
