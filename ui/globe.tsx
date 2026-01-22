"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export function Globe({ className, size = 400, opacity = 0.15 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let rotation = 0;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Generate random points for "cities"
    const points: { lat: number; lon: number }[] = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        lat: (Math.random() - 0.5) * Math.PI,
        lon: Math.random() * Math.PI * 2,
      });
    }

    // Generate arcs between random points
    const arcs: { from: number; to: number; progress: number }[] = [];
    for (let i = 0; i < 8; i++) {
      arcs.push({
        from: Math.floor(Math.random() * points.length),
        to: Math.floor(Math.random() * points.length),
        progress: Math.random(),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Draw globe outline
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = centerY + radius * Math.sin(latRad);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.sin(lonRad)), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw points
      points.forEach((point) => {
        const lon = point.lon + rotation * 0.01;
        const x = centerX + radius * Math.cos(point.lat) * Math.sin(lon);
        const y = centerY + radius * Math.sin(point.lat);
        const z = Math.cos(point.lat) * Math.cos(lon);
        
        if (z > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * z * 2})`;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw arcs
      arcs.forEach((arc) => {
        const from = points[arc.from];
        const to = points[arc.to];
        const lon1 = from.lon + rotation * 0.01;
        const lon2 = to.lon + rotation * 0.01;
        
        const x1 = centerX + radius * Math.cos(from.lat) * Math.sin(lon1);
        const y1 = centerY + radius * Math.sin(from.lat);
        const z1 = Math.cos(from.lat) * Math.cos(lon1);
        
        const x2 = centerX + radius * Math.cos(to.lat) * Math.sin(lon2);
        const y2 = centerY + radius * Math.sin(to.lat);
        const z2 = Math.cos(to.lat) * Math.cos(lon2);
        
        if (z1 > -0.2 && z2 > -0.2) {
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 30;
          
          ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * Math.min(z1, z2) * 1.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(midX, midY, x2, y2);
          ctx.stroke();
        }
        
        arc.progress += 0.005;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.from = Math.floor(Math.random() * points.length);
          arc.to = Math.floor(Math.random() * points.length);
        }
      });

      rotation += 0.3;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
      style={{ width: size, height: size }}
    />
  );
}
