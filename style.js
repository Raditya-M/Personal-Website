// Custom cursor
const cursor = document.getElementById('custom-cursor');
const links = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .social-link');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Navigation active state
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.navbar-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.parentElement.classList.add('active');
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.project-card, .skill-card, .contact-item');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <svg viewBox="0 0 24 24" width="50" height="50" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color); margin-bottom: 15px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out, ${name}. I'll get back to you soon!</p>
        `;
        
        successMessage.style.textAlign = 'center';
        contactForm.appendChild(successMessage);
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            successMessage.remove();
            formGroups.forEach(group => group.style.display = 'block');
            submitBtn.style.display = 'block';
        }, 5000);
    });
}

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-info .title');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});