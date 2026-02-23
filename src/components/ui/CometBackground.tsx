"use client";
import { useEffect, useRef, useCallback } from "react";

interface Comet {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    speed: number;
    opacity: number;
    width: number;
}

export default function CometBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const cometsRef = useRef<Comet[]>([]);
    const rafRef = useRef<number>(0);
    const dimRef = useRef({ w: 0, h: 0 });

    const createComet = useCallback((w: number, h: number, fromEdge = true): Comet => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;

        let x: number, y: number;
        if (fromEdge) {
            // Spawn from edges
            const side = Math.floor(Math.random() * 4);
            switch (side) {
                case 0: x = Math.random() * w; y = -50; break;      // top
                case 1: x = w + 50; y = Math.random() * h; break;   // right
                case 2: x = Math.random() * w; y = h + 50; break;   // bottom
                default: x = -50; y = Math.random() * h; break;     // left
            }
        } else {
            x = Math.random() * w;
            y = Math.random() * h;
        }

        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 40 + Math.random() * 80,
            speed,
            opacity: 0.08 + Math.random() * 0.15,
            width: 0.5 + Math.random() * 1.5,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dimRef.current = { w, h };
        };

        resize();

        // Initialize comets
        const count = Math.min(25, Math.floor(window.innerWidth / 60));
        cometsRef.current = Array.from({ length: count }, () =>
            createComet(dimRef.current.w, dimRef.current.h, false)
        );

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        const draw = () => {
            const { w, h } = dimRef.current;
            ctx.clearRect(0, 0, w, h);

            // Read accent color from CSS
            const style = getComputedStyle(document.documentElement);
            const accent = style.getPropertyValue("--accent").trim() || "#3B82F6";

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            cometsRef.current.forEach((c, i) => {
                // Gentle mouse influence
                const dx = mx - c.x;
                const dy = my - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250 && dist > 10) {
                    const force = 0.0003 * (250 - dist);
                    c.vx += dx / dist * force;
                    c.vy += dy / dist * force;
                }

                // Normalize velocity to maintain consistent speed
                const currentSpeed = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
                if (currentSpeed > 0) {
                    c.vx = (c.vx / currentSpeed) * c.speed;
                    c.vy = (c.vy / currentSpeed) * c.speed;
                }

                c.x += c.vx;
                c.y += c.vy;

                // Recycle offscreen comets
                const margin = c.length + 100;
                if (c.x < -margin || c.x > w + margin || c.y < -margin || c.y > h + margin) {
                    cometsRef.current[i] = createComet(w, h, true);
                    return;
                }

                // Draw comet tail
                const tailX = c.x - c.vx * c.length;
                const tailY = c.y - c.vy * c.length;

                const gradient = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
                gradient.addColorStop(0, `${accent}00`);
                gradient.addColorStop(1, accent);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(c.x, c.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = c.width;
                ctx.globalAlpha = c.opacity;
                ctx.lineCap = "round";
                ctx.stroke();

                // Small bright head
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.width * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.globalAlpha = c.opacity * 1.5;
                ctx.fill();

                ctx.globalAlpha = 1;
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", resize);
        };
    }, [createComet]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
