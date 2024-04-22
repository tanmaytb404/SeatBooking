const movieName = document.getElementById("movieName");
const moviePrice = document.getElementById("moviePrice");
const totalPrice = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeat = document.getElementById("numberOfSeat");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");
const selectMovie = document.querySelector("#selectMovie");
let selectedSeats = [];

const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

moviesList.forEach((mv, i) => {
    const option = document.createElement("option");
    option.textContent = `${mv.movieName} $${mv.price}`;
    option.value = i;
    selectMovie.append(option)
});

selectMovie.addEventListener("change", function () {
    const idx = selectMovie.value;
    updateDetails(idx);
});

function updateDetails(idx) {
    moviePrice.textContent = `$ ${moviesList[idx].price}`;
    movieName.textContent = moviesList[idx].movieName
}

const seatCont = document.querySelector(".seatCont");
let seatNumber = 1;
const seatsAll = seatCont.querySelectorAll(".seat");
seatsAll.forEach(seat => {
    seat.dataset.seatNumber = seatNumber++;
});

const seats = seatCont.querySelectorAll(".seat:not(.occupied)");
seats.forEach(seat => {
    seat.addEventListener("click", () => {
        if (seat.classList.value.includes("selected")) {
            seat.classList.remove("selected");
            selectedSeats.splice(selectedSeats.indexOf(seat), 1);
            console.log();
        }
        else if (!seat.classList.value.includes("occupied")) {
            seat.classList.add("selected");
            selectedSeats.push(seat);
        }
        const cost = (moviePrice.textContent.split(" ")[1]) * selectedSeats.length;
        totalPrice.textContent = `$ ${cost}`;
        numberOfSeat.textContent = selectedSeats.length;
        updateSeatHolder();
        // selectedSeatsHolder.innerText =  ? selectedSeats.forEach(seat => seat.dataset.seatNumber.join(", ")) : "No seat selected";
        // selectedSeats.length > 0 ? selectedSeats.forEach(seats => seats.join(" "): "NONE")
    });
})

function updateSeatHolder() {
    selectedSeatsHolder.innerHTML = "";
    selectedSeats.forEach(seat => {
        console.log("hola")
        const seatHolder = document.createElement("div");
        seatHolder.classList.add("selectedSeats");
        seatHolder.innerHTML = seat.dataset.seatNumber;
        selectedSeatsHolder.appendChild(seatHolder);
    })

    if (!selectedSeats.length > 0) {
        const span = document.createElement("span");
        span.classList.add("noSelected");
        span.innerHTML = "No Seat Selected";
        selectedSeatsHolder.appendChild(span);
    }
}

function booked() {
    for (let seat of selectedSeats) {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
    }
    selectedSeats = [];
    numberOfSeat.textContent = 0;
    totalPrice.textContent = `$ 0`;
}

proceedBtn.addEventListener("click", () => {
    if (selectedSeats.length == 0)
        alert("Oops no seat Selected");
    else {
        booked();
        alert("Yayy! Your Seats have been booked");
    }
})

cancelBtn.addEventListener("click", () => {
    selectedSeats.forEach(seat => {
        console.log(seat)
        seat.classList.remove("selected");
        numberOfSeat.textContent = 0;
        totalPrice.textContent = `$ 0`;
        selectedSeats = [];
        updateSeatHolder();
    })
})