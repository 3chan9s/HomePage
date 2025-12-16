window.addEventListener('scroll', function() {
    const header = document.querySelector('.hero-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Slider Logic for Horizontal Scrolling ---
document.querySelectorAll('.slider-images').forEach(slider => {
    let animationFrameId;
    let isAutoScrolling = true;
    let scrollEndTimer = null;

    // This function runs the animation loop
    function runAutoScroll() {
        if (!isAutoScrolling) return; // Stop the loop if the flag is false

        // Scrolling logic
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += 1; // Adjust speed by changing this value
        }

        // Request the next frame
        animationFrameId = requestAnimationFrame(runAutoScroll);
    }

    // Function to start the auto-scrolling
    function startScrolling() {
        if (isAutoScrolling) return; // Don't start if already running
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

    // Event listener for manual scroll
    slider.addEventListener('wheel', (e) => {
        // We only care about horizontal wheel movements to scroll the slider
        if (e.deltaX !== 0) {
            stopScrolling(); // Immediately stop the auto-scroll animation
            e.preventDefault(); // Prevent any other default action
            slider.scrollLeft += e.deltaX * 3; // Apply the manual horizontal scroll with speed factor

            // Set a timer to restart auto-scrolling after user has stopped scrolling
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(startScrolling, 150); // 0.15 second delay
        }
        // If e.deltaX is 0, we do nothing, allowing normal vertical page scrolling
    });

    // Kick off the initial automatic scroll
    runAutoScroll();
});
