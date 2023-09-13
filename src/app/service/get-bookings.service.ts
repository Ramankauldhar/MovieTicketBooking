import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetBookingsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserBookings(): Observable<any> {
    const userData = {
      email: this.authService.getUserEmail() // Get user email from AuthService
    };

    return this.http.post('https://movieticketbookingbackend.onrender.com/auth/bookings', userData);
  }
}
