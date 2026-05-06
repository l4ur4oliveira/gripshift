import React, { useState, useEffect } from 'react';

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

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleRestart = () => {
    setIsRunning(false);
    setTimeLeft(60);
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-800 shadow-lg pb-6">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-mono text-slate-200">{formatTime(timeLeft)}</span>
            <div className="flex space-x-2">
              <button 
                onClick={handleStart} 
                disabled={isRunning || timeLeft === 0}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-lg font-medium transition-colors"
              >
                Start
              </button>
              <button 
                onClick={handlePause} 
                disabled={!isRunning}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-lg font-medium transition-colors"
              >
                Pause
              </button>
              <button 
                onClick={handleRestart} 
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-2xl text-lg font-medium transition-colors"
              >
                Restart
              </button>
            </div>
          </div>
          <button 
            onClick={handleChangeChords} 
            className="w-full py-4 bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-2xl text-xl font-semibold transition-colors"
          >
            Change Chords
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
