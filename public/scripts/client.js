console.log('Dit is de client server voor Sprint 12');

const sliderFrame = document.querySelector('.allScans'); // Slider van de scans met de back en next button
const containerScan = document.querySelectorAll('.containerScan');
const backButton = document.querySelector('.buttonLeft');
const nextButton = document.querySelector('.buttonRight');
const currentDateElement = document.querySelector('.date'); // Datum variable, zodat de datum boven in mee veranderd

let slideWidth; //variable aangemaakt om te berekenen wat de breedte is slider + client width
let currentScanIndex = 0; // Houdt bij welke scan momenteel wordt weergegeven

// Functie om de breedte van de slide bij te werken
function updateSlideWidth() {
    slideWidth = sliderFrame.clientWidth;
}

// Roep de functie aan om de breedte te berekenen
updateSlideWidth();

// Functie om de huidige datum bij te werken
function updateCurrentDate() {
    const currentScan = containerScan[currentScanIndex];
    const scanDate = new Date(currentScan.getAttribute('data-date'));
    
    // Haal alleen de maand op
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = monthNames[scanDate.getMonth()];
    
    currentDateElement.textContent = formattedDate;
}

// Initialiseer de datum met de eerste scan datum
updateCurrentDate();

backButton.addEventListener('click', slideLeft);
nextButton.addEventListener('click', slideRight);

function slideLeft() {
    if (currentScanIndex > 0) {
        console.log("Klikt op back button (left)");
        console.log(currentScanIndex);
        
        currentScanIndex--;
        sliderFrame.scrollLeft -= slideWidth;
        updateCurrentDate(); // Update de datum
    }
    else {
        alert("Er zijn geen eerdere scans")
    }
}

function slideRight() {
    if (currentScanIndex < containerScan.length - 1) {
        console.log("Klikt op next button (right)");
        console.log(currentScanIndex);

        currentScanIndex++;
        sliderFrame.scrollLeft += slideWidth;
        updateCurrentDate(); // Update de datum
    }
    else {
        alert("Er zijn nog geen latere scans")
    }
}

// Event listener om de breedte bij te werken als het venster van grootte verandert
window.addEventListener('resize', () => {
    updateSlideWidth();
    // Zorg ervoor dat de huidige positie correct wordt aangepast
    sliderFrame.scrollLeft = currentScanIndex * slideWidth;
});
