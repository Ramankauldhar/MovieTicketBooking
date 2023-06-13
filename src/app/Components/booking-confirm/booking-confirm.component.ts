import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BookTicketService } from 'src/app/service/book-ticket.service';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit{
  bookingData: any;

  constructor(private bookingService: BookTicketService, private auth: AuthService){}

  ngOnInit(){
    //getting the booking data from bookTicket Compoenent
    this.bookingData = this.bookingService.getBookingData();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn(); 
  }

}
