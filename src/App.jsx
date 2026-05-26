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
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Main Area: Chords */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center p-4">
        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-8xl sm:text-9xl font-bold">{currentPair[0]}</span>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <span className="text-8xl sm:text-9xl font-bold">{currentPair[1]}</span>
        </div>
      </div>

      {/* Bottom Area: Controls */}
      <div className="p-4 bg-slate-800 shadow-lg pb-6 relative">
        {/* Preparation Countdown Overlay */}
        {prepCountdown !== null && (
          <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center z-20">
            {/* Close Button */}
            <button
              onClick={handleCancelPrep}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 rounded-full hover:bg-slate-700 transition-colors"
              aria-label="Cancel countdown"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Countdown Display */}
            <div className="text-center">
              <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Prepare to play in</span>
              <div className="text-6xl font-black text-slate-100 mt-1 animate-pulse">{prepCountdown}</div>
            </div>
          </div>
        )}

        <div className="w-full lg:w-4xl mx-auto justify-center flex gap-4">
          <div className="w-full flex flex-col justify-center gap-4">
            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-slate-100 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-mono text-slate-200">{formatTime(timeLeft)}</span>
              <div className="flex space-x-2">
                {isRunning ? (
                  <button
                    onClick={handlePause}
                    className="w-14 h-14 flex items-center justify-center bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-colors"
                    aria-label="Pause"
                  >
                    <Pause className="w-6 h-6 text-slate-100 fill-slate-100" />
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="w-14 h-14 flex items-center justify-center bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-colors"
                    aria-label="Start"
                  >
                    <Play className="w-6 h-6 text-slate-100 fill-slate-100" />
                  </button>
                )
                }
                <button
                  onClick={handleRestart}
                  className="w-14 h-14 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-2xl transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-6 h-6 text-slate-100" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleChangeChords}
            className="py-4 bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-2xl text-xl font-semibold transition-colors"
          >
            Change Chords
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
