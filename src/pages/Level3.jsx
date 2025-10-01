"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Level3({ onNext }) {
  const MAZE_SIZE = 400; // in px
  const PLAYER_SIZE = 20;

  // Maze walls as lines: [x1, y1, x2, y2]
  // Replace initialWalls with more complex layout
  const initialWalls = [
    // Outer border
    [0, 0, 400, 10],
    [0, 0, 10, 400],
    [0, 390, 400, 400],
    [390, 0, 400, 400],

    // Horizontal walls with gaps
    [50, 50, 150, 60], // left part of top wall
    [200, 50, 350, 60], // right part, gap in between
    [60, 120, 190, 130],
    [210, 120, 340, 130],

    [50, 200, 120, 210],
    [180, 200, 350, 210],

    [100, 280, 180, 290],
    [220, 280, 300, 290],

    // Vertical walls with gaps
    [60, 60, 70, 110], // left vertical wall, top gap
    [60, 140, 70, 200], // bottom part, leaving gap 110–140

    [190, 60, 200, 110],
    [190, 140, 200, 200],

    [250, 60, 260, 110],
    [250, 140, 260, 200],

    [340, 60, 350, 130],
  ];

  const [player, setPlayer] = useState({ x: 70, y: 70 });
  const [walls, setWalls] = useState(initialWalls);
  const [rotation, setRotation] = useState(0);
  const [win, setWin] = useState(false);
  const goal = { x: 330, y: 330 };

  const collides = (pos) => {
    for (let w of walls) {
      const [x1, y1, x2, y2] = w;
      if (
        pos.x + PLAYER_SIZE > Math.min(x1, x2) &&
        pos.x < Math.max(x1, x2) &&
        pos.y + PLAYER_SIZE > Math.min(y1, y2) &&
        pos.y < Math.max(y1, y2)
      ) {
        return true;
      }
    }
    return false;
  };
  // Handle player movement
  useEffect(() => {
    const handleKey = (e) => {
      let dx = 0,
        dy = 0;
      if (e.key === "ArrowUp") dy = -10;
      if (e.key === "ArrowDown") dy = 10;
      if (e.key === "ArrowLeft") dx = -10;
      if (e.key === "ArrowRight") dx = 10;

      const newPos = { x: player.x + dx, y: player.y + dy };

      // Simple collision: prevent moving outside maze bounds
      if (!collides(newPos)) {
        setPlayer(newPos);
      }

      // Win condition
      const distance = Math.hypot(newPos.x - goal.x, newPos.y - goal.y);
      if (distance < PLAYER_SIZE) setWin(true);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player]);

  // Rotate maze every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 90);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white font-default">
      {/* Objective/Rules box */}
      <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 border border-gray-700 rounded p-4 text-sm max-w-sm">
        <h2 className="text-green-400 text-2xl font-bold mb-2">
          Level 3 - Maze and Heisenberg
        </h2>
        <h2 className="text-green-400 font-bold mb-1">Objective</h2>
        <p>Navigate the maze and reach the glowing exit.</p>
        <h2 className="text-green-400 font-bold mt-2 mb-1">Rules</h2>
        <ul className="list-disc list-inside">
          <li>Use arrow keys to move the player.</li>
          <li>
            The maze rotates every few seconds, changing your perspective and
            direction of your keys.
          </li>
          <li>Do not touch the walls!</li>
          <li>Reach the glowing exit to complete the level.</li>
        </ul>
      </div>

      {/* Maze */}
      <motion.div
        className="relative bg-gray-800 rounded-lg"
        style={{ width: MAZE_SIZE, height: MAZE_SIZE }}
        animate={{ rotate: rotation }}
        transition={{ duration: 1, type: "spring" }}
      >
        {/* Walls */}
        {walls.map((w, idx) => (
          <div
            key={idx}
            className="absolute bg-gray-600"
            style={{
              left: Math.min(w[0], w[2]),
              top: Math.min(w[1], w[3]),
              width: Math.abs(w[2] - w[0]) || 4,
              height: Math.abs(w[3] - w[1]) || 4,
            }}
          ></div>
        ))}

        {/* Goal */}
        <div
          className="absolute bg-green-400 rounded-full"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            left: goal.x,
            top: goal.y,
          }}
        ></div>

        {/* Player */}
        <motion.div
          className="absolute bg-pink-500 rounded-full"
          style={{ width: PLAYER_SIZE, height: PLAYER_SIZE }}
          animate={{ left: player.x, top: player.y }}
          transition={{ type: "tween", duration: 0.1 }}
        />
      </motion.div>

      {/* Win button */}
      {win && (
        <motion.button
          onClick={onNext}
          className="mt-6 px-6 py-3 bg-pink-400 text-white rounded-xl shadow-lg font-default"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Continue
        </motion.button>
      )}
    </div>
  );
}
