import { useEffect, useMemo, useState } from "react";

interface DataMiningProps {
  onSuccess: () => void;
  onSkip?: () => void;
  theme: "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400";
}

const DataMining = ({ onSuccess, onSkip, theme }: DataMiningProps) => {
  const patterns = useMemo(
    () => [
      {
        pattern: "nvidia",
        data: [
          "xnvidia_secret_2023",
          "data_nvidia_leaked",
          "nvidia_h100_price",
          "random_text_here",
          "another_nvidia_file",
          "test_data_row",
          "nvidia_cuda_source",
          "microsoft_openai",
        ],
        description: "Tìm tất cả dòng chứa từ 'nvidia'",
        count: 5,
      },
      {
        pattern: "\\d{4}",
        data: [
          "file_2023_data.txt",
          "report_Q3_summary",
          "nvidia_2024_roadmap",
          "test_1234_log",
          "random_text",
          "backup_2025_jan",
          "secret_9999_code",
          "normal_filename",
        ],
        description: "Tìm tất cả dòng chứa 4 chữ số liên tiếp (regex: \\d{4})",
        count: 5,
      },
      {
        pattern: "AI|ML|GPU",
        data: [
          "AI_training_log.txt",
          "ML_model_weights",
          "GPU_cluster_config",
          "random_file.dat",
          "AI_research_paper",
          "database_backup",
          "ML_pipeline_code",
          "test_normal_text",
        ],
        description: "Tìm dòng chứa AI HOẶC ML HOẶC GPU",
        count: 5,
      },
    ],
    []
  );

  const [data, setData] = useState<string[]>([]);
  const [pattern, setPattern] = useState("");
  const [userInput, setUserInput] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [foundPatterns, setFoundPatterns] = useState<number>(0);

  useEffect(() => {
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    setData(selected.data);
    setPattern(selected.pattern);
  }, [patterns]);

  const handleSubmit = () => {
    const regex = new RegExp(pattern, "gi");
    const matches = data.filter((line) => regex.test(line));

    const currentPattern = patterns.find((p) => p.pattern === pattern);
    if (matches.length === currentPattern?.count) {
      onSuccess();
    } else {
      setAttempts(attempts - 1);
      setFoundPatterns(matches.length);
      if (attempts <= 1) {
        alert(`Không chính xác! Bạn tìm được ${matches.length}/${currentPattern?.count} patterns.`);
      }
    }
  };

  const currentPattern = patterns.find((p) => p.pattern === pattern);

  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${theme} mb-2`}>📊 DATA MINING</h3>
        <p className="text-slate-400 text-sm">{currentPattern?.description}</p>
      </div>

      <div className="space-y-4">
        {/* Data Display */}
        <div className="bg-slate-900 border border-slate-700 rounded p-4 max-h-64 overflow-y-auto font-mono text-sm">
          {data.map((line, index) => {
            const regex = new RegExp(pattern, "gi");
            const matches = regex.test(line);
            return (
              <div key={index} className={`${matches ? theme : "text-slate-600"} mb-1`}>
                [{index + 1}] {line}
              </div>
            );
          })}
        </div>

        {/* Pattern Display */}
        <div className="bg-slate-900 border border-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 mb-1">Pattern to find:</p>
          <p className={`text-lg font-mono ${theme}`}>{pattern}</p>
          <p className="text-xs text-slate-500 mt-2">Cần tìm: {currentPattern?.count} dòng</p>
        </div>

        {/* User Input */}
        <div>
          <label className="text-xs text-slate-400 block mb-2">Số dòng bạn tìm được:</label>
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-green-400 font-mono"
            placeholder="Nhập số dòng match với pattern..."
            min="0"
            max={data.length}
          />
        </div>

        {foundPatterns > 0 && attempts < 3 && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
            <p className="text-sm text-yellow-400">
              ❌ Sai rồi! Bạn tìm được {foundPatterns}/{currentPattern?.count} dòng
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Attempts: {attempts}/3</span>
          <button onClick={() => setShowHint(!showHint)} className="text-xs text-yellow-400 hover:text-yellow-300">
            {showHint ? "Ẩn hint" : "💡 Xem hint"}
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
            <p className="text-xs text-yellow-400">💡 Đếm các dòng được highlight màu xanh!</p>
            {pattern.includes("\\d") && <p className="text-xs text-slate-400 mt-1">Regex tip: \d = chữ số (0-9)</p>}
            {pattern.includes("|") && <p className="text-xs text-slate-400 mt-1">Regex tip: | nghĩa là HOẶC (OR)</p>}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSubmit}
            disabled={!userInput || attempts <= 0}
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

        <div className="text-xs text-slate-500 text-center">Hint: Scroll xuống và đếm các dòng được highlight</div>
      </div>
    </div>
  );
};

export default DataMining;
