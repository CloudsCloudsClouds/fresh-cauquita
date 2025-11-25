import { useState, useEffect, useRef } from "preact/hooks";
import cauquita_logo from "../assets/cauquita_logo.png";
import boing from "../assets/boing.mp3";

// Set a constant speed for the screensaver effect
const SPEED = 200; // pixels per second

export default function Logito() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  // Start with a diagonal velocity
  const [velocity, setVelocity] = useState({ vx: SPEED, vy: SPEED });
  const [hue, setHue] = useState(0); // For changing color on bounce
  const lastTimeRef = useRef(performance.now());
  const animationFrameIdRef = useRef<number>();
  const componentRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    const audio = new Audio(boing);
    audio.play().catch((e) => console.error("Error playing sound:", e));
  };

  // The click no longer affects physics, just plays a sound for fun
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    playSound();
  };

  useEffect(() => {
    const updatePhysics = (currentTime: DOMHighResTimeStamp) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!componentRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const { innerWidth, innerHeight } = window;
      const { width, height } = componentRef.current.getBoundingClientRect();

      let newVx = velocity.vx;
      let newVy = velocity.vy;
      let newX = position.x + newVx * deltaTime;
      let newY = position.y + newVy * deltaTime;
      let bounced = false;

      // Horizontal bounce
      if (newX + width > innerWidth) {
        newX = innerWidth - width;
        newVx = -Math.abs(newVx); // Ensure it moves left
        bounced = true;
      } else if (newX < 0) {
        newX = 0;
        newVx = Math.abs(newVx); // Ensure it moves right
        bounced = true;
      }

      // Vertical bounce
      if (newY + height > innerHeight) {
        newY = innerHeight - height;
        newVy = -Math.abs(newVy); // Ensure it moves up
        bounced = true;
      } else if (newY < 0) {
        newY = 0;
        newVy = Math.abs(newVy); // Ensure it moves down
        bounced = true;
      }

      if (bounced) {
        playSound();
        // Change color on bounce
        setHue((prevHue) => (prevHue + 60) % 360);
      }

      setPosition({ x: newX, y: newY });
      setVelocity({ vx: newVx, vy: newVy });

      animationFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    // Start the animation loop
    animationFrameIdRef.current = requestAnimationFrame(updatePhysics);

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [position, velocity]); // Rerun effect if state changes from an external source

  return (
    <div
      ref={componentRef}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: "none",
        userSelect: "none",
        width: "120px", // A bit bigger is nice for a screensaver
      }}
    >
      <img
        src={cauquita_logo}
        alt="Cauquita Logo"
        style={{
          width: "100%",
          display: "block",
          filter: `hue-rotate(${hue}deg)`, // Apply color change
        }}
      />
    </div>
  );
}
