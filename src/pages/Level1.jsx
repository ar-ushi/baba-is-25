import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Grid size
const GRID_ROWS = 6;
const GRID_COLS = 6;

// Tile types
const TILE = {
  NORMAL: "normal",
  SWITCH1: "switch1",
  SWITCH2: "switch2",
  SWITCH3: "switch3",
  BLOCKED: "blocked",
  GOAL: "goal",
  ONEWAY_UP: "oneway-up",
  ONEWAY_DOWN: "oneway-down",
  SLIDE: "slide",
  TRAP: "trap",
};

// Initial grid layout
const initialGrid = [
  [
    TILE.NORMAL,
    TILE.BLOCKED,
    TILE.SWITCH1,
    TILE.NORMAL,
    TILE.TRAP,
    TILE.NORMAL,
  ],
  [
    TILE.NORMAL,
    TILE.SLIDE,
    TILE.BLOCKED,
    TILE.NORMAL,
    TILE.BLOCKED,
    TILE.NORMAL,
  ],
  [
    TILE.NORMAL,
    TILE.NORMAL,
    TILE.ONEWAY_DOWN,
    TILE.TRAP,
    TILE.NORMAL,
    TILE.NORMAL,
  ],
  [
    TILE.SWITCH2,
    TILE.BLOCKED,
    TILE.NORMAL,
    TILE.SLIDE,
    TILE.ONEWAY_UP,
    TILE.NORMAL,
  ],
  [
    TILE.TRAP,
    TILE.NORMAL,
    TILE.SWITCH3,
    TILE.NORMAL,
    TILE.NORMAL,
    TILE.BLOCKED,
  ],
  [TILE.NORMAL, TILE.NORMAL, TILE.NORMAL, TILE.BLOCKED, TILE.NORMAL, TILE.GOAL],
];

// Lore fragments triggered by tile coordinates
const loreMap = {
  "0,2": "Activating this switch awakens hidden pathways… tread carefully.",
  "3,0": "Your wits are your only guide. Every choice shapes your path.",
  "4,2":
    "This switch seems important… but activating it now may block another path.",
  "5,5": "The chamber opens. The end awaits your arrival, Agent Nishant.",
};

