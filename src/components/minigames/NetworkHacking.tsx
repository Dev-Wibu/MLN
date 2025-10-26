import { useState } from "react";

interface NetworkHackingProps {
  onSuccess: () => void;
  onSkip?: () => void;
  theme: "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400";
}

type Node = {
  id: string;
  x: number;
  y: number;
  connections: string[];
};

const NetworkHacking = ({ onSuccess, onSkip, theme }: NetworkHackingProps) => {
  const [selectedPath, setSelectedPath] = useState<string[]>(["A"]);
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);

  // Network topology: Find shortest path from A to Z
  const nodes: Record<string, Node> = {
    A: { id: "A", x: 1, y: 2, connections: ["B", "C"] },
    B: { id: "B", x: 2, y: 1, connections: ["A", "D", "E"] },
    C: { id: "C", x: 2, y: 3, connections: ["A", "E", "F"] },
    D: { id: "D", x: 3, y: 0, connections: ["B", "G"] },
    E: { id: "E", x: 3, y: 2, connections: ["B", "C", "G", "H"] },
    F: { id: "F", x: 3, y: 4, connections: ["C", "H"] },
    G: { id: "G", x: 4, y: 1, connections: ["D", "E", "Z"] },
    H: { id: "H", x: 4, y: 3, connections: ["E", "F", "Z"] },
    Z: { id: "Z", x: 5, y: 2, connections: ["G", "H"] },
  };

  const correctPath = ["A", "B", "E", "G", "Z"]; // Shortest path (4 hops)

  const handleNodeClick = (nodeId: string) => {
    const lastNode = selectedPath[selectedPath.length - 1];

    // Can only select connected nodes
    if (nodes[lastNode].connections.includes(nodeId)) {
      if (nodeId === "Z") {
        // Check if path is correct
        const newPath = [...selectedPath, nodeId];
        if (newPath.length === correctPath.length && newPath.join(",") === correctPath.join(",")) {
          onSuccess();
        } else {
          setAttempts(attempts - 1);
          if (attempts <= 1) {
            alert("Không phải đường đi ngắn nhất! Bạn có thể skip hoặc thử lại.");
          }
          setSelectedPath(["A"]);
        }
      } else {
        setSelectedPath([...selectedPath, nodeId]);
      }
    }
  };

  const resetPath = () => {
    setSelectedPath(["A"]);
  };

  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${theme} mb-2`}>🌐 NETWORK HACKING</h3>
        <p className="text-slate-400 text-sm">Tìm đường đi NGẮN NHẤT từ node A đến node Z</p>
      </div>

      <div className="space-y-4">
        {/* Network Visualization */}
        <div className="bg-slate-900 border border-slate-700 rounded p-6 relative h-80">
          <svg className="w-full h-full" viewBox="0 0 600 400">
            {/* Draw connections */}
            {Object.values(nodes).map((node) =>
              node.connections.map((connId) => {
                const connNode = nodes[connId];
                return (
                  <line
                    key={`${node.id}-${connId}`}
                    x1={node.x * 100}
                    y1={node.y * 80}
                    x2={connNode.x * 100}
                    y2={connNode.y * 80}
                    stroke="#334155"
                    strokeWidth="2"
                  />
                );
              })
            )}

            {/* Draw selected path */}
            {selectedPath.map((nodeId, index) => {
              if (index === selectedPath.length - 1) return null;
              const node = nodes[nodeId];
              const nextNode = nodes[selectedPath[index + 1]];
              return (
                <line
                  key={`path-${nodeId}`}
                  x1={node.x * 100}
                  y1={node.y * 80}
                  x2={nextNode.x * 100}
                  y2={nextNode.y * 80}
                  stroke="#22c55e"
                  strokeWidth="4"
                />
              );
            })}

            {/* Draw nodes */}
            {Object.values(nodes).map((node) => {
              const isSelected = selectedPath.includes(node.id);
              const isStart = node.id === "A";
              const isEnd = node.id === "Z";
              const canSelect = nodes[selectedPath[selectedPath.length - 1]].connections.includes(node.id);

              return (
                <g key={node.id}>
                  <circle
                    cx={node.x * 100}
                    cy={node.y * 80}
                    r="25"
                    fill={isSelected ? "#22c55e" : isStart ? "#3b82f6" : isEnd ? "#ef4444" : "#1e293b"}
                    stroke={canSelect && !isSelected ? "#fbbf24" : "#475569"}
                    strokeWidth="3"
                    className={canSelect && !isSelected ? "cursor-pointer animate-pulse" : "cursor-pointer"}
                    onClick={() => handleNodeClick(node.id)}
                  />
                  <text x={node.x * 100} y={node.y * 80 + 5} textAnchor="middle" fill="white" className="text-lg font-bold pointer-events-none">
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Current Path */}
        <div className="bg-slate-900 border border-slate-700 rounded p-4">
          <p className="text-xs text-slate-400 mb-2">Current Path ({selectedPath.length - 1} hops):</p>
          <p className={`text-lg font-mono ${theme}`}>{selectedPath.join(" → ")}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Attempts: {attempts}/3</span>
          <button onClick={() => setShowHint(!showHint)} className="text-xs text-yellow-400 hover:text-yellow-300">
            {showHint ? "Ẩn hint" : "💡 Xem hint"}
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
            <p className="text-xs text-yellow-400">💡 Đường đi ngắn nhất có {correctPath.length - 1} hops. Tránh đi vòng!</p>
            <p className="text-xs text-slate-400 mt-1">Legend: 🔵 Start | 🔴 End | 🟡 Có thể chọn | 🟢 Đã chọn</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={resetPath}
            className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50 rounded px-4 py-2 text-yellow-400"
          >
            ↺ Reset
          </button>
          {onSkip && (
            <button onClick={onSkip} className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded px-4 py-2 text-red-400 col-span-2">
              Skip (-50pts)
            </button>
          )}
        </div>

        <div className="text-xs text-slate-500 text-center">Click vào các node có viền vàng để chọn đường đi</div>
      </div>
    </div>
  );
};

export default NetworkHacking;
