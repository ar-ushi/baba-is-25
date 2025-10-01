import { motion } from "framer-motion";

export default function Typewriter({
  text,
  speed = 0.03,
  onComplete,
  className,
}) {
  const letters = Array.from(text);

  return (
    <div className={`whitespace-pre-wrap ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * speed }}
          onAnimationComplete={() => {
            // Call onComplete when last letter finishes
            if (index === letters.length - 1 && onComplete) {
              onComplete();
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
