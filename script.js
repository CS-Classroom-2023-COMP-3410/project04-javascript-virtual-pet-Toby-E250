const feedBtn = document.getElementById("feed-button");
const playBtn = document.getElementById("play-button");
const sleepBtn = document.getElementById("sleep-button");

const petImg = document.querySelector('#pet img');

const hungerEl = document.getElementById("hunger-level");
const happinessEl = document.getElementById("happiness-level");
const energyEl = document.getElementById("energy-level");

let hunger = 100;
let happiness = 100;
let energy = 100;

// Load saved stats from localStorage
const savedPet = JSON.parse(localStorage.getItem("petStats"));

if (savedPet && Math.min(savedPet.hunger, savedPet.happiness, savedPet.energy)!=0) {
    hunger = savedPet.hunger;
    happiness = savedPet.happiness;
    energy = savedPet.energy;
}

updateStats();
updateBackground();


// Save stats before window unloads
function saveStats() {
    localStorage.setItem("petStats", JSON.stringify({
        hunger,
        happiness,
        energy
    }));
}

function timerTick() {
    //choses random ammount to decrease stat
    let amountLost = Math.floor((Math.random())*4); 

    //choses which stat to decrease
    test = (Math.random())*10
    if (test < 3.33) {
        hunger = Math.max(0, hunger - amountLost);
    } else if (test < 6.66) {
    happiness = Math.max(0, happiness - amountLost);
    } else {
    energy = Math.max(0, energy - amountLost);
    }

    //updates everything
    updateStats();
    updateBackground();
    checkDeath()
    saveStats();
}

//visually updates stats
function updateStats() {

    //hunger status update
    if (hunger > 80) {
        hungerEl.textContent = "Full"
    }
    if (hunger < 80 && hunger >= 50) {
        hungerEl.textContent = "Satisfied"
    }
    if (hunger < 50 && hunger >= 20) {
        hungerEl.textContent = "Hungry"
    }
    if (hunger < 20) {
        hungerEl.textContent = "Starving"
    }
    if (hunger === 0) {
        hungerEl.textContent = "Death by hungry"
    }

    //happiness status update
    if (happiness > 80) {
        happinessEl.textContent = "Happiest"
    }
    if (happiness < 80 && happiness >= 50) {
        happinessEl.textContent = "Happy"
    }
    if (happiness < 50 && happiness >= 20) {
        happinessEl.textContent = "Lonely"
    }
    if (happiness < 20) {
        happinessEl.textContent = "Depressed"
    }
    if (happiness === 0) {
        happinessEl.textContent = "Death by sad"
    }

    //energy status update
    if (energy > 80) {
        energyEl.textContent = "Energized"
    }
    if (energy < 80 && energy >= 50) {
        energyEl.textContent = "Awake"
    }
    if (energy < 50 && energy >= 20) {
        energyEl.textContent = "Tired"
    }
    if (energy < 20) {
        energyEl.textContent = "eepy peepy lemon squeepy"
    }
    if (energy === 0) {
        energyEl.textContent = "Death by tired"
    }
}

//checks if dead
function checkDeath() {
    if (hunger <= 0 || happiness <= 0 || energy <= 0) {
        petImg.style.transform = 'rotate(90deg)';
    }    
}

//updates background color based off lowest stat
function updateBackground() {
    let lowest = Math.min(hunger, happiness, energy);

    let green = Math.floor((lowest / 100) * 255);
    let red = 255 - green;

    document.body.style.backgroundColor = `rgb(${red}, ${green}, 0)`;
}

//feed event listener
feedBtn.addEventListener("click", () => {
    console.log("Feed clicked!");
    if (hunger < 90) {
        hunger += 10;
    }
    else {
        hunger = 100;
    }
    updateStats();
});

//play event listener
playBtn.addEventListener("click", () => {
    console.log("Play clicked!");
    if (happiness < 90) {
        happiness += 10;
    }
    else {
        happiness = 100;
    }
    updateStats();  
});

//sleep event listener
sleepBtn.addEventListener("click", () => {
    console.log("Sleep clicked!");
    if (energy < 90) {
        energy += 10;
    }
    else {
        energy = 100;
    }
    updateStats();
});

// Decrease stats on timer
setInterval(timerTick, 60000);

