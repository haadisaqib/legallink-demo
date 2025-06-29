import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(56, 189, 248, ${this.opacity})`; // Accent color
        
        if (canvas) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Wave parameters
    let waveAngle = 0;
    const waveSpeed = 0.02;
    const waveAmplitude = 20;

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(17, 24, 39, 0.2)'; // Dark background with slight transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.01 + waveAngle) * waveAmplitude + canvas.height / 2;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      waveAngle += waveSpeed;

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground; 