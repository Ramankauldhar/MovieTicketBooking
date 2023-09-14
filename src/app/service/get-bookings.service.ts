import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetBookingsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Add a method to set the Authorization header with a JWT token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
  }

  getUserBookings(email: string): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the Authorization header
    const options = { headers: headers };
    return this.http.get(`https://movieticketbookingbackend.onrender.com/auth/bookings/${email}`, options);
  }
}
