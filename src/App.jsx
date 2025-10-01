import { useState, useRef, useEffect } from "react";
import Landing from "./Landing.jsx";
import Lore from "./Lore.jsx";
import Level1 from "./pages/Level1.jsx";
import Level2 from "./pages/Level2.jsx";
import Level3 from "./pages/Level3.jsx";
import Level4 from "./pages/Level4.jsx";
import Letter from "./pages/Letter.jsx";
import Stars from "./components/Stars";
import kanye from "./assets/kanye.mp3";
import tame from "./assets/tameimpala.mp3";
import vance from "./assets/vance-joy.mp3";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing -> lore -> level1
  const audioRef = useRef(null);
  const tracks = [
    { src: kanye, playTime: 20 }, // only play 20s of first track
    { src: tame}, // full track
    { src: vance }, // full track
  ];
  const [currentTrack, setCurrentTrack] = useState(0);
  const [started, setStarted] = useState(false);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const startGame = () => {
    setStarted(true);
    setScreen("lore");
  };

  // Handle audio playback
  useEffect(() => {
    if (!started) return; // don't play before user starts
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.src = tracks[currentTrack].src;
    audioEl.currentTime = 0;
    audioEl.volume = 0.7;

    audioEl.onended = null; // clear previous listener

    if (tracks[currentTrack].playTime) {
      const timer = setTimeout(
        () => nextTrack(),
        tracks[currentTrack].playTime * 1000
      );
      audioEl.play().catch(() => console.log("Autoplay blocked"));
      return () => clearTimeout(timer);
    } else {
      audioEl.onended = nextTrack;
      audioEl.play().catch(() => console.log("Autoplay blocked"));
    }
  }, [currentTrack, started]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-pink-300 font-mono">
      {screen === "landing" && <Landing onStart={startGame} />}
      {screen === "lore" && <Lore onNext={() => setScreen("level1")} />}
      {screen === "level1" && <Level1 onNext={() => setScreen("level2")} />}
      {screen === "level2" && <Level2 onNext={() => setScreen("level3")} />}
      {screen === "level3" && <Level3 onNext={() => setScreen("level4")} />}
      {screen === "level4" && <Level4 onNext={() => setScreen("letter")} />}
      {screen === "letter" && (
        <Letter replayGame={() => setScreen("landing")} />
      )}
      <audio ref={audioRef} />
      <Stars></Stars>
    </div>
  );
}
