import './nav.js';

const track = document.querySelector(".about-carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".about-carousel-btn-prev");
const nextBtn = document.querySelector(".about-carousel-btn-next");

let slideWidth = slides[0].getBoundingClientRect().width;
let slideIndex = 0;    // Current slide index (no clones)
let isSliding = false; // Prevents rapid clicks during transitiona
let slideTimer;        // Autoplay timer referance

// Clone first and last slides for "infinite" looping
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Add clones to back and front of the track
track.appendChild(firstClone);                  // Clone of first slide at the end
track.insertBefore(lastClone, slides[0]);       // Clone of last slide at the start

// Array of all slides (clones included)
const allSlides = Array.from(track.children);

// Handle resize to keep correct slide positioning
window.addEventListener("resize", ()=> {
    slideWidth = slides[0].getBoundingClientRect().width;

    // Disable transition to avoid visible jump
    track.style.transition = "none";

    //Reposition to the correct slide
    track.style.transform = `translateX(-${(slideIndex + 1) * slideWidth}px)`;
});

// Moves the carousel to a specific slide
function moveToSlide(index) {
    if(isSliding) return;
    isSliding = true;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${(slideIndex + 1) * slideWidth}px)`;
}

// After each transition check if it's on a clone
track.addEventListener ("transitionend", ()=> {
    // If it's a cloned first slide, jump to real first slide
    if (allSlides[slideIndex + 1] === firstClone) {
        track.style.transition = "none";
        slideIndex = 0;
        track.style.transform = `translateX(-${(slideIndex + 1) * slideWidth}px)`;
    }
    // if it's a cloned last slide, jump to the real last slide
    if (allSlides [slideIndex + 1] === lastClone) {
        track.style.transition = "none";
        slideIndex = slides.length - 1;
        track.style.transform = `translateX(-${(slideIndex + 1) * slideWidth}px)`;
    }
    isSliding = false;
});

// Next button
nextBtn.addEventListener("click", ()=> {
    if (isSliding) return;
    slideIndex++;
    moveToSlide(slideIndex);
    resetAutoPlay();
});

// Previous button
prevBtn.addEventListener("click", ()=>{
    if(isSliding) return;
    slideIndex--;
    moveToSlide(slideIndex);
    resetAutoPlay();
});

// Starts automatic slide rotation
function startAutoPlay() {
    slideTimer = setTimeout(()=>{
        slideIndex++;
        moveToSlide(slideIndex);
        startAutoPlay();
    },5000);
}

// Resets autoplay when user clicks a button
function resetAutoPlay() {
    clearTimeout(slideTimer);
    startAutoPlay();
}

// Initialize autoplay
startAutoPlay();