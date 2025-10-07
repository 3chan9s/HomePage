window.addEventListener('scroll', function() {
    const header = document.querySelector('.hero-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Slider Logic ---
document.querySelectorAll('.slider-container').forEach(slider => {
    const images = slider.querySelectorAll('.slider-image');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let currentIndex = 0;
    let autoplayInterval = null;

    function updateSlider() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    function startAutoplay() {
        if (autoplayInterval) return; // Prevent multiple intervals
        autoplayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay(); // Stop autoplay when user interacts manually
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay(); // Stop autoplay when user interacts manually
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Initialize
    updateSlider();
    startAutoplay();
});
