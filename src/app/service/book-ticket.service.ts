import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookTicketService {

  private bookingData: any;

  setBookingData(data: any) {
    this.bookingData = data;
  }

  getBookingData() {
    return this.bookingData;
  }
  
}
