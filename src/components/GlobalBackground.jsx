import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  const mouseSpringX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseSpringY = useSpring(0, { stiffness: 100, damping: 30 });

  // Update mouse position globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseSpringX.set(e.clientX);
      mouseSpringY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseSpringX, mouseSpringY]);

  // Canvas Ambient Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 10; // strictly 10 visible particles

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.1; // extremely slow
        this.speedY = (Math.random() - 0.5) * 0.1; // extremely slow
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around boundaries
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`; // emerald tint
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-50] w-full h-full bg-[#050816] pointer-events-none overflow-hidden select-none">
      
      {/* Subtle Engineering Grid - 5% opacity */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:50px_50px]" 
        style={{ opacity: 0.05 }} 
      />

      {/* Global Canvas Ambient Particles (Max 10) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Global Mouse Radial Glow - exactly 6% opacity */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: mouseSpringX,
          y: mouseSpringY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.03) 40%, rgba(5,8,22,0) 70%)',
          mixBlendMode: 'screen',
        }}
      />
      
    </div>
  );
};

export default GlobalBackground;
