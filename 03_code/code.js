
// Variablen ---------------------------------------------------->
const startBtn = document.querySelector(".start-btn");
const soundBtn = document.querySelector(".sound-btn");

let screen = document.querySelector(".screen");
let screenWidth = screen.clientWidth;
let screenHeight = screen.clientHeight;

let street = document.querySelector(".street");
let lineCount = 1;

let carTopCount = 1;
let carBottomCount = 1;
let carPicCount = 1;

let answerBox = document.querySelector(".answer");
let axa = document.querySelector(".axa-logo");
let axaText = document.querySelector(".axa-text");
let batman = document.querySelector(".batman");
let batmanText = document.querySelector(".batman-text");
let ghost = document.querySelector(".ghost");
let ghostText = document.querySelector(".ghost-text");
let circle = document.querySelector(".circle");

// Sound -------------------------------------------------------->

let trafficSound = new Howl({
    src: ["04_sound/01_traffic.wav"],
    onend: function(){
        crashSound.play()
    }
});

let crashSound = new Howl({
    src: ["04_sound/02_crash.wav"],
    onend: function(){
       dunDunSound.play();
    }
});

let dunDunSound = new Howl({
    src: ["04_sound/04_dun_dun.mp3"],
    volume: 0.7
});

let badSound = new Howl({
    src: ["04_sound/05_bad.mp3"],
    volume: 0.3
});

let goodSound = new Howl({
    src: ["04_sound/06_good.mp3"],
    volume: 1
});

let heroSound = new Howl({
    src: ["04_sound/07_hero.mp3"]
});


// Strassenlinien kreieren -------------------------------------->
for(let i = 0; i < 5; i++){

    let streetLine = document.createElement("div");

    streetLine.classList.add("line");
    streetLine.classList.add("line" + lineCount++);

    street.appendChild(streetLine);
};


// Sterne kreieren ----------------------------------------------->
for(let i = 0; i < 50; i++){
    let stars = document.createElement("div");

    stars.classList.add("star");

    let starPosX = Math.floor(Math.random() * Math.floor(screenWidth));
    let starPosY = Math.floor(Math.random() * Math.floor(screenHeight / 2));

    stars.style.left = starPosX + "px";
    stars.style.top = starPosY + "px";

    screen.appendChild(stars);
};


// Autos kreieren ------------------------------------------------->
// Obere Autos
for(let i = 0; i < 3; i++){
    let carTop = document.createElement("img");

    carTop.classList.add("car");
    carTop.classList.add("car-top");
    carTop.classList.add("car-top" + carTopCount++);

    carTop.setAttribute("src", "01_pics/car" + carPicCount++ + ".png");

    street.appendChild(carTop);
};

// Untere Autos
for(let i = 0; i < 3; i++){
    let carBottom = document.createElement("img");

    carBottom.classList.add("car");
    carBottom.classList.add("car-bottom");
    carBottom.classList.add("car-bottom" + carBottomCount++);

    carBottom.setAttribute("src", "01_pics/car" + carPicCount++ + ".png");

    street.appendChild(carBottom);
};


// Timelines ------------------------------------------------------->
// Autos
let carTl = gsap.timeline();

carTl.
to(".car-top1", {
    x: screenWidth + (screenWidth / 4),
    duration: 8,
    ease: "none"
})

.to(".car-top2",{
    x: screenWidth + (screenWidth / 4),
    duration: 5,
    ease: "none"
}, "-=5") 

.to(".car-top3", {
    x: screenWidth + (screenWidth / 4),
    duration: 9,
    ease: "none"
}, "-=5")

.fromTo(".car-bottom1", {
    x: screenWidth
}, {
    x:  - screenWidth + (screenWidth / 4), 
    duration: 5,
    ease: "none"
}, "-=8")

.fromTo(".car-bottom2", {
    x: screenWidth
}, {
    x: - screenWidth + (screenWidth / 4), 
    duration: 8,
    ease: "none"
}, "-=5")

.fromTo(".car-bottom3", {
    x: screenWidth
}, {
    x: - screenWidth + (screenWidth / 4), 
    duration: 10,
    ease: "none"
}, "-=5");


