// Main JavaScript for SpeedStack Coming Soon Page

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const form = document.getElementById('subscription-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate form submission (would be replaced with actual API call)
        formMessage.innerHTML = `<div class="text-white">Thanks! We'll notify you at ${email}</div>`;
        formMessage.style.opacity = '0';
        
        // Fade in the message
        setTimeout(() => {
          formMessage.style.transition = 'opacity 0.5s ease';
          formMessage.style.opacity = '1';
        }, 100);
        
        // Reset form
        this.reset();
        
        // Clear message after some time
        setTimeout(() => {
          formMessage.style.opacity = '0';
          setTimeout(() => {
            formMessage.innerHTML = '';
          }, 500);
        }, 5000);
      });
    }
    
    // Add parallax effect to light bulb
    const lightBulb = document.querySelector('.light-bulb-container');
    
    if (lightBulb) {
      document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Subtle movement based on mouse position
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        lightBulb.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }
    
    // Text animation for coming soon text
    const comingSoon = document.querySelector('.coming-soon');
    
    if (comingSoon) {
      comingSoon.addEventListener('mouseover', function() {
        this.style.transform = 'perspective(500px) rotateX(10deg)';
        this.style.transition = 'transform 0.5s ease';
      });
      
      comingSoon.addEventListener('mouseout', function() {
        this.style.transform = 'perspective(500px) rotateX(0deg)';
      });
    }
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--transition-normal', '0s');
      
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.append(style);
    }
  });