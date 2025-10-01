import { useState } from "react";
import Typewriter from "../components/Typewriter";
import { LORE_END, LETTER } from "../assets/lore";

export default function Lore({ replayGame }) {
  const [sequence, setSequence] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4 h-screen px-8 text-green-300 overflow-hidden">
      <div className="relative font-default pt-12 z-10 text-lg leading-relaxed p-6 rounded-xl">
        {sequence === 1 && (
          <Typewriter
            text={LORE_END}
            speed={0.05}
            onComplete={() => setSequence(2)}
          />
        )}

        {sequence === 2 && (
          <>
            <div className="mb-4 text-white font-mono text-3xl">
              At the end of the line, there is no real truth. You spent all
              those hours alone up here solving a puzzle waiting for comms from
              your superiors. What was it for?
            </div>
            <Typewriter
              className="mb-4 text-white font-mono text-3xl"
              text="It is only then you see the sheet of paper beneath the odd message you found."
              speed={0.05}
              onComplete={() => setSequence(3)}
            />
          </>
        )}
        {sequence === 3 && (
          <>
            <Typewriter className=" text-pink-300" text={LETTER} speed={0.05} />
          </>
        )}
      </div>

      {sequence === 3 && (
        <button
          onClick={replayGame}
          className="mt-8 px-6 py-3 bg-green-300 text-white font-default rounded-lg hover:bg-green-500 z-10"
        >
          Replay
        </button>
      )}
    </div>
  );
}
