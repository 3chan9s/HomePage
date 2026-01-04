window.addEventListener('scroll', function() {
    const header = document.querySelector('.hero-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Slider Logic for Horizontal Scrolling ---
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider-images');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    
    let animationFrameId;
    let isAutoScrolling = true;
    let scrollEndTimer = null;
    let isDragging = false;
    let startX;
    let scrollLeftStart;
    let pageScrollTimer = null;

    // This function runs the animation loop
    function runAutoScroll() {
        if (!isAutoScrolling) return;

        // Scrolling logic
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += 1;
        }

        animationFrameId = requestAnimationFrame(runAutoScroll);
    }

    // Function to start the auto-scrolling
    function startScrolling() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        runAutoScroll();
    }

    // Function to stop the auto-scrolling
    function stopScrolling() {
        isAutoScrolling = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    // Detect page scroll and pause slider auto-scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (Math.abs(window.scrollY - lastScrollY) > 0) {
            stopScrolling();
            clearTimeout(pageScrollTimer);
            pageScrollTimer = setTimeout(startScrolling, 1500);
            lastScrollY = window.scrollY;
        }
    }, { passive: true });

    // Button controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopScrolling();
            slider.scrollBy({ left: -300, behavior: 'smooth' });
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(startScrolling, 3000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopScrolling();
            slider.scrollBy({ left: 300, behavior: 'smooth' });
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(startScrolling, 3000);
        });
    }

    // Mouse drag to scroll
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeftStart = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
        stopScrolling();
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(startScrolling, 2000);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeftStart - walk;
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
        stopScrolling();
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeftStart = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeftStart - walk;
    });

    slider.addEventListener('touchend', () => {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(startScrolling, 2000);
    });

    // Event listener for manual scroll with wheel (trackpad horizontal scroll)
    slider.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > 0) {
            stopScrolling();
            e.preventDefault();
            slider.scrollLeft += e.deltaX * 4;

            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(startScrolling, 1500);
        }
    }, { passive: false });

    // Set cursor style
    slider.style.cursor = 'grab';

    // Kick off the initial automatic scroll
    runAutoScroll();
});