export default function Level1({ onNext }) {
  const [grid, setGrid] = useState(initialGrid);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [lore, setLore] = useState(
    "Agent Nishant… your cryogenic sleep ends. The chamber is dark, but the first tile glows before you."
  );

  // Track switch activations
  const [switchesActivated, setSwitchesActivated] = useState({
    switch1: false,
    switch2: false,
    switch3: false,
  });

  // Handle keyboard movement
  useEffect(() => {
    const handleKey = (e) => {
      let { row, col } = playerPos;
      let nextRow = row;
      let nextCol = col;

      if (e.key === "ArrowUp") nextRow -= 1;
      if (e.key === "ArrowDown") nextRow += 1;
      if (e.key === "ArrowLeft") nextCol -= 1;
      if (e.key === "ArrowRight") nextCol += 1;

      // Stay in bounds
      if (
        nextRow < 0 ||
        nextRow >= GRID_ROWS ||
        nextCol < 0 ||
        nextCol >= GRID_COLS
      )
        return;

      const nextTile = grid[nextRow][nextCol];

      // Blocked or trap tiles
      if (nextTile === TILE.BLOCKED) return;
      if (nextTile === TILE.TRAP) {
        // Reset player to start
        setPlayerPos({ row: 0, col: 0 });
        setLore("You triggered a trap! Back to the start, Agent Nishant.");
        return;
      }

      // One-way tiles logic
      if (nextTile === TILE.ONEWAY_UP && e.key !== "ArrowUp") return;
      if (nextTile === TILE.ONEWAY_DOWN && e.key !== "ArrowDown") return;

      // Move player
      setPlayerPos({ row: nextRow, col: nextCol });

      // Slide tiles logic
      if (nextTile === TILE.SLIDE) {
        let slideRow = nextRow;
        let slideCol = nextCol;

        while (true) {
          let testRow = slideRow;
          let testCol = slideCol;
          if (e.key === "ArrowUp") testRow -= 1;
          if (e.key === "ArrowDown") testRow += 1;
          if (e.key === "ArrowLeft") testCol -= 1;
          if (e.key === "ArrowRight") testCol += 1;

          if (
            testRow < 0 ||
            testRow >= GRID_ROWS ||
            testCol < 0 ||
            testCol >= GRID_COLS ||
            grid[testRow][testCol] === TILE.BLOCKED
          )
            break;

          slideRow = testRow;
          slideCol = testCol;

          // Update lore if sliding onto key tile
          const key = `${slideRow},${slideCol}`;
          if (loreMap[key]) setLore(loreMap[key]);
        }

        setPlayerPos({ row: slideRow, col: slideCol });
      }

      // Activate switches
      if ([TILE.SWITCH1, TILE.SWITCH2, TILE.SWITCH3].includes(nextTile)) {
        const switchKey = nextTile.toLowerCase();
        setSwitchesActivated((prev) => ({ ...prev, [switchKey]: true }));

        // Example logic: certain switches open/close blocks conditionally
        setGrid((prev) =>
          prev.map((r, rIdx) =>
            r.map((t, cIdx) => {
              // SWITCH1 opens trap at 2,3
              if (nextTile === TILE.SWITCH1 && rIdx === 2 && cIdx === 3)
                return TILE.NORMAL;
              // SWITCH2 opens block at 1,2
              if (nextTile === TILE.SWITCH2 && rIdx === 1 && cIdx === 2)
                return TILE.NORMAL;
              // SWITCH3 opens goal at 5,5
              if (nextTile === TILE.SWITCH3 && rIdx === 5 && cIdx === 5)
                return TILE.GOAL;
              return t;
            })
          )
        );
      }

      // Update lore if on key tile
      const key = `${nextRow},${nextCol}`;
      if (loreMap[key]) setLore(loreMap[key]);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, grid]);

  return (
    <div className=" flex flex-col justify-center items-center h-screen bg-black text-white font-default">
      {/* Objective/Rules Box */}

      <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 border border-gray-700 rounded p-4 text-sm max-w-sm">
        <h2 className="text-green-400 text-3xl pb-4 font-default font-bold mb-2">
          Level 1 - The Less I Know The Way
        </h2>
        <h2 className="text-green-400 font-default font-bold mb-2">
          Objective
        </h2>
        <p>
          Activate all switches in the correct order and reach the glowing
          portal (green tile).
        </p>
        <h2 className="text-green-400  font-default font-bold mt-3 mb-2">
          Rules
        </h2>
        <ul className="list-disc list-inside">
          <li>Use arrow keys to move.</li>
          <li>Switch tiles (blue) toggle traps or open blocked tiles.</li>
          <li>
            Slide tiles (teal) force continuous movement until a wall or blocked
            tile.
          </li>
          <li>
            One-way tiles (purple) can only be entered from a specific
            direction.
          </li>
          <li>Trap tiles (red) send you back to start.</li>
          <li>Step on the goal tile (green) to finish.</li>
        </ul>
      </div>
      {/* Grid */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 60px)` }}
      >
        {grid.map((row, rIdx) =>
          row.map((tile, cIdx) => {
            const isPlayer = playerPos.row === rIdx && playerPos.col === cIdx;
            let bg = "bg-gray-800";

            if (
              tile === TILE.SWITCH1 ||
              tile === TILE.SWITCH2 ||
              tile === TILE.SWITCH3
            )
              bg = "bg-blue-600";
            if (tile === TILE.BLOCKED) bg = "bg-gray-900";
            if (tile === TILE.GOAL) bg = "bg-green-600";
            if (tile === TILE.ONEWAY_UP || tile === TILE.ONEWAY_DOWN)
              bg = "bg-purple-600";
            if (tile === TILE.SLIDE) bg = "bg-teal-600";
            if (tile === TILE.TRAP) bg = "bg-red-600";
            if (isPlayer) bg = "bg-pink-500";

            return (
              <motion.div
                key={`${rIdx}-${cIdx}`}
                className={`w-14 h-14 border border-gray-700 ${bg} flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            );
          })
        )}
      </div>

      {/* Lore */}
      <div className="mt-6 max-w-3xl text-center text-sm md:text-lg p-4">
        {lore}
      </div>
      {playerPos.row === 5 && playerPos.col === 5 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="mt-4 px-6 py-3 bg-pink-400 text-white rounded-xl shadow-lg font-default"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
}
