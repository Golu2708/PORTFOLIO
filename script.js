document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle hamburger to X
            const spans = this.querySelectorAll('span');
            if (spans.length) {
                if (nav.classList.contains('active')) {
                    spans[
                        0
                    ].style.transform = 'rotate(45deg) translate(5px,
                    5px)';
                    spans[
                        1
                    ].style.opacity = '0';
                    spans[
                        2
                    ].style.transform = 'rotate(-45deg) translate(5px,
                    -5px)';
                } else {
                    spans[
                        0
                    ].style.transform = 'none';
                    spans[
                        1
                    ].style.opacity = '1';
                    spans[
                        2
                    ].style.transform = 'none';
                }
            }
        });
    }
    // Close mobile menu when clicking outside
    if (nav && mobileMenuBtn) {
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && !event.target.closest('.nav') && !event.target.closest('.mobile-menu-btn')) {
                nav.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                if (spans.length) {
                    spans[
                        0
                    ].style.transform = 'none';
                    spans[
                        1
                    ].style.opacity = '1';
                    spans[
                        2
                    ].style.transform = 'none';
                }
            }
        });
    }
    // Add sticky header behavior
    const header = document.querySelector('.header');
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 15px rgba(0,
                0,
                0,
                0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0,
                0,
                0,
                0.1)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"
    ]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If mobile menu is open, close it
                if (nav && nav.classList.contains('active') && mobileMenuBtn) {
                    nav.classList.remove('active');
                    
                    // Reset hamburger icon
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    if (spans.length) {
                        spans[
                            0
                        ].style.transform = 'none';
                        spans[
                            1
                        ].style.opacity = '1';
                        spans[
                            2
                        ].style.transform = 'none';
                    }
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nameInput = this.elements.name;
            const emailInput = this.elements.email;
            const subjectInput = this.elements.subject;
            const messageInput = this.elements.message;
            
            if (!nameInput || !emailInput || !messageInput) {
                console.error('Form is missing required fields');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput.value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                showFormError('Please fill in all required fields', contactForm);
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormError('Please enter a valid email address', contactForm);
                return;
            }
            // Here you would typically send this data to a server
            console.log('Form submitted with:',
            { name, email, subject, message
            });
            
            // Show success message
            showFormSuccess(contactForm);
            
            // Reset form
            this.reset();
        });
    }
    
    function showFormError(message, form) {
        if (!form) return;
        
        // Check if error message already exists
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.marginTop = '15px';
        errorDiv.style.fontWeight = '500';
        errorDiv.textContent = message;
        
        const submitButton = form.querySelector('.form-button');
        if (submitButton) {
            submitButton.parentNode.insertBefore(errorDiv, submitButton.nextSibling);
        } else {
            form.appendChild(errorDiv);
        }
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        },
        3000);
    }
    
    function showFormSuccess(form) {
        if (!form) return;
        
        // Check if success message already exists
        const existingSuccess = form.querySelector('.form-success');
        if (existingSuccess) existingSuccess.remove();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.color = '#2ecc71';
        successDiv.style.marginTop = '15px';
        successDiv.style.fontWeight = '500';
        successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
        
        const submitButton = form.querySelector('.form-button');
        if (submitButton) {
            submitButton.parentNode.insertBefore(successDiv, submitButton.nextSibling);
        } else {
            form.appendChild(successDiv);
        }
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        },
        5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@
        ]+@[^\s@
        ]+\.[^\s@
        ]+$/;
        return emailRegex.test(email);
    }
    // Animate elements on scroll using Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Elements to animate
        const animateElements = document.querySelectorAll('.project-card, .about-image-container, .skill-item, .contact-form, .contact-info');
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // Add staggered delay to project cards for a nicer animation
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1
            }s`;
        });
        
        // Add class when element comes into view
        document.addEventListener('scroll', function() {
            const viewElements = document.querySelectorAll('.in-view');
            if (viewElements.length) {
                viewElements.forEach(element => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            }
        });
        
        // Trigger initial check for elements in view
        document.dispatchEvent(new Event('scroll'));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const animateElements = document.querySelectorAll('.project-card, .about-image-container, .skill-item, .contact-form, .contact-info');
        
        animateElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
});