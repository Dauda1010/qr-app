// Google Maps Initialization
function initMap() {
    const location = { lat: 55.6761, lng: 12.5683 }; // Example for Copenhagen
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({ position: location, map: map });
}

// Rotating Wheels
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const hourWheel = document.getElementById("hour-wheel");
const minuteWheel = document.getElementById("minute-wheel");

let currentHour = 0;
let currentMinute = 0;

hourWheel.addEventListener("click", () => {
    currentHour = (currentHour + 1) % 24;
    hourWheel.textContent = `${hours[currentHour]} Hours`;
});

minuteWheel.addEventListener("click", () => {
    currentMinute = (currentMinute + 1) % 60;
    minuteWheel.textContent = `${minutes[currentMinute]} Minutes`;
});

// MobilePay Integration (Mock)
document.getElementById("pay-btn").addEventListener("click", () => {
    const phone = document.getElementById("mobilepay").value;
    if (phone) {
        alert(`MobilePay request sent to ${phone}.`);
    } else {
        alert("Please enter your MobilePay number.");
    }
});
