"use client";

import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { Post, PostCard } from "./PostCard";

type Glow = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
  life: number; // زمان باقی‌مانده
};

export default function MagicalCursorPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowsRef = useRef<Glow[]>([]);

  // fetch داده‌ها
  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // init canvas و animate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      glowsRef.current.forEach((glow, idx) => {
        // کاهش life و opacity
        glow.life -= 1;
        glow.opacity = Math.max(0, glow.life / 60); // fade out نرم
        glow.radius += 0.3; // شعاع کم کم افزایش پیدا کند

        if (glow.opacity <= 0) {
          glowsRef.current.splice(idx, 1);
        } else {
          const gradient = ctx.createRadialGradient(
            glow.x,
            glow.y,
            0,
            glow.x,
            glow.y,
            glow.radius,
          );
          gradient.addColorStop(
            0,
            glow.color.replace("0.6", glow.opacity.toString()),
          );
          gradient.addColorStop(1, "rgba(128,128,128,0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // mousemove -> ایجاد glow جدید
  useEffect(() => {
    const colors = [
      "rgba(255, 223, 0,0.6)",
      "rgba(255, 165, 0,0.6)",
      "rgba(0, 123, 255,0.6)",
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const newGlow: Glow = {
        x: e.clientX + (Math.random() - 0.5) * 30, // کمی پراکندگی
        y: e.clientY + (Math.random() - 0.5) * 30,
        radius: 20 + Math.random() * 20,
        opacity: 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60, // 1 ثانیه تقریبا
      };
      glowsRef.current.push(newGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-300 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="relative max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
          صفحه تعاملی جادویی
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
