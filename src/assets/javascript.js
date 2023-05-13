    const container = document.querySelector('.container');
    const seats = document.querySelectorAll('.seat,.seat1');
    const seatsCount = document.getElementById('seatsCount');
    const totalPrice = document.getElementById('totalPrice');
    const showTime = document.getElementById("showTime");
    const tickets = document.getElementById("tickets");

    let selectedtickets = +tickets.value;
    let ticketPrice=50;
    
    container?.addEventListener("click", (e) =>{
        if(e.target.classList.contains('seat') && !e.target.classList.contains('Occupied')){
            console.log(e.target);
  }
})