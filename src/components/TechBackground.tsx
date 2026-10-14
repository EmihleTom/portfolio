import React, { useEffect, useRef } from 'react';
import { useTheme } from '../utils/themeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  phaseSpeed: number;
}

interface TwinkleNode {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
  maxAlpha: number;
}

/**
 * TechBackground - Modern, executive-grade architectural technical background
 * with tasteful micro-animations:
 * - Subtle breathing ambient glow
 * - Slow, delicate grid coordinate micro-tracer scanline
 * - Twinkling grid intersection beacon nodes (soft pulsing LEDs)
 * - Drifting micro data-particles with occasional hairline telemetry connections
 * - Smooth, damped cursor-following spotlight
 */
export const TechBackground: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth damping
    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initElements();
    };

    // Initialize small, tasteful animated elements
    let particles: Particle[] = [];
    let twinkleNodes: TwinkleNode[] = [];

    const initElements = () => {
      // 1. Drifting micro-particles: 18 to 28 based on screen size
      const particleCount = Math.min(26, Math.max(14, Math.floor(width / 60)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.05, // very gentle upward drift
        radius: Math.random() * 1.2 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.15,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.015 + Math.random() * 0.02,
      }));

      // 2. Twinkling grid nodes aligned to ~56px virtual grid intersections
      const gridSize = 56;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      const nodeCount = Math.min(32, Math.max(16, Math.floor((cols * rows) * 0.04)));
      
      twinkleNodes = Array.from({ length: nodeCount }, () => {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        return {
          x: col * gridSize,
          y: row * gridSize,
          phase: Math.random() * Math.PI * 2,
          speed: 0.012 + Math.random() * 0.02,
          size: Math.random() > 0.6 ? 2.5 : 1.75,
          maxAlpha: Math.random() * 0.45 + 0.25,
        };
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = () => {
      if (!isTabVisible) return;

      const now = performance.now();
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Color palette based on theme
      const primaryRgb = isDark ? '96, 165, 250' : '37, 99, 235'; // blue-400 : blue-600
      const accentRgb = isDark ? '129, 140, 248' : '79, 70, 229';  // indigo-400 : indigo-600
      const cyanRgb = isDark ? '56, 189, 248' : '14, 165, 233';    // sky-400 : sky-500

      // Render 1: Interactive soft cursor spotlight
      if (mouse.isActive) {
        const spotlightRadius = 260;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        grad.addColorStop(
          0,
          isDark ? 'rgba(59, 130, 246, 0.09)' : 'rgba(37, 99, 235, 0.06)'
        );
        grad.addColorStop(
          0.5,
          isDark ? 'rgba(99, 102, 241, 0.04)' : 'rgba(99, 102, 241, 0.03)'
        );
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 2: Twinkling intersection nodes (tiny subtle beacons)
      for (let i = 0; i < twinkleNodes.length; i++) {
        const node = twinkleNodes[i];
        if (!prefersReducedMotion) {
          node.phase += node.speed;
        }
        const pulse = (Math.sin(node.phase) + 1) * 0.5; // 0 to 1
        const alpha = pulse * node.maxAlpha;

        if (alpha > 0.03) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cyanRgb}, ${alpha})`;
          ctx.fill();

          // Tiny crosshair pulse for selected nodes
          if (node.size > 2 && pulse > 0.6) {
            ctx.strokeStyle = `rgba(${primaryRgb}, ${(pulse - 0.6) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x - 3, node.y);
            ctx.lineTo(node.x + 3, node.y);
            ctx.moveTo(node.x, node.y - 3);
            ctx.lineTo(node.x, node.y + 3);
            ctx.stroke();
          }
        }
      }

      // Render 3: Drifting micro data-particles with proximity hairlines
      const maxDistance = 75;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += p.phaseSpeed;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Proximity calculation with mouse spotlight
        let mouseBoost = 0;
        if (mouse.isActive) {
          const dxm = mouse.x - p.x;
          const dym = mouse.y - p.y;
          const distMouse = Math.sqrt(dxm * dxm + dym * dym);
          if (distMouse < 180) {
            mouseBoost = (1 - distMouse / 180) * 0.35;
          }
        }

        const currentAlpha = Math.min(
          0.65,
          p.baseAlpha + Math.sin(p.phase) * 0.1 + mouseBoost
        );

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryRgb}, ${currentAlpha})`;
        ctx.fill();

        // Check for faint connection lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const lineAlpha = (1 - Math.sqrt(distSq) / maxDistance) * 0.12 * (isDark ? 1 : 0.8);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      // Single static render pass for reduced motion
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Precision Static Architectural Grid (Clean Dot Matrix & Hairline Coordinates) */}
      <div
        className="absolute inset-0 opacity-[0.38] dark:opacity-[0.22] transition-opacity duration-500"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(rgba(148, 163, 184, 0.22) 1.25px, transparent 1.25px), linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)`
            : `radial-gradient(rgba(37, 99, 235, 0.16) 1.25px, transparent 1.25px), linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)`,
          backgroundSize: '28px 28px, 112px 112px, 112px 112px',
          maskImage:
            'radial-gradient(ellipse 85% 75% at 50% 30%, black 50%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 30%, black 50%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
        }}
      />

      {/* 2. Slow, Subtle Horizontal Grid Scanline Tracer */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 dark:via-blue-400/35 to-transparent pointer-events-none animate-[grid-scan-line_14s_ease-in-out_infinite]" />

      {/* 3. Subtle Animated Ambient Overhead Light Sheen (Slow Breathing Bloom) */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-[100%] blur-3xl pointer-events-none animate-[ambient-glow-breathe_12s_ease-in-out_infinite]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(99, 102, 241, 0.10) 40%, transparent 75%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.20) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 75%)',
        }}
      />

      {/* 4. Interactive & Micro-Animation Canvas (Twinkling Nodes, Micro-particles, Telemetry) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 5. Subtle Static Radial Depth Vignette for Edge Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 40%, transparent 55%, rgba(11, 15, 23, 0.7) 100%)'
            : 'radial-gradient(circle at 50% 40%, transparent 60%, rgba(248, 250, 252, 0.7) 100%)',
        }}
      />
    </div>
  );
};
