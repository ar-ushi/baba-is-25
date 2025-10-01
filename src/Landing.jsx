import { motion } from "framer-motion";
export default function Landing({ onStart }) {
  return (
    
    <motion.div
      className="flex flex-col items-center justify-center h-screen text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-6xl mb-6 font-default "
        animate={{ textShadow: "0px 0px 8px #979494ff" }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
      >
        Baba is 25
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        className="px-6 py-3 bg-pink-300 text-white rounded-xl shadow-lg font-default"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
