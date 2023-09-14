import { Component, OnInit } from '@angular/core';
import { GetBookingsService } from '../../service/get-bookings.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-get-user-bookings',
  templateUrl: './get-user-bookings.component.html',
  styleUrls: ['./get-user-bookings.component.css']
})
export class GetUserBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: GetBookingsService, private authService: AuthService) { }

  ngOnInit(): void {
    const email = this.authService.getUserEmail();

    this.bookingService.getUserBookings(email).subscribe(
      (response: any) => {
        if (response.success) {
          this.bookings = response.data;
          console.log('Received bookings:', this.bookings);
        } else {
          // Handle error, e.g., display an error message
          console.error('Failed to fetch bookings:', response.message);
        }
      },
      (error: any) => {
        // Handle HTTP error, e.g., display an error message
        console.error('HTTP request failed:', error);
      }
    );
  }
}
