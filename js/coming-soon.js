document.addEventListener('DOMContentLoaded', function() {
    // Hide particles container (removing animations as requested)
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
    
    // Check if Tally is loaded
    if (window.Tally) {
        console.log('Tally is loaded and ready to use');
        
        // You can add custom event listeners for Tally events
        document.querySelectorAll('.tally-popup').forEach(button => {
            button.addEventListener('click', function(e) {
                console.log('Tally popup button clicked');
                // You can add custom tracking or analytics code here
            });
        });
    } else {
        console.log('Tally is not yet loaded');
        
        // Fallback for when Tally isn't loaded
        document.querySelectorAll('.tally-popup').forEach(button => {
            button.addEventListener('click', function(e) {
                if (!window.Tally) {
                    e.preventDefault();
                    alert('Our form system is currently loading. Please try again in a moment.');
                }
            });
        });
    }
});
