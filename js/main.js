// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Sticky Navigation with Google-style elevation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('elevated');
            } else {
                navbar.classList.remove('elevated');
            }
        }
    });

    // Material Design Ripple Effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Testimonial Slider with Material Design transitions
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
            testimonials[i].style.opacity = '0';
            testimonials[i].style.transform = 'translateX(50px)';
        }
        
        // Function to show a specific slide with smooth transition
        function showSlide(n) {
            // Hide all testimonials
            for (let i = 0; i < testimonials.length; i++) {
                testimonials[i].style.display = 'none';
                testimonials[i].style.opacity = '0';
                testimonials[i].style.transform = 'translateX(50px)';
                dots[i].classList.remove('active');
            }
            
            // Show the selected testimonial
            testimonials[n].style.display = 'block';
            dots[n].classList.add('active');
            
            // Trigger reflow to ensure transition works
            testimonials[n].offsetHeight;
            
            // Animate in the testimonial
            testimonials[n].style.opacity = '1';
            testimonials[n].style.transform = 'translateX(0)';
        }
        
        // Event listeners for previous and next buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = testimonials.length - 1;
                }
                showSlide(currentSlide);
            });
            
            nextBtn.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide >= testimonials.length) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonials.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
        
        // Pause auto-slide when user interacts with controls
        const sliderControls = document.querySelector('.testimonial-controls');
        if (sliderControls) {
            sliderControls.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            sliderControls.addEventListener('mouseleave', function() {
                slideInterval = setInterval(function() {
                    currentSlide++;
                    if (currentSlide >= testimonials.length) {
                        currentSlide = 0;
                    }
                    showSlide(currentSlide);
                }, 5000);
            });
        }
    }

    // Material Design Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const demoForm = document.getElementById('demoForm');
    
    // Function to create and show a Material Design snackbar
    function showSnackbar(message, isError = false) {
        // Remove any existing snackbar
        const existingSnackbar = document.querySelector('.snackbar');
        if (existingSnackbar) {
            existingSnackbar.remove();
        }
        
        // Create new snackbar
        const snackbar = document.createElement('div');
        snackbar.classList.add('snackbar');
        if (isError) {
            snackbar.classList.add('error');
        }
        snackbar.textContent = message;
        
        // Add snackbar to the document
        document.body.appendChild(snackbar);
        
        // Show snackbar
        setTimeout(() => {
            snackbar.classList.add('show');
        }, 10);
        
        // Hide snackbar after 3 seconds
        setTimeout(() => {
            snackbar.classList.remove('show');
            setTimeout(() => {
                snackbar.remove();
            }, 300);
        }, 3000);
    }
    
    // Material Design form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Add event listeners
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Material Design validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                isValid = false;
            } else {
                name.parentElement.classList.remove('error');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.parentElement.classList.add('error');
                isValid = false;
            } else {
                message.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // In a real application, you would send this data to a server
                showSnackbar('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('has-value');
                });
            } else {
                showSnackbar('Please fill in all required fields correctly.', true);
            }
        });
    }
    
    // Demo form submission
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Material Design validation
            const name = document.getElementById('demo-name');
            const email = document.getElementById('demo-email');
            const company = document.getElementById('demo-company');
            const phone = document.getElementById('demo-phone');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                isValid = false;
            } else {
                name.parentElement.classList.remove('error');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }
            
            // Validate company
            if (!company.value.trim()) {
                company.parentElement.classList.add('error');
                isValid = false;
            } else {
                company.parentElement.classList.remove('error');
            }
            
            // Validate phone
            if (!phone.value.trim()) {
                phone.parentElement.classList.add('error');
                isValid = false;
            } else {
                phone.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // In a real application, you would send this data to a server
                showSnackbar('Thank you for requesting a demo! Our team will contact you shortly.');
                demoForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('has-value');
                });
            } else {
                showSnackbar('Please fill in all required fields correctly.', true);
            }
        });
    }

    // Smooth scrolling for anchor links with Material Design easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate scroll position
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll with cubic-bezier easing (Material Design)
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll with Material Design staggered animations
    const animateElements = document.querySelectorAll('.feature-card, .benefit-item, .pricing-card');
    
    function checkIfInView() {
        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Add staggered delay based on element index within its parent
                const siblings = Array.from(element.parentElement.children);
                const siblingIndex = siblings.indexOf(element);
                element.style.transitionDelay = `${siblingIndex * 0.05}s`;
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class to elements in view on page load
    window.addEventListener('load', checkIfInView);
    
    // Add animation class to elements as they come into view on scroll
    window.addEventListener('scroll', checkIfInView);
});

// Add CSS for Material Design animations and effects
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Material Design Transitions */
    .feature-card, .benefit-item, .pricing-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), 
                    transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .feature-card.animate, .benefit-item.animate, .pricing-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Ripple effect for buttons */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    /* Material Design Snackbar */
    .snackbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: #323232;
        color: white;
        padding: 14px 20px;
        border-radius: 4px;
        font-size: 14px;
        min-width: 280px;
        max-width: 90%;
        text-align: center;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        z-index: 1000;
        transition: transform 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .snackbar.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .snackbar.error {
        background-color: #D32F2F;
    }
    
    /* Form validation styles */
    .form-group.error label {
        color: #D32F2F;
    }
    
    .form-group.error input, 
    .form-group.error textarea,
    .form-group.error select {
        border-color: #D32F2F;
    }
    
    .form-group.focused label {
        color: var(--primary-color);
    }
    
    /* Testimonial transitions */
    .testimonial-card {
        transition: opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), 
                    transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    /* Navbar elevation */
    .navbar.elevated {
        box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
        padding: 10px 0;
    }
</style>
`);
