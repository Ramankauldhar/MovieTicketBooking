import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit{

  ticketBookingForm!:FormGroup

  message: String = "";
  isProcess: boolean = false;
  className = 'd-none'; //display none for alert in Html

  seatsContainer!: HTMLElement;
  seats!: NodeListOf<Element>;
  countOfSeats!: HTMLElement;
  total!: HTMLElement;
  noOfTicketSelected!: HTMLSelectElement;
  oneTicketPrice: number = 20;
  totalPrice: number = 0;
  text!: HTMLElement;


  constructor(private formBuilder: FormBuilder, private auth:AuthService){
    this.ticketBookingForm = this.formBuilder.group(
      {
        'email':['', Validators.required],
        'movieTitle':['', Validators.required],
        'showTime':['', Validators.required],
        'noOfTickets':['', Validators.required],
        'totalPrice':['', Validators.required],
        'seats':['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.seatsContainer = document.querySelector('.seatsContainer')!;
    this.seats =document.querySelectorAll('.row .seat:not(.Occupied)');
    this.countOfSeats = document.getElementById('countS') as HTMLElement;
    this.total = document.getElementById("total") as HTMLElement;
    this.noOfTicketSelected = document.getElementById("tickets") as HTMLSelectElement;
    this.text = document.getElementById("text") as HTMLElement;
    this.totalPrice = +this.noOfTicketSelected.value * this.oneTicketPrice;
    this.populateUI();
    this.updateSelectedCount();
    this.seatsContainer.addEventListener("click", this.handleSeatClick);
  }

  updateSelectedCount(){
    const seatSelected = document.querySelectorAll('.row .seat.Selected');

    const seatCount = seatSelected.length;
    const seatIndex = Array.from(seatSelected).map(function(seat){
      return Array.from(document.querySelectorAll(".seat")).indexOf(seat);
    });
    localStorage.setItem("seatSelected", JSON.stringify(seatIndex));
    this.countOfSeats.innerText = seatCount.toString();
    this.total.innerText = this.totalPrice.toString();
    this.text.innerText = seatIndex.join(", ");;
  }

  populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatSelected') || '[]');
    if (selectedSeats !== null && selectedSeats.length > 0) {
      this.seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('Selected');
        }
      });
    }
  }

  ticketSelectedChange(e:Event){
    this.totalPrice = +this.noOfTicketSelected.value * this.oneTicketPrice;
    console.log(+this.noOfTicketSelected.selectedIndex);
    this.updateSelectedCount();
  }
 handleSeatClick = (e: Event) => {
    if ((<HTMLElement>e.target).classList.contains("seat") && !(<HTMLElement>e.target).classList.contains("Occupied")) {
      (<HTMLElement>e.target).classList.toggle("Selected");
    }
    this.updateSelectedCount();
  }

  booking(){
    const data = this.ticketBookingForm.value;
    delete data['confirm']
    this.auth.booking(data).subscribe(res=>{
      //if success, 200 code will be returned
      if(res.success){
        this.isProcess = false;
        this.message = "Ticket is booked successfully!";
        this.className = 'alert alert-success';
      }
      else{
        this.isProcess = false;
        this.message = res.message;
        this.className = 'alert alert-danger';
      }
    }, err =>{
        this.isProcess = false;
        this.message = "Server is down!";
        this.className = 'alert alert-danger';
    })
  }
}


