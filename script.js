// Google Maps Initialization
function initMap() {
    const location = { lat: 55.6761, lng: 12.5683 }; // Example for Copenhagen
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({ position: location, map: map });
}

// Rotating Wheels with Drag-and-Rotate Feature
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const hourWheel = document.getElementById("hour-wheel");
const minuteWheel = document.getElementById("minute-wheel");

let currentHour = 0;
let currentMinute = 0;

let isDragging = false;
let startY, startValue;

// Update the wheel display
function updateWheels() {
    hourWheel.textContent = `${currentHour} Hours`;
    minuteWheel.textContent = `${currentMinute} Minutes`;
}

// Function to handle dragging for hour and minute wheels
function startDrag(event, isHour) {
    isDragging = true;
    startY = event.clientY || event.touches[0].clientY; // Get initial Y position
    startValue = isHour ? currentHour : currentMinute; // Store the current value of the wheel

    function onDragMove(e) {
        if (!isDragging) return;

        const currentY = e.clientY || e.touches[0].clientY;
        const deltaY = currentY - startY; // Difference in Y-axis

        if (isHour) {
            currentHour = startValue + Math.floor(deltaY / 20); // Divide to control sensitivity
            if (currentHour < 0) currentHour += 24;
            currentHour %= 24;
        } else {
            currentMinute = startValue + Math.floor(deltaY / 5); // More sensitive for minutes
            if (currentMinute < 0) currentMinute += 60;
            currentMinute %= 60;
        }

        updateWheels();
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", onDragMove);
        document.removeEventListener("touchend", stopDrag);
    }

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", stopDrag);
}

// Event listeners for starting the drag
hourWheel.addEventListener("mousedown", (e) => startDrag(e, true));
minuteWheel.addEventListener("mousedown", (e) => startDrag(e, false));
hourWheel.addEventListener("touchstart", (e) => startDrag(e, true));
minuteWheel.addEventListener("touchstart", (e) => startDrag(e, false));

// Initialize display
updateWheels();

// MobilePay Integration (Mock)
document.getElementById("pay-btn").addEventListener("click", () => {
    const phone = document.getElementById("mobilepay").value;
    if (phone) {
        alert(`MobilePay request sent to ${phone}.`);
    } else {
        alert("Please enter your MobilePay number.");
    }
});
