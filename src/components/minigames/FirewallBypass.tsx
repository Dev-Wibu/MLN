import { useEffect, useMemo, useState } from "react";

interface FirewallBypassProps {
  onSuccess: () => void;
  onSkip?: () => void;
  theme: "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400";
}

const FirewallBypass = ({ onSuccess, onSkip, theme }: FirewallBypassProps) => {
  const words = useMemo(() => ["NVIDIA", "OPENAI", "GITHUB", "PYTHON", "DOCKER", "MATRIX", "HACKER", "FIREWALL", "SECURITY", "DATABASE"], []);

  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState(6);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  useEffect(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setTargetWord(word);
  }, [words]);

  const handleSubmit = () => {
    if (currentGuess.length !== targetWord.length) {
      alert(`Word phải có ${targetWord.length} chữ cái!`);
      return;
    }

    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess.toUpperCase() === targetWord) {
      setGameStatus("won");
      setTimeout(onSuccess, 500);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts <= 0) {
        setGameStatus("lost");
      }
    }
  };

  const getLetterColor = (letter: string, index: number) => {
    if (targetWord[index] === letter) {
      return "bg-green-500 border-green-400"; // Correct position
    } else if (targetWord.includes(letter)) {
      return "bg-yellow-500 border-yellow-400"; // Wrong position
    } else {
      return "bg-slate-700 border-slate-600"; // Not in word
    }
  };

  const usedLetters = guesses.join("").split("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${theme} mb-2`}>🔥 FIREWALL BYPASS</h3>
        <p className="text-slate-400 text-sm">Đoán từ khóa để bypass firewall (giống Wordle)</p>
      </div>

      <div className="space-y-4">
        {/* Word Length Hint */}
        <div className="bg-slate-900 border border-slate-700 rounded p-4 text-center">
          <p className="text-xs text-slate-400 mb-2">Target word length:</p>
          <div className="flex justify-center gap-1">
            {targetWord.split("").map((_, index) => (
              <div key={index} className="w-8 h-8 border-2 border-slate-600 rounded"></div>
            ))}
          </div>
          <p className={`text-sm ${theme} mt-2`}>{targetWord.length} letters</p>
        </div>

        {/* Previous Guesses */}
        <div className="space-y-2">
          {guesses.map((guess, guessIndex) => (
            <div key={guessIndex} className="flex justify-center gap-1">
              {guess.split("").map((letter, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`w-10 h-10 border-2 rounded flex items-center justify-center font-bold text-white ${getLetterColor(
                    letter,
                    letterIndex
                  )}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}

          {/* Current Guess Input */}
          {gameStatus === "playing" && (
            <div className="flex justify-center gap-1">
              {Array.from({ length: targetWord.length }).map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-10 border-2 border-yellow-400/50 rounded flex items-center justify-center font-bold text-yellow-400 animate-pulse"
                >
                  {currentGuess[index] || ""}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        {gameStatus === "playing" && (
          <div>
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-green-400 font-mono uppercase text-center text-xl tracking-widest"
              placeholder={`${targetWord.length} letters...`}
              maxLength={targetWord.length}
            />
          </div>
        )}

        {/* Keyboard */}
        <div className="grid grid-cols-7 gap-1">
          {alphabet.map((letter) => {
            const isUsed = usedLetters.includes(letter);
            const isCorrect = guesses.some((guess) => {
              const index = guess.indexOf(letter);
              return index !== -1 && targetWord[index] === letter;
            });
            const isWrongPosition = guesses.some((guess) => guess.includes(letter)) && !isCorrect;
            const isWrong = isUsed && !targetWord.includes(letter);

            return (
              <button
                key={letter}
                onClick={() => {
                  if (currentGuess.length < targetWord.length) {
                    setCurrentGuess(currentGuess + letter);
                  }
                }}
                disabled={gameStatus !== "playing"}
                className={`
                  px-2 py-1 rounded text-xs font-bold
                  ${isCorrect ? "bg-green-500 text-white" : ""}
                  ${isWrongPosition ? "bg-yellow-500 text-white" : ""}
                  ${isWrong ? "bg-slate-700 text-slate-500" : ""}
                  ${!isUsed ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : ""}
                  disabled:cursor-not-allowed
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Attempts: {attempts}/6</span>
          {gameStatus === "won" && <span className="text-green-400 font-bold">🎉 Success!</span>}
          {gameStatus === "lost" && <span className="text-red-400 font-bold">❌ Failed! Word was: {targetWord}</span>}
        </div>

        {/* Hint */}
        <div className="bg-blue-900/20 border border-blue-400/30 rounded p-3">
          <p className="text-xs text-blue-400">💡 Hint: Tech-related word</p>
          <p className="text-xs text-slate-400 mt-1">🟢 = Đúng vị trí | 🟡 = Đúng chữ, sai vị trí | ⚫ = Không có trong từ</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setCurrentGuess(currentGuess.slice(0, -1))}
            disabled={gameStatus !== "playing" || !currentGuess}
            className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50 rounded px-2 py-2 text-yellow-400 text-xs disabled:opacity-50"
          >
            ⌫ Delete
          </button>
          <button
            onClick={handleSubmit}
            disabled={gameStatus !== "playing" || currentGuess.length !== targetWord.length}
            className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 rounded px-2 py-2 text-green-400 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Submit
          </button>
          {onSkip && (
            <button onClick={onSkip} className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded px-2 py-2 text-red-400 text-xs">
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirewallBypass;
