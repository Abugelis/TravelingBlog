const galleryImages = document.querySelectorAll(".gallery-page-grid img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxCounter = document.querySelector(".lightbox-counter");
const lightboxCloseBtn = document.querySelector(".lightbox-close-btn");
const lightboxOverlay = document.querySelector(".lightbox-overlay");
const prevBtn = document.querySelector(".lightbox-prev-btn");
const nextBtn = document.querySelector(".lightbox-next-btn");

// Keep track of current index
let currentIndex = 0;

// Attach event listener to every image and open lightbox if click detected
if (galleryImages.length > 0) {
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            openLightbox(index);
        });
    });
}

// Display lightbox with selected image, caption and counter. Lock scrolling
function openLightbox(index) {
    currentIndex = index;
    const img = galleryImages[index];

    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.dataset.caption || "";
    lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
}

// Close lightbox
function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
}

// Close lightbox if X is clicked
if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener("click", closeLightbox);
}
// Close lightbox if overlay detects click
if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", closeLightbox)
}

// Swich images while lightbox is already open
function showImage(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentIndex = index;

    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.dataset.caption || "";
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
}

// Open previous/next image upon navigation arrow click
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Mobile swipe support
let startX = 0;

lightboxImg.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

lightboxImg.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
        if (diff < 0) showImage(currentIndex + 1); // swipe left
        else showImage(currentIndex - 1);         // swipe right
    }
});