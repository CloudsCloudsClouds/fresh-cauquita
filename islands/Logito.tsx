import { useState, useEffect, useRef } from "preact/hooks";
import cauquita_logo from "../assets/cauquita_logo.png";
import boing from "../assets/boing.mp3";

const GRAVITY = 400; // A bit more gravity to feel weighty
const RESTITUTION = 0.8; // Bounciness factor (80% energy retention)
const UPWARD_FORCE_MAGNITUDE = -300; // Negative for upward direction

export default function Logito() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ vx: 50, vy: 0 }); // Start with some initial horizontal velocity
  const lastTimeRef = useRef(performance.now());
  const animationFrameIdRef = useRef<number>();
  const componentRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    const audio = new Audio(boing);
    audio.play().catch((e) => console.error("Error playing sound:", e));
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevents clicks from bubbling up
    playSound();
    // Apply upward force
    setVelocity((v) => ({ ...v, vy: v.vy + UPWARD_FORCE_MAGNITUDE }));
  };

  useEffect(() => {
    const updatePhysics = (currentTime: DOMHighResTimeStamp) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!componentRef.current) return;

      const { innerWidth, innerHeight } = window;
      const { width, height } = componentRef.current.getBoundingClientRect();

      // Apply gravity
      setVelocity((v) => ({ ...v, vy: v.vy + GRAVITY * deltaTime }));

      // Update position
      setPosition((p) => ({
        x: p.x + velocity.vx * deltaTime,
        y: p.y + velocity.vy * deltaTime,
      }));

      // Collision detection and response
      setPosition((p) => {
        let newX = p.x;
        let newY = p.y;
        let newVx = velocity.vx;
        let newVy = velocity.vy;
        let bounced = false;

        // Horizontal bounce
        if (p.x + width > innerWidth) {
          newX = innerWidth - width;
          newVx = -velocity.vx * RESTITUTION;
          bounced = true;
        } else if (p.x < 0) {
          newX = 0;
          newVx = -velocity.vx * RESTITUTION;
          bounced = true;
        }

        // Vertical bounce
        if (p.y + height > innerHeight) {
          newY = innerHeight - height;
          newVy = -velocity.vy * RESTITUTION;
          bounced = true;
        } else if (p.y < 0) {
          newY = 0;
          newVy = -velocity.vy * RESTITUTION;
          bounced = true;
        }

        if (bounced) {
          playSound();
        }

        setVelocity({ vx: newVx, vy: newVy });
        return { x: newX, y: newY };
      });

      animationFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameIdRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [velocity]); // Re-run effect if velocity state changes

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
        touchAction: "none", // Good for mobile to prevent scrolling
        userSelect: "none", // Prevents text selection on rapid clicks
        width: "100px", // Set a fixed size for consistent physics
      }}
    >
      <img
        src={cauquita_logo}
        alt="Cauquita Logo"
        style={{
          width: "100%",
          display: "block", // Prevents small gap below image
        }}
      />
    </div>
  );
}