// Himmel ------------------------------------------------------>
let skyTl = gsap.timeline();

skyTl.
to(screen, {
    background: 'rgb(4, 4, 196)',
    duration: 15
})

.fromTo(".star", {
    opacity: 0
}, {
    opacity: 1,
    duration: 15
}, "-=15")

.to(".moon", {
    y: - screenHeight + (screenHeight / 4),
    duration: 15
}, "-=15");

// Crash
let crashTl = gsap.timeline({delay: 10});

crashTl.
fromTo(".crash-green", {
    x: -screenWidth + (screenWidth / 4)
}, {
    x: screenWidth / 5,
    duration: 5,
    ease: "bounce"
})

.fromTo(".crash-red", {
    x: screenWidth
}, {
    x: screenWidth / 3,
    duration: 5,
    ease: "bounce"
}, "-=5")

.fromTo(".flames",{
    x : screenWidth / 3,
    opacity: 0
}, {
    opacity: 1,
    duration: 1
})

.to(".handy", {
    y: - (screenHeight / 1.5),
    duration: 2
});

// Hilfe rufen ------------------------------------------------->
let helpTl = gsap.timeline({delay: 2});

helpTl

.fromTo(".scheinwerfer",{
    opacity: 0
}, {
    opacity: 1,
    duration: 3
})

.to(".handy", {
    y: + (screenHeight / 1.5),
    duration: 2
}, "-=1.5")

.to(".crash", {
    opacity: 0,
    duration: 2
})

.fromTo(".handshake", {
    opacity: 0
}, {
    opacity: 1,
    duration: 3
})

.to(".handshake", {
    opacity: 0,
    duration: 3
})

.to(".spot", {
    opacity: 0,
    duration: 3
})

.to(".spot-axa", {
    y: screenHeight / 5,
    x: - (screenWidth / 11),
    borderRadius: 0,
    width: "300px",
    duration: 3
})

.to(".end-text", {
    duration: 2,
    display: "block",
    text: "für alle fälle",
})

.to(".pointer", {
    display: "block",
    duration: 1
})



// Pausierte Timelines ----------------------------------------->
carTl.pause();
skyTl.pause();
crashTl.pause();
helpTl.pause();

// Events ------------------------------------------------------> 
soundBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSound(soundBtn);
});

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Starte Animation");
    trafficSound.play()
    gsap.to(startBtn, {x: "-20vmax", duration: 2})
    carTl.play();
    skyTl.play();
    crashTl.play();


});

axa.addEventListener("click", () => {
    showText(axaText, batmanText, ghostText);
    circle.style.display = "block";
    batman.style.display = "none";
    ghost.style.display = "none";
    goodSound.play();
    heroSound.play();
    helpTl.play();
});
   
batman.addEventListener("click", () => {
    showText(batmanText, ghostText, axaText);
    badSound.play();
});

ghost.addEventListener("click", () => {
    showText(ghostText, axaText, batmanText);
    badSound.play();
});

// Funktionen --------------------------------------------------->

// Text auf Handy
function showText(text1, text2, text3){

    text1.style.display = "block";
    text2.style.display = "none";
    text3.style.display = "none";
}

// Soundbutton Toggle
function toggleSound(button){
       
    if(button.value === "on"){
        button.value = "off";
        let iconOff = document.createElement("i");
        iconOff.classList.add("fas");
        iconOff.classList.add("fa-volume-mute");
        soundBtn.removeChild(soundBtn.childNodes[0]);
        soundBtn.appendChild(iconOff);

        trafficSound.mute(true);
        crashSound.mute(true);
        dunDunSound.mute(true);
        badSound.mute(true);
        goodSound.mute(true);
        heroSound.mute(true);

    }else{
        button.value = "on";
        let iconOn = document.createElement("i");
        iconOn.classList.add("fas");
        iconOn.classList.add("fa-volume-up");
        soundBtn.removeChild(soundBtn.childNodes[0]);
        soundBtn.appendChild(iconOn);

        trafficSound.mute(false);
        crashSound.mute(false);
        dunDunSound.mute(false);
        badSound.mute(false);
        goodSound.mute(false);
        heroSound.mute(false);
    }
}
