import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

const CHORD_PAIRS = [
  ["A", "C"], ["A", "G"], ["A", "E"], ["A", "Em"], ["A", "D"], ["A", "Dm"],
  ["C", "G"], ["C", "E"], ["C", "D"], ["C", "Dm"], ["C", "Am"], ["C", "Em"],
  ["G", "E"], ["G", "D"], ["G", "Dm"], ["G", "Am"], ["G", "Em"],
  ["E", "D"], ["E", "Dm"], ["E", "Am"],
  ["D", "Am"], ["D", "Em"],
  ["Dm", "Am"], ["Dm", "Em"],
  ["Am", "Em"]
];

function App() {
  const [currentPair, setCurrentPair] = useState(CHORD_PAIRS[0]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    let interval = null;
    if (prepCountdown !== null) {
      interval = setInterval(() => {
        setPrepCountdown((prev) => {
          if (prev <= 1) {
            setIsRunning(true);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [prepCountdown]);

  const handleStart = () => {
    if (timeLeft > 0) {
      setPrepCountdown(3);
    }
  };
  const handlePause = () => setIsRunning(false);
  const handleRestart = () => {
    setPrepCountdown(null);
    setIsRunning(false);
    setTimeLeft(60);
  };
  const handleCancelPrep = () => {
    setPrepCountdown(null);
    setIsRunning(false);
  };

  const handleChangeChords = () => {
    let nextPair = currentPair;
    while (nextPair[0] === currentPair[0] && nextPair[1] === currentPair[1]) {
      const randomIndex = Math.floor(Math.random() * CHORD_PAIRS.length);
      nextPair = CHORD_PAIRS[randomIndex];
    }
    setCurrentPair(nextPair);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col h-screen bg-brandBlack text-brandWhite font-sans selection:bg-brandCrimson selection:text-brandWhite">
      {/* Main Area: Chords */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center p-4 gap-8 sm:gap-16">
        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-8xl sm:text-9xl font-oswald font-black text-brandCrimson select-none">{currentPair[0]}</span>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-8xl sm:text-9xl font-oswald font-black text-brandWhite select-none">{currentPair[1]}</span>
        </div>
      </div>

      {/* Bottom Area: Controls */}
      <div className="p-6 bg-brandCard border-t border-brandSilver/10 shadow-2xl relative">
        {/* Preparation Countdown Overlay */}
        {prepCountdown !== null && (
          <div className="absolute inset-0 bg-brandCard flex flex-col items-center justify-center z-20">
            {/* Close Button */}
            <button
              onClick={handleCancelPrep}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-brandCard hover:bg-brandBlack border border-brandSilver/10 text-brandSilver hover:text-brandWhite rounded transition-all cursor-pointer"
              aria-label="Cancel countdown"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Countdown Display */}
            <div className="text-center">
              <span className="text-sm font-sans font-semibold tracking-wider text-brandSilver uppercase">Prepare to play in</span>
              <div className="text-6xl font-oswald font-black text-brandWhite mt-1 animate-pulse">{prepCountdown}</div>
            </div>
          </div>
        )}

        <div className="w-full lg:max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-grow w-full flex flex-col gap-4">
            {/* Visual Progress Bar */}
            <div className="w-full bg-brandBlack border border-brandSilver/10 h-2 rounded overflow-hidden">
              <div
                className="bg-brandCrimson h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
            {/* Timer and Icon Buttons */}
            <div className="flex items-center justify-between">
              <span className="text-4xl font-oswald font-bold text-brandWhite tracking-wider">{formatTime(timeLeft)}</span>
              <div className="flex gap-3">
                {isRunning ? (
                  <button
                    onClick={handlePause}
                    className="w-14 h-14 flex items-center justify-center bg-brandCard hover:bg-brandBlack text-brandWhite border border-brandSilver/10 rounded transition-all cursor-pointer"
                    aria-label="Pause"
                  >
                    <Pause className="w-6 h-6 fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="w-14 h-14 flex items-center justify-center bg-brandCard hover:bg-brandBlack text-brandWhite border border-brandSilver/10 rounded transition-all cursor-pointer"
                    aria-label="Start"
                  >
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                )}
                <button
                  onClick={handleRestart}
                  className="w-14 h-14 flex items-center justify-center bg-brandCard hover:bg-brandBlack text-brandSilver hover:text-brandWhite border border-brandSilver/10 rounded transition-all cursor-pointer"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          {/* Change Chords Button */}
          <button
            onClick={handleChangeChords}
            className="w-full md:w-auto h-20 px-8 bg-brandCrimson hover:bg-red-700 text-brandWhite font-oswald font-semibold uppercase tracking-wider rounded transition-all cursor-pointer whitespace-nowrap"
          >
            Change Chords
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
