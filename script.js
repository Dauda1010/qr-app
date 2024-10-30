// Parking lots data with address, postal code, and city
const parkingLots = [
    {
        id: 69,
        name: "Åbykollegiet",
        address: "Søren Frichs Vej 59 A-B",
        postal_code: "8230",
        city: "Aarhus",
        latitude: 56.149907,
        longitude: 10.166154,
    },
    {
        id: 78,
        name: "Domibus A/S",
        address: "Fredensgade 20",
        postal_code: "6300",
        city: "Gråsten",
        latitude: 54.921463,
        longitude: 9.596687,
    },
    {
        id: 86,
        name: "Pier 5 Hotel",
        address: "Rendsburggade 5",
        postal_code: "9000",
        city: "Aalborg",
        latitude: 57.048393,
        longitude: 9.928459,
    }
];

// Google Maps Initialization - specified as the callback in the API script URL
function initMap() {
    const mapCenter = { lat: 56.149907, lng: 10.166154 }; // Center map on Denmark

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: mapCenter,
    });

    const infoWindow = new google.maps.InfoWindow(); // Initialize a single InfoWindow instance

    // Create markers for each parking lot
    parkingLots.forEach(lot => {
        const marker = new google.maps.Marker({
            position: { lat: lot.latitude, lng: lot.longitude },
            map: map,
            title: lot.name,
        });

        // Click event for each marker to show the info window
        marker.addListener("click", () => {
            const contentString = `
                <div class="info-window-content">
                    <h5>${lot.name}</h5>
                    <p>${lot.address}, ${lot.postal_code} ${lot.city}</p>
                </div>
            `;

            // Ensure the infoWindow is closed before opening a new one
            infoWindow.close();
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
        });
    });
}

// License Plate Validation
function validateLicensePlate(plate) {
    const platePattern = /^[A-Z]{2}\d{1,5}$/;
    return platePattern.test(plate);
}

document.getElementById("check-plate").addEventListener("click", () => {
    const plate = document.getElementById("license-plate").value.trim().toUpperCase();
    const validationMessage = document.getElementById("plate-validation-message");

    if (validateLicensePlate(plate)) {
        validationMessage.textContent = "Valid Danish License Plate!";
        validationMessage.style.color = "green";
    } else {
        validationMessage.textContent = "Invalid License Plate. Format: Two letters followed by up to five digits (e.g., AB12345).";
        validationMessage.style.color = "red";
    }
    validationMessage.style.display = "block";
});

// Event listener for Register button in the navbar
function showRegisterPopup() {
    document.getElementById("register-popup").style.display = "block";
}

document.getElementById("register-btn").addEventListener("click", showRegisterPopup);
document.getElementById("register-navbar").addEventListener("click", showRegisterPopup);

// Hide the registration popup
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("register-popup").style.display = "none";
});

// MobilePay Validation
function validateMobilePayNumber(number) {
    return /^\d{8}$/.test(number);
}

document.getElementById("pay-btn").addEventListener("click", () => {
    const phone = document.getElementById("mobilepay").value;
    const validationMessage = document.getElementById("plate-validation-message");

    if (validateMobilePayNumber(phone)) {
        validationMessage.style.display = "none";
        alert(`MobilePay request sent to ${phone}.`);
    } else {
        validationMessage.textContent = "Invalid MobilePay number. It must be exactly 8 digits.";
        validationMessage.style.color = "red";
        validationMessage.style.display = "block";
    }
});

// Sidebar Toggle
document.getElementById("menu-icon").addEventListener("click", () => {
    document.getElementById("sidebar").style.width = "250px";
});

document.getElementById("close-sidebar").addEventListener("click", () => {
    document.getElementById("sidebar").style.width = "0";
});

// Sidebar Toggle for "Login" link in the header
document.getElementById("login").addEventListener("click", () => {
    document.getElementById("sidebar").style.width = "250px";
});

// Time Wheel functionality
const hourWheel = document.getElementById("hour-wheel");
const minuteWheel = document.getElementById("minute-wheel");
let currentHour = 0, currentMinute = 0;

// Function to update the display
function updateWheels() {
    hourWheel.textContent = `${currentHour} Hours`;
    minuteWheel.textContent = `${currentMinute} Minutes`;
}

// Mouse down event for dragging the hour wheel
hourWheel.addEventListener("wheel", (event) => {
    event.preventDefault();
    currentHour += Math.sign(event.deltaY);
    if (currentHour < 0) currentHour = 23;
    if (currentHour > 23) currentHour = 0;
    updateWheels();
});

// Mouse down event for dragging the minute wheel
minuteWheel.addEventListener("wheel", (event) => {
    event.preventDefault();
    currentMinute += Math.sign(event.deltaY);
    if (currentMinute < 0) currentMinute = 59;
    if (currentMinute > 59) currentMinute = 0;
    updateWheels();
});

// Reset time to zero
document.getElementById("reset-time").addEventListener("click", () => {
    currentHour = 0;
    currentMinute = 0;
    updateWheels();
});

// Quick Parking Time selection
document.getElementById("quick-time").addEventListener("change", (event) => {
    const selectedMinutes = parseInt(event.target.value);
    currentHour = Math.floor(selectedMinutes / 60);
    currentMinute = selectedMinutes % 60;
    updateWheels();
});

// Initialize display for time wheels
updateWheels();
