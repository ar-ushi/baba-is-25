import { useState } from "react";
import { motion } from "framer-motion";

// Cipher mapping (we'll encode the message)
const cipherMessage = "FVB HYL AOL ILZA AOPUN AOHAZ LCLY ILLU TPUL"; // "YOU ARE THE BEST THING THAT'S EVER BEEN MINE"

// Provide partial letter mappings as hints
const hintMap = {
  F: "Y", // revealed
  O: "H", // revealed
  L: "E", // revealed
};

export default function Puzzle4({ onNext }) {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input.toUpperCase() === "YOU ARE THE BEST THING THATS EVER BEEN MINE") {
      setDecoded(input);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white font-default ">
      {/* Objective / Rules Box */}
      <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 border border-gray-700 rounded p-4 text-sm max-w-sm">
        <h2 className="text-green-400 text-3xl font-default font-bold mb-2">
          Level 4 - Breaking Code
        </h2>
        <h2 className="text-green-400 font-default font-bold mb-2">
          Objective
        </h2>
        <p>Decode the hidden message using the cipher hints!</p>
        <p> HINT TO DECODE THE TYPE OF CIPHER : Rome wasn't built in a day</p>

        <h2 className="text-green-400 font-default font-bold mt-3 mb-2">
          Rules
        </h2>
        <ul className="list-disc list-inside">
          <li>Type your decoded message in the input field.</li>
          <li>Use the hints provided: some letters are already revealed.</li>
          <li>Spaces remain spaces.</li>
          <li>Correctly decoding the message unlocks the final word.</li>
        </ul>
      </div>

      {/* Cipher Display */}
      <div className="mt-6 max-w-3xl text-center text-lg p-4 bg-gray-900 bg-opacity-50 rounded">
        <p className="font-mono text-pink-300 text-xl mb-4">Encoded Message:</p>
        <p className="font-mono text-green-400 text-lg">{cipherMessage}</p>
        <p className="mt-2 text-white text-sm">Hint: F="Y", O= "H", L="E"</p>
      </div>

      {/* Input */}
      <div className="mt-6 flex flex-col items-center">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type decoded message here"
          className={`p-2 rounded border ${
            error ? "border-red-500 animate-shake" : "border-gray-600"
          } bg-black text-white font-mono w-96 text-center`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-pink-400 rounded font-default"
        >
          Submit
        </motion.button>
      </div>

      {/* Decoded Reveal */}
      {decoded && (
        <motion.div
          className="mt-8 text-2xl text-pink-300 font-bold text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Decoded Message: "{decoded}"
        </motion.div>
      )}

      {/* Continue Button */}
      {decoded && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="mt-6 px-6 py-3 bg-pink-400 text-white rounded-xl shadow-lg font-default"
        >
          Continue
        </motion.button>
      )}

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
