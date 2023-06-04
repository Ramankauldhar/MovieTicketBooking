import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit{

  ticketBookingForm!:FormGroup
  submitted = false;
  selectedSeats: number[] = [];
  email!:string;

  movieImage!: string | null;
  movieOverview!: string | null;
  movieTitle!: string | null;

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


  constructor(private formBuilder: FormBuilder,
     private auth:AuthService, 
     private route:ActivatedRoute, 
     private router:Router,
     private http:HttpClient)
    {
    this.ticketBookingForm = this.formBuilder.group(
      {
        email:['', Validators.required],
        showTime:['', Validators.required],
        noOfTickets:['', Validators.required],
        seats:['', Validators.required]
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

    this.route.queryParamMap.subscribe((params) => {
      this.movieImage = params.get('movieImage') || '';
      this.movieOverview = params.get('movieOverview') || '';
      this.movieTitle = params.get('movieTitle') || '';
    });
    this.email = this.auth.getUserEmail();
  }

  
  updateSelectedCount(): void{
    const seatSelected = document.querySelectorAll('.row .seat.Selected');
    this.selectedSeats = Array.from(seatSelected).map(seat => {
      return Array.from(document.querySelectorAll('.seat')).indexOf(seat);
    });

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

  booking() {
    this.submitted = true;
    if(this.ticketBookingForm.invalid){
      return
    }
    this.isProcess = true;
    const data = {
      email: this.email,
      movieTitle: this.movieTitle,
      showTime: this.ticketBookingForm.value.showTime,
      noOfTickets: this.ticketBookingForm.value.noOfTickets,
      totalPrice: this.totalPrice,
      seats: this.selectedSeats
    };
  
    this.auth.booking(data).subscribe(
      res => {
        if (res.success) {
          this.isProcess = false;
          this.message = "The Ticket is Booked successfully!";
          this.className = 'alert alert-success';
  
          const queryParams = {
            email: this.email,
            movieTitle: this.movieTitle,
            showTime: this.ticketBookingForm.value.showTime,
            noOfTickets: this.ticketBookingForm.value.noOfTickets,
            totalPrice: this.totalPrice,
            seats: this.selectedSeats
          };
          this.router.navigate(['/checkout'], { queryParams: { data: JSON.stringify(queryParams) } });
        } else {
          this.isProcess = false;
          this.message = res.message;
          this.className = 'alert alert-danger';
        }
      },
      err => {
        this.isProcess = false;
        this.message = "Server is down!";
        this.className = 'alert alert-danger';
      }
    );
  
    const allSeats = document.getElementsByClassName('seat');
    for (let i = 0; i < allSeats.length; i++) {
      const seat = allSeats[i];
      if (!seat.classList.contains('Selected')) {
        seat.setAttribute('disabled', 'disabled');
      }
    }
  }

}


