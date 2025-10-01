import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Level2({ onNext }) {
  const [move1, setMove1] = useState("");
  const [move2, setMove2] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    const valid1 = move1 === "Qa8";
    const valid2 = ["Re3#", "Nc5#", "Nd6#"].includes(move2);

    if (!valid1 || !valid2) {
      setError(true);
      setSuccess(false);
      // reset error after animation
      setTimeout(() => setError(false), 500);
    } else {
      setError(false);
      setSuccess(true);
      onNext();
      // proceed to next level here
    }
  };
  const inputClass = (field) =>
    `px-3 py-2 rounded-md bg-white text-black font-mono text-3xl ${
      error
        ? "border-2 border-red-500"
        : success
        ? "border-2 border-green-500"
        : ""
    }`;

  const shakeAnimation = {
    shake: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
    idle: { x: 0 },
  };
  return (
    <div className=" flex flex-col justify-center items-center h-screen bg-black text-white font-default">
      {/* Objective/Rules Box */}
      <div className="mb-12">
        <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 border border-gray-700 rounded p-4 text-sm max-w-sm">
          <h2 className="text-green-400 text-3xl pb-4 font-default font-bold mb-2">
            Level 2 - The Only Mate You'll Be Doing
          </h2>
          <h2 className="text-green-400 font-default font-bold mb-2">
            Objective
          </h2>
          <p>White to play and mate in 2.</p>
          <h2 className="text-green-400  font-default font-bold mt-3 mb-2">
            Why?
          </h2>
          <p>
            We've been observing you, Agent Nishant. Ever since we've woken you
            up with the immensely important mission of saving your own humanity
            and by extension, Earth's. You've sent hours in the toilet playing
            this silly little game. Let's see if the divine gods shine on you
            today.
          </p>
          <h2 className="text-green-400  font-default font-bold mt-3 mb-2">
            Rules
          </h2>
          <p>Use Chess Notation (strictly)</p>
        </div>
      </div>
      <img
        src="/chess-level-2-game-1.png"
        className="mt-6 gap-5 max-w-full max-h-full"
      />

      <div className="flex flex-col w-64 space-y-2 mt-6">
        <label className="text-white font-default">Move 1</label>
        <motion.input
          type="text"
          value={move1}
          onChange={(e) => setMove1(e.target.value)}
          className={inputClass(move1)}
          animate={error ? "shake" : "idle"}
          variants={shakeAnimation}
        />

        <label className="text-white font-default">Move 2</label>
        <motion.input
          type="text"
          value={move2}
          onChange={(e) => setMove2(e.target.value)}
          className={inputClass(move2)}
          animate={error ? "shake" : "idle"}
          variants={shakeAnimation}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 font-default mt-2"
          >
            Invalid move! Try again.
          </motion.p>
        )}
        {success && (
          <motion.p
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-500 font-default mt-2"
          >
            Correct!
          </motion.p>
        )}
      </AnimatePresence>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-pink-300 text-white rounded-xl font-default"
      >
        Submit
      </button>
    </div>
  );
}
