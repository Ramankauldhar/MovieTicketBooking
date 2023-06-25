import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookTicketService } from 'src/app/service/book-ticket.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkOutForm!: FormGroup;
  submitted = false;
  bookingData: any;

  email!:string|null;
  movieTitle!:string|null;
  showTime!: any|null;
  noOfTickets!:any|null;
  totalPrice!:number|null;
  seats!:number[]|null;

  constructor(private formBuilder: FormBuilder, private bookingService:BookTicketService, private router:Router, private auth:AuthService)
    {}

    ngOnInit(){
      //getting the booking data from bookTicket Compoenent
      this.bookingData = this.bookingService.getBookingData();

      this.checkOutForm = this.formBuilder.group(
        {
          name:['', Validators.required],
          card:['', Validators.required],
          cvv:['', Validators.required],
          exDate:['', Validators.required],
        }
      )
      }


      isLoggedIn(): boolean {
        const loginToken = localStorage.getItem('token');
        return loginToken !== null;
      }
    sanitizeCardNumber(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['card'].setValue(sanitizedValue);
    }
    sanitizeCVV(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['cvv'].setValue(sanitizedValue);
    }
    sanitizeExpiryDate(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const sanitizedValue = inputElement.value.replace(/\D/g, '');
      this.checkOutForm.controls['exDate'].setValue(sanitizedValue);
    }

  finalCheckOut() {
    this.submitted = true;
    if(this.checkOutForm.invalid){
      return
    }
    this.router.navigate(['/confirm']);
  }
}
