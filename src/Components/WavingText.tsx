"use client";
import { useState, useRef, useEffect } from "react";

export default function WavingText({ text, className }: { text: string; className?: string }) {
    const [isWaving, setIsWaving] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationEndRef = useRef<number>(0);
    const cooldown = 1800; // Matches animation duration

    const startWaving = () => {
        // Clear any pending timeouts
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Force restart animation by briefly toggling state
        setIsWaving(false);
        setTimeout(() => setIsWaving(true), 10);

        // Set timeout to match animation duration
        timeoutRef.current = setTimeout(() => {
            setIsWaving(false);
        }, cooldown);

        animationEndRef.current = Date.now() + cooldown;
    };

    const handleMouseEnter = () => {
        startWaving();
    };

    const handleMouseMove = () => {
        // Only restart animation if previous animation has completed
        if (Date.now() > animationEndRef.current) {
            startWaving();
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsWaving(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <span
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className || ""}
            role="img"
            aria-label="waving hand"
        >
            {text} {" "} <span className={`waving-hand ${isWaving ? "waving" : ""}`}>👋🏼</span>
        </span>
    );
}
