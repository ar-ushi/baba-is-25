import Typewriter from "./components/Typewriter";
import { LORE_TEXT } from "./assets/lore";
export default function Lore({ onNext }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen px-8 text-green-300  overflow-hidden">
      <div className="relative font-default z-10  text-lg  leading-relaxed p-6 rounded-xl">
        <Typewriter text={LORE_TEXT} speed={0.05} />
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-6 py-3 bg-green-300 text-white font-default rounded-lg hover:bg-green-500 z-10"
      >
        Continue
      </button>
    </div>
  );
}
