// Particles animation
class ParticleCanvas {
    constructor() {
      this.canvas = document.getElementById('particles');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 80;
      this.colors = ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)'];
      
      this.init();
      this.animate();
      
      window.addEventListener('resize', () => this.resize());
    }
    
    init() {
      this.resize();
      
      // Create particles
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 4 + 1,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    }
    
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      // Resize existing particles
      if (this.particles.length > 0) {
        for (let i = 0; i < this.particles.length; i++) {
          if (this.particles[i].x > this.canvas.width) {
            this.particles[i].x = Math.random() * this.canvas.width;
          }
          if (this.particles[i].y > this.canvas.height) {
            this.particles[i].y = Math.random() * this.canvas.height;
          }
        }
      }
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`);
        this.ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > this.canvas.width) {
          p.speedX = -p.speedX;
        }
        if (p.y < 0 || p.y > this.canvas.height) {
          p.speedY = -p.speedY;
        }
        
        // Randomize movement occasionally
        if (Math.random() < 0.01) {
          p.speedX = Math.random() * 0.5 - 0.25;
          p.speedY = Math.random() * 0.5 - 0.25;
        }
        
        // Randomly change opacity for twinkling effect
        if (Math.random() < 0.01) {
          p.opacity = Math.random() * 0.5 + 0.3;
        }
      }
      
      // Connect nearby particles with lines
      this.connectParticles();
      
      requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
      const maxDistance = 150;
      
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate line opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }
      }
    }
  }
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      new ParticleCanvas();
  
      // hide loader AFTER canvas is initialized
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 1000); // delay 2 seconds
  });
  