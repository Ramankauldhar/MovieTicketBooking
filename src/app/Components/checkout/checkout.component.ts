import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{


  checkOutForm!: FormGroup;
  submitted = false;

  email!:string|null;
  movieTitle!:string|null;
  showTime!: any|null;
  noOfTickets!:any|null;
  totalPrice!:number|null;
  seats!:number[]|null;

  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
      this.checkOutForm = this.formBuilder.group(
        {
          name:['', Validators.required],
          card:['', Validators.required],
          cvv:['', Validators.required],
          exDate:['', Validators.required],
        }
      )

      this.route.queryParamMap.subscribe((params) => {
        const data = JSON.parse(params.get('data') || '{}');
        this.email = data.email;
        this.movieTitle = data.movieTitle;
        this.showTime = data.showTime;
        this.noOfTickets = data.noOfTickets;
        this.totalPrice = data.totalPrice;
        this.seats = data.seats;
    
        console.log(data);
      });
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
    const message = `
      Booking confirmed!
      Email: ${this.email}
      Movie Title: ${this.movieTitle}
      Show Time: ${this.showTime}
      Number of Tickets: ${this.noOfTickets}
      Total Price: ${this.totalPrice ? this.totalPrice + 2.03 : 0}
      Seats: ${this.seats}
    `;
    alert(message);
  }
}
