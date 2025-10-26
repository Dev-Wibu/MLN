import { useEffect, useMemo, useState } from "react";

interface PasswordCrackingProps {
  onSuccess: () => void;
  onSkip?: () => void;
  theme: "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400";
}

const PasswordCracking = ({ onSuccess, onSkip, theme }: PasswordCrackingProps) => {
  const puzzles = useMemo(
    () => [
      { encrypted: "QBUB", decrypted: "DATA", shift: 13, hint: "Caesar Cipher với shift = 13 (ROT13)" },
      { encrypted: "KPWLYLA", decrypted: "FIREWALL", shift: 7, hint: "Caesar Cipher với shift = 7" },
      { encrypted: "FRGHER", decrypted: "SECURE", shift: 13, hint: "ROT13 - mỗi chữ cái dịch 13 vị trí" },
      { encrypted: "WKHB", decrypted: "THEY", shift: 3, hint: "Classic Caesar với shift = 3" },
    ],
    []
  );

  const [encrypted, setEncrypted] = useState("");
  const [userInput, setUserInput] = useState("");
  const [hint, setHint] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setEncrypted(puzzle.encrypted);
    setHint(puzzles.indexOf(puzzle));
  }, [puzzles]);

  const handleSubmit = () => {
    if (userInput.toUpperCase() === puzzles[hint].decrypted) {
      onSuccess();
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        alert("Hết lượt thử! Bạn có thể skip hoặc thử lại.");
      }
    }
  };

  const caesarCipher = (text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${theme} mb-2`}>🔐 PASSWORD CRACKING</h3>
        <p className="text-slate-400 text-sm">Giải mã password đã bị encrypt bằng Caesar Cipher</p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900 border border-slate-700 rounded p-4">
          <p className="text-xs text-slate-500 mb-1">Encrypted Password:</p>
          <p className={`text-2xl font-mono ${theme} tracking-widest`}>{encrypted}</p>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-2">Your Answer:</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-green-400 font-mono uppercase"
            placeholder="Nhập password đã giải mã..."
            maxLength={20}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Attempts: {attempts}/3</span>
          <button onClick={() => setShowHint(!showHint)} className="text-xs text-yellow-400 hover:text-yellow-300">
            {showHint ? "Ẩn hint" : "💡 Xem hint"}
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
            <p className="text-xs text-yellow-400">💡 {puzzles[hint].hint}</p>
            <p className="text-xs text-slate-400 mt-2">Example: A → {caesarCipher("A", puzzles[hint].shift)}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSubmit}
            disabled={attempts <= 0}
            className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 rounded px-4 py-2 text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✓ Submit
          </button>
          {onSkip && (
            <button onClick={onSkip} className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded px-4 py-2 text-red-400">
              Skip (-50pts)
            </button>
          )}
        </div>

        <div className="text-xs text-slate-500 text-center">Hint: Thử dịch từng chữ cái theo bảng chữ cái (A=1, B=2, ...)</div>
      </div>
    </div>
  );
};

export default PasswordCracking;
