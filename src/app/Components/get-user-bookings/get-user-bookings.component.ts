import { Component, OnInit } from '@angular/core';
import { GetBookingsService } from 'src/app/service/get-bookings.service';

@Component({
  selector: 'app-get-user-bookings',
  templateUrl: './get-user-bookings.component.html',
  styleUrls: ['./get-user-bookings.component.css']
})
export class GetUserBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: GetBookingsService) { }

  ngOnInit() {
    this.fetchUserBookings();
  }

  fetchUserBookings() {
    this.bookingService.getUserBookings().subscribe(
      (data) => {
        // Handle the data from the API response
        this.bookings = data; // Assuming the API returns an array of bookings
      },
      (error) => {
        // Handle errors
        console.error('Error fetching user bookings', error);
      }
    );
  }
}
