import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { DataMining, FirewallBypass, NetworkHacking, PasswordCracking } from "../components/minigames";

type MenuState =
  | "main"
  | "production"
  | "finance"
  | "export"
  | "division"
  | "conclusion"
  | "dossier"
  | "ending"
  | "leaderboard"
  | "achievements"
  | "minigame";
type ThemeType = "classic" | "cyberpunk" | "matrix" | "hacker";
type RankType = "Analyst" | "Investigator" | "Specialist" | "Expert" | "Master Hacker" | "Lord of Hack";
type EndingType = "revolutionary" | "pragmatic" | "nihilist" | null;

// Rank constants for better maintainability
const RANK = {
  ANALYST: "Analyst" as const,
  INVESTIGATOR: "Investigator" as const,
  SPECIALIST: "Specialist" as const,
  EXPERT: "Expert" as const,
  MASTER_HACKER: "Master Hacker" as const,
  LORD_OF_HACK: "Lord of Hack" as const,
};

interface TerminalLine {
  text: string;
  color?: string;
  delay?: number;
}

interface GameState {
  score: number;
  completedMissions: Set<string>;
  unlockedSecrets: string[];
  rank: RankType;
  username: string;
  startTime: number | null;
  completionTime: number | null;
  achievements: Set<string>;
  minigamesPassed: Set<string>;
}

interface Theme {
  bg: string;
  text: string;
  border: string;
  accent: string;
}

interface LeaderboardEntry {
  username: string;
  score: number;
  rank: RankType;
  completionTime: number;
  ending: EndingType;
  timestamp: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const ScrollytellingPage = ({ onPageChange }: { onPageChange?: (page: string) => void }) => {
  const [currentMenu, setCurrentMenu] = useState<MenuState>("main");
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("classic");
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    completedMissions: new Set(),
    unlockedSecrets: [],
    rank: RANK.ANALYST,
    username: "",
    startTime: null,
    completionTime: null,
    achievements: new Set(),
    minigamesPassed: new Set(),
  });
  const [currentMinigame, setCurrentMinigame] = useState<string | null>(null);
  const [pendingMission, setPendingMission] = useState<MenuState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedEnding, setSelectedEnding] = useState<EndingType>(null);
  const [showDossier, setShowDossier] = useState<string | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const themes: Record<ThemeType, Theme> = {
    classic: { bg: "bg-black", text: "text-green-400", border: "border-green-400/30", accent: "text-cyan-400" },
    cyberpunk: { bg: "bg-purple-950", text: "text-pink-400", border: "border-pink-400/30", accent: "text-yellow-400" },
    matrix: { bg: "bg-black", text: "text-green-300", border: "border-green-300/30", accent: "text-green-500" },
    hacker: { bg: "bg-gray-900", text: "text-yellow-400", border: "border-yellow-400/30", accent: "text-orange-400" },
  };

  const theme = themes[currentTheme];

  // Sound effects
  const playSound = useCallback(
    (type: "typing" | "beep" | "success" | "error") => {
      if (!soundEnabled) return;
      const audioContext = new (window.AudioContext || (window as never)["webkitAudioContext"])();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "typing":
          oscillator.frequency.value = 800;
          gainNode.gain.value = 0.05;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.02);
          break;
        case "beep":
          oscillator.frequency.value = 1000;
          gainNode.gain.value = 0.1;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case "success":
          oscillator.frequency.value = 1200;
          gainNode.gain.value = 0.15;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.15);
          break;
        case "error":
          oscillator.frequency.value = 200;
          gainNode.gain.value = 0.2;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
      }
    },
    [soundEnabled]
  );

  // Calculate rank based on score
  const getRank = (score: number, achievements: Set<string>, secrets: string[]): RankType => {
    // Lord of Hack: Ultimate achievement - requires EVERYTHING
    // Max score = 5 missions * 200 + 3 easter eggs * 50-100 + dossier 50 = 1000 + 250 = 1250
    const hasAllMissions = score >= 1000; // All 5 missions completed (200 each)
    const hasAllEasterEggs = achievements.has("easter_egg_master"); // Found all easter eggs
    const hasAllSecrets = secrets.length >= 1; // Unlocked nvidia dossier (can add more)
    const hasPerfectScore = score >= 1250; // Maximum possible score

    if (hasAllMissions && hasAllEasterEggs && hasAllSecrets && hasPerfectScore) {
      return RANK.LORD_OF_HACK;
    }

    if (score >= 1000) return RANK.MASTER_HACKER;
    if (score >= 750) return RANK.EXPERT;
    if (score >= 500) return RANK.SPECIALIST;
    if (score >= 250) return RANK.INVESTIGATOR;
    return RANK.ANALYST;
  };

  // Update rank when score changes
  useEffect(() => {
    const newRank = getRank(gameState.score, gameState.achievements, gameState.unlockedSecrets);
    if (newRank !== gameState.rank) {
      setGameState((prev) => ({ ...prev, rank: newRank }));

      // Special celebration for Lord of Hack
      if (newRank === RANK.LORD_OF_HACK) {
        playSound("success");
        setTimeout(() => playSound("success"), 200);
        setTimeout(() => playSound("success"), 400);
      }
    }
  }, [gameState.score, gameState.rank, gameState.achievements, gameState.unlockedSecrets, playSound]);

  // LocalStorage & Multiplayer helpers
  const saveToLeaderboard = useCallback((entry: LeaderboardEntry) => {
    const leaderboard = JSON.parse(localStorage.getItem("lenin_leaderboard") || "[]") as LeaderboardEntry[];
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score || a.completionTime - b.completionTime);
    localStorage.setItem("lenin_leaderboard", JSON.stringify(leaderboard.slice(0, 50))); // Keep top 50
  }, []);

  const getLeaderboard = useCallback((): LeaderboardEntry[] => {
    return JSON.parse(localStorage.getItem("lenin_leaderboard") || "[]");
  }, []);

  // Achievement definitions
  const achievementDefinitions: Achievement[] = [
    {
      id: "first_blood",
      name: "First Blood",
      description: "Hoàn thành mission đầu tiên",
      icon: "🎯",
      unlocked: gameState.achievements.has("first_blood"),
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Hoàn thành tất cả trong <5 phút",
      icon: "⚡",
      unlocked: gameState.achievements.has("speed_demon"),
    },
    { id: "perfect_score", name: "Perfect Score", description: "Đạt 1000+ điểm", icon: "💯", unlocked: gameState.achievements.has("perfect_score") },
    {
      id: "secret_hunter",
      name: "Secret Hunter",
      description: "Mở khóa tất cả dossiers",
      icon: "🔍",
      unlocked: gameState.achievements.has("secret_hunter"),
    },
    {
      id: "easter_egg_master",
      name: "Easter Egg Master",
      description: "Tìm tất cả easter eggs",
      icon: "🥚",
      unlocked: gameState.achievements.has("easter_egg_master"),
    },
    {
      id: "theme_explorer",
      name: "Theme Explorer",
      description: "Thử tất cả 4 themes",
      icon: "🎨",
      unlocked: gameState.achievements.has("theme_explorer"),
    },
  ];

  // Check and unlock achievements
  useEffect(() => {
    const newAchievements = new Set(gameState.achievements);
    let updated = false;

    // First Blood
    if (gameState.completedMissions.size >= 1 && !newAchievements.has("first_blood")) {
      newAchievements.add("first_blood");
      updated = true;
      playSound("success");
    }

    // Perfect Score
    if (gameState.score >= 1000 && !newAchievements.has("perfect_score")) {
      newAchievements.add("perfect_score");
      updated = true;
      playSound("success");
    }

    if (updated) {
      setGameState((prev) => ({ ...prev, achievements: newAchievements }));
    }
  }, [gameState.completedMissions.size, gameState.score, gameState.achievements, playSound]);

  // Start timer on first mission
  useEffect(() => {
    if (gameState.completedMissions.size === 1 && !gameState.startTime) {
      setGameState((prev) => ({ ...prev, startTime: Date.now() }));
    }
  }, [gameState.completedMissions.size, gameState.startTime]);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const bootSequence: TerminalLine[] = [
    { text: "Booting PROJECT_LENIN.EXE...", color: theme.text, delay: 100 },
    { text: "Bypassing corporate firewalls...", color: theme.text, delay: 150 },
    { text: "Accessing global AI network...", color: theme.text, delay: 200 },
    { text: "Connection established.", color: theme.text, delay: 250 },
    { text: "", delay: 300 },
    { text: `Welcome, ${gameState.username || "Analyst"}.`, color: "text-white", delay: 350 },
    {
      text: `[RANK: ${gameState.rank}] [SCORE: ${gameState.score}] [MISSIONS: ${gameState.completedMissions.size}/5]`,
      color: theme.accent,
      delay: 380,
    },
    { text: "", delay: 400 },
    {
      text: "Nhiệm vụ của bạn: Dùng lý luận của Lênin để 'rút trích' bằng chứng độc quyền từ các tập đoàn AI.",
      color: "text-slate-300",
      delay: 450,
    },
    { text: "", delay: 500 },
    { text: "Chọn lệnh để bắt đầu hoặc gõ 'help' để xem danh sách lệnh:", color: theme.accent, delay: 550 },
  ];

  const productionData: TerminalLine[] = [
    { text: "> Executing command 'TẬP TRUNG SẢN XUẤT'...", color: theme.text },
    { text: "Querying NVIDIA database...", color: "text-slate-400" },
    { text: "File found: 'gpu_marketshare_Q3.dat'", color: "text-slate-400" },
    { text: "Extracting data...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "... [DATA EXTRACTED] ...", color: theme.text, delay: 150 },
    { text: "", delay: 200 },
    { text: "GPU Market Share (ASCII Chart):", color: "text-white", delay: 250 },
    { text: "NVIDIA  ████████████████████████████████████ 90%", color: "text-green-400", delay: 280 },
    { text: "AMD     ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  6%", color: "text-yellow-400", delay: 310 },
    { text: "Intel   ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  4%", color: "text-red-400", delay: 340 },
    { text: "", delay: 370 },
    { text: "[PHÁT HIỆN]: NVIDIA kiểm soát 90% thị phần GPU AI cao cấp.", color: "text-yellow-400", delay: 400 },
    { text: "", delay: 430 },
    { text: "[LÊNIN ANALYSIS]:", color: theme.accent, delay: 460 },
    { text: "Đây chính là 'Tập trung sản xuất'.", color: "text-cyan-300", delay: 490 },
    { text: "Họ nắm giữ 'tư liệu sản xuất' (con chip) của toàn ngành.", color: "text-cyan-300", delay: 520 },
    { text: "Mọi công ty khác (OpenAI, Google) đều phải phụ thuộc vào họ.", color: "text-cyan-300", delay: 550 },
    { text: "", delay: 580 },
    { text: "[+200 POINTS] Mission Complete!", color: "text-green-400", delay: 610 },
  ];

  const financeData: TerminalLine[] = [
    { text: "> Executing command 'TƯ BẢN TÀI CHÍNH'...", color: theme.text },
    { text: "Scanning partnership logs: [Microsoft] <-> [OpenAI]...", color: "text-slate-400" },
    { text: "Accessing file: 'Project_Azure_GPT.memo'", color: "text-slate-400" },
    { text: "Extracting data...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "... [DATA EXTRACTED] ...", color: theme.text, delay: 150 },
    { text: "", delay: 200 },
    { text: "[PHÁT HIỆN]: Microsoft đầu tư 13 tỷ USD vào OpenAI.", color: "text-yellow-400", delay: 250 },
    { text: "[ĐIỀU KHOẢN 1]: OpenAI phải dùng độc quyền đám mây Azure.", color: "text-yellow-400", delay: 300 },
    { text: "[ĐIỀU KHOẢN 2]: Microsoft độc quyền tích hợp GPT vào Office, Bing.", color: "text-yellow-400", delay: 350 },
    { text: "", delay: 400 },
    { text: "Investment Flow:", color: "text-white", delay: 430 },
    { text: "Microsoft [$13B] ──────────────> OpenAI", color: "text-green-400", delay: 460 },
    { text: "Microsoft <──────────────── [Azure, Data] OpenAI", color: "text-cyan-400", delay: 490 },
    { text: "", delay: 520 },
    { text: "[LÊNIN ANALYSIS]:", color: theme.accent, delay: 550 },
    { text: "Đây chính là 'Tư bản tài chính'.", color: "text-cyan-300", delay: 580 },
    {
      text: "Sự 'hôn phối' giữa Tư bản nền tảng (Microsoft) và Tư bản tri thức (OpenAI) để cùng nhau thống trị.",
      color: "text-cyan-300",
      delay: 610,
    },
    { text: "", delay: 640 },
    { text: "[+200 POINTS] Mission Complete!", color: "text-green-400", delay: 670 },
  ];

  const exportData: TerminalLine[] = [
    { text: "> Executing command 'XUẤT KHẨU TƯ BẢN'...", color: theme.text },
    { text: "Mapping global API distribution...", color: "text-slate-400" },
    { text: "Analyzing revenue streams...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "... [DATA EXTRACTED] ...", color: theme.text, delay: 150 },
    { text: "", delay: 200 },
    { text: "[PHÁT HIỆN]: OpenAI API phục vụ 180+ quốc gia.", color: "text-yellow-400", delay: 250 },
    { text: "[DÒNG TIỀN]: 95% lợi nhuận từ API quay về Hoa Kỳ.", color: "text-yellow-400", delay: 300 },
    { text: "", delay: 350 },
    { text: "Global Distribution Map:", color: "text-white", delay: 380 },
    { text: "USA [HQ] ──> EU ──> Asia ──> Africa ──> [$$$ Return]", color: "text-green-400", delay: 410 },
    { text: "", delay: 440 },
    { text: "[LÊNIN ANALYSIS]:", color: theme.accent, delay: 470 },
    { text: "Đây là 'Xuất khẩu tư bản' thời đại số.", color: "text-cyan-300", delay: 500 },
    { text: "API và mô hình AI là công cụ hút lợi nhuận toàn cầu về trung tâm.", color: "text-cyan-300", delay: 530 },
    { text: "", delay: 560 },
    { text: "[+200 POINTS] Mission Complete!", color: "text-green-400", delay: 590 },
  ];

  const divisionData: TerminalLine[] = [
    { text: "> Executing command 'PHÂN CHIA THỊ TRƯỜNG'...", color: theme.text },
    { text: "Analyzing market territories...", color: "text-slate-400" },
    { text: "Detecting cartel patterns...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "... [DATA EXTRACTED] ...", color: theme.text, delay: 150 },
    { text: "", delay: 200 },
    { text: "Market Division Map:", color: "text-white", delay: 230 },
    { text: "┌─────────────────┬──────────────────┐", color: "text-slate-500", delay: 260 },
    { text: "│ Google          │ Search AI        │", color: "text-green-400", delay: 290 },
    { text: "│ Microsoft       │ Enterprise AI    │", color: "text-cyan-400", delay: 320 },
    { text: "│ Amazon          │ Cloud AI         │", color: "text-yellow-400", delay: 350 },
    { text: "│ Meta            │ Social Media AI  │", color: "text-pink-400", delay: 380 },
    { text: "└─────────────────┴──────────────────┘", color: "text-slate-500", delay: 410 },
    { text: "", delay: 440 },
    { text: "[PHÁT HIỆN]: Mỗi ông lớn 'trị' một lãnh thổ riêng.", color: "text-yellow-400", delay: 470 },
    { text: "[HIỆP ĐỊNH NGẦM]: Không ai xâm phạm 'lãnh địa' của nhau.", color: "text-yellow-400", delay: 500 },
    { text: "", delay: 530 },
    { text: "[LÊNIN ANALYSIS]:", color: theme.accent, delay: 560 },
    { text: "Đây là 'Phân chia thị trường thế giới'.", color: "text-cyan-300", delay: 590 },
    { text: "Các đại tư bản chia sẻ 'miếng bánh' thay vì cạnh tranh.", color: "text-cyan-300", delay: 620 },
    { text: "", delay: 650 },
    { text: "[+200 POINTS] Mission Complete!", color: "text-green-400", delay: 680 },
  ];

  const conclusionData: TerminalLine[] = [
    { text: "> Executing command 'TÁC ĐỘNG & KẾT LUẬN'...", color: theme.text },
    { text: "Analyzing impact on [Startups], [Labor_Market], [Students]...", color: "text-slate-400" },
    { text: "Generating final report...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "... [FINAL REPORT] ...", color: theme.text, delay: 150 },
    { text: "", delay: 200 },
    { text: "[NHẬN THỨC]:", color: "text-yellow-400", delay: 250 },
    { text: "1. AI không 'trung lập'. Nó là công cụ của tư bản để tối ưu hóa lợi nhuận.", color: "text-white", delay: 300 },
    {
      text: "2. Các startup nhỏ (như chúng ta) đang bị 'bóp nghẹt' vì không thể cạnh tranh về DỮ LIỆU và COMPUTE (chip).",
      color: "text-white",
      delay: 350,
    },
    { text: "", delay: 400 },
    { text: "[ĐỊNH HƯỚNG HÀNH ĐỘNG CHO SINH VIÊN]:", color: theme.accent, delay: 450 },
    { text: "Bạn không thể đối đầu trực diện với 'Đại Tư Bản'.", color: "text-slate-300", delay: 500 },
    { text: "Hãy học cách 'lướt trên con sóng' của họ:", color: "text-slate-300", delay: 550 },
    { text: "", delay: 600 },
    {
      text: "1. LÀM CHỦ AI: Học cách 'ra lệnh' (prompting) và 'sử dụng API' của chúng để tăng năng suất bản thân.",
      color: "text-green-400",
      delay: 650,
    },
    {
      text: "2. TÌM THỊ TRƯỜNG NGÁCH: Dùng AI của 'ông lớn' để giải quyết một vấn đề RẤT NHỎ mà họ bỏ qua (VD: AI cho nông nghiệp Việt Nam).",
      color: "text-green-400",
      delay: 700,
    },
    { text: "3. RÈN LUYỆN TƯ DUY PHẢN BIỆN: Thứ duy nhất AI không thể thay thế.", color: "text-green-400", delay: 750 },
    { text: "", delay: 800 },
    { text: "[+200 POINTS] Mission Complete!", color: "text-green-400", delay: 830 },
    { text: "", delay: 860 },
    { text: "=== ALL MISSIONS COMPLETED! ===", color: "text-yellow-400", delay: 890 },
    { text: `Final Rank: ${getRank(gameState.score + 1000, gameState.achievements, gameState.unlockedSecrets)}`, color: theme.accent, delay: 920 },
    { text: "", delay: 950 },
    { text: "Gõ 'ending' để chọn kết thúc của bạn...", color: "text-white", delay: 980 },
  ];

  const dossierNvidia = [
    { text: "> Accessing DOSSIER: NVIDIA...", color: theme.text },
    { text: "Loading classified files...", color: "text-slate-400" },
    { text: "", delay: 100 },
    { text: "╔═══════════════════════════════════╗", color: "text-yellow-400", delay: 150 },
    { text: "║   CLASSIFIED: NVIDIA CORP.        ║", color: "text-yellow-400", delay: 180 },
    { text: "╚═══════════════════════════════════╝", color: "text-yellow-400", delay: 210 },
    { text: "", delay: 240 },
    { text: "Founded: 1993", color: "text-white", delay: 270 },
    { text: "CEO: Jensen Huang", color: "text-white", delay: 300 },
    { text: "HQ: Santa Clara, California", color: "text-white", delay: 330 },
    { text: "", delay: 360 },
    { text: "[SECRET FILES]:", color: "text-red-400", delay: 390 },
    { text: "• Project Grace: ARM-based AI superchip", color: "text-cyan-300", delay: 420 },
    { text: "• H100 shortage scandal: Artificial scarcity?", color: "text-cyan-300", delay: 450 },
    { text: "• CUDA lock-in: Developers trapped in ecosystem", color: "text-cyan-300", delay: 480 },
    { text: "", delay: 510 },
    { text: "[VULNERABILITIES]:", color: "text-yellow-400", delay: 540 },
    { text: "• Phụ thuộc 100% vào TSMC (Taiwan) cho sản xuất", color: "text-red-300", delay: 570 },
    { text: "• Bị điều tra phản độc quyền tại EU & Trung Quốc", color: "text-red-300", delay: 600 },
    { text: "", delay: 630 },
    { text: "[+50 SECRET POINTS] Dossier unlocked!", color: "text-green-400", delay: 660 },
  ];

  const helpMenu = [
    { text: "=== AVAILABLE COMMANDS ===", color: theme.accent },
    { text: "", delay: 50 },
    { text: "help           - Hiện menu này", color: "text-white", delay: 80 },
    { text: "1-5            - Chọn mission (1: Production, 2: Finance, ...)", color: "text-white", delay: 110 },
    { text: "dossier nvidia - Xem hồ sơ bí mật NVIDIA", color: "text-white", delay: 140 },
    { text: "theme [name]   - Đổi theme (classic/cyberpunk/matrix/hacker)", color: "text-white", delay: 170 },
    { text: "sound          - Bật/tắt âm thanh", color: "text-white", delay: 200 },
    { text: "score          - Xem điểm hiện tại", color: "text-white", delay: 230 },
    { text: "leaderboard    - Xem bảng xếp hạng top players", color: "text-white", delay: 260 },
    { text: "achievements   - Xem huy hiệu của bạn", color: "text-white", delay: 290 },
    { text: "timer          - Xem thời gian chơi", color: "text-white", delay: 320 },
    { text: "clear          - Xóa màn hình", color: "text-white", delay: 350 },
    { text: "ending         - Chọn kết thúc (sau khi hoàn thành tất cả)", color: "text-white", delay: 380 },
    { text: "", delay: 410 },
    { text: "=== 👑 LORD OF HACK ===", color: "text-red-500", delay: 440 },
    { text: "Ultimate Rank - Yêu cầu:", color: "text-yellow-400", delay: 470 },
    { text: "✓ Hoàn thành tất cả 5 missions (1000+ điểm)", color: "text-white", delay: 500 },
    { text: "✓ Tìm tất cả 3 easter eggs (matrix, jensen, altman)", color: "text-white", delay: 530 },
    { text: "✓ Unlock ít nhất 1 dossier (nvidia)", color: "text-white", delay: 560 },
    { text: "✓ Đạt Perfect Score (1250+ điểm)", color: "text-white", delay: 590 },
    { text: "", delay: 620 },
    { text: "=== EASTER EGGS ===", color: "text-yellow-400", delay: 650 },
    { text: "matrix         - ???", color: "text-green-400", delay: 680 },
    { text: "jensen         - Quote từ CEO NVIDIA", color: "text-green-400", delay: 710 },
    { text: "altman         - Quote từ CEO OpenAI", color: "text-green-400", delay: 740 },
  ];

  const easterEggs: Record<string, TerminalLine[]> = {
    matrix: [
      { text: "Wake up, Neo...", color: "text-green-400" },
      { text: "The Matrix has you...", color: "text-green-400", delay: 100 },
      { text: "Follow the white rabbit.", color: "text-green-400", delay: 200 },
      { text: "", delay: 300 },
      { text: "[+100 POINTS] Easter egg found!", color: "text-yellow-400", delay: 350 },
    ],
    jensen: [
      { text: "> Quote from Jensen Huang (NVIDIA CEO):", color: "text-yellow-400" },
      { text: "", delay: 50 },
      { text: '"The more you buy, the more you save!"', color: "text-white", delay: 100 },
      { text: "(Về việc bán GPU giá cao ngất ngưỡng)", color: "text-slate-400", delay: 150 },
      { text: "", delay: 200 },
      { text: "[+50 POINTS] CEO quote unlocked!", color: "text-green-400", delay: 250 },
    ],
    altman: [
      { text: "> Quote from Sam Altman (OpenAI CEO):", color: "text-yellow-400" },
      { text: "", delay: 50 },
      { text: '"AGI will benefit all of humanity."', color: "text-white", delay: 100 },
      { text: "(Trong khi lấy 13 tỷ USD từ Microsoft)", color: "text-slate-400", delay: 150 },
      { text: "", delay: 200 },
      { text: "[+50 POINTS] CEO quote unlocked!", color: "text-green-400", delay: 250 },
    ],
  };

  const endingChoices = [
    { text: "=== CHỌN KẾT THÚC CỦA BẠN ===", color: "text-yellow-400" },
    { text: "", delay: 50 },
    { text: "Bạn đã thu thập đủ bằng chứng về độc quyền AI.", color: "text-white", delay: 80 },
    { text: "Giờ đây, bạn sẽ làm gì với kiến thức này?", color: "text-white", delay: 110 },
    { text: "", delay: 140 },
    { text: "[A] REVOLUTIONARY: Tham gia phong trào mã nguồn mở, đấu tranh chống độc quyền", color: "text-red-400", delay: 170 },
    { text: "[B] PRAGMATIC: Học cách khai thác API của Big Tech, 'lướt sóng' thông minh", color: "text-green-400", delay: 200 },
    { text: "[C] NIHILIST: Chấp nhận thực tại, tập trung phát triển bản thân", color: "text-cyan-400", delay: 230 },
    { text: "", delay: 260 },
    { text: "Gõ A, B hoặc C để chọn...", color: theme.accent, delay: 290 },
  ];

  const endings: Record<string, TerminalLine[]> = {
    revolutionary: [
      { text: "=== ENDING A: THE REVOLUTIONARY ===", color: "text-red-400" },
      { text: "", delay: 100 },
      { text: "Bạn chọn con đường đấu tranh.", color: "text-white", delay: 150 },
      { text: "Tham gia các tổ chức như Free Software Foundation, Open Source Initiative.", color: "text-white", delay: 200 },
      { text: "Xây dựng các mô hình AI mã nguồn mở cạnh tranh với Big Tech.", color: "text-white", delay: 250 },
      { text: "", delay: 300 },
      { text: "Kết quả:", color: "text-yellow-400", delay: 350 },
      { text: "• Bạn sống nghèo nhưng tự hào", color: "text-green-400", delay: 400 },
      { text: "• Góp phần dân chủ hóa AI cho mọi người", color: "text-green-400", delay: 450 },
      { text: "• Nhưng Big Tech vẫn thống trị...", color: "text-red-400", delay: 500 },
      { text: "", delay: 550 },
      { text: '"Thà chết đứng, hơn sống quỳ." - Che Guevara', color: "text-cyan-400", delay: 600 },
    ],
    pragmatic: [
      { text: "=== ENDING B: THE PRAGMATIST ===", color: "text-green-400" },
      { text: "", delay: 100 },
      { text: "Bạn chọn con đường thực dụng.", color: "text-white", delay: 150 },
      { text: "Học prompt engineering, fine-tuning, API integration.", color: "text-white", delay: 200 },
      { text: "Tạo startup giải quyết vấn đề ngách mà Big Tech bỏ qua.", color: "text-white", delay: 250 },
      { text: "", delay: 300 },
      { text: "Kết quả:", color: "text-yellow-400", delay: 350 },
      { text: "• Bạn kiếm được tiền, sống tốt", color: "text-green-400", delay: 400 },
      { text: "• Giúp đỡ cộng đồng địa phương (AI cho nông nghiệp VN, ...)", color: "text-green-400", delay: 450 },
      { text: "• Nhưng vẫn phụ thuộc vào Big Tech...", color: "text-yellow-400", delay: 500 },
      { text: "", delay: 550 },
      { text: '"Không thể thay đổi hệ thống, hãy thay đổi bản thân."', color: "text-cyan-400", delay: 600 },
    ],
    nihilist: [
      { text: "=== ENDING C: THE NIHILIST ===", color: "text-cyan-400" },
      { text: "", delay: 100 },
      { text: "Bạn chọn chấp nhận thực tại.", color: "text-white", delay: 150 },
      { text: "Big Tech sẽ thắng. Độc quyền là tất yếu của tư bản.", color: "text-white", delay: 200 },
      { text: "Tập trung phát triển kỹ năng cá nhân, sống tốt trong hệ thống.", color: "text-white", delay: 250 },
      { text: "", delay: 300 },
      { text: "Kết quả:", color: "text-yellow-400", delay: 350 },
      { text: "• Bạn trở thành Senior Engineer ở Big Tech", color: "text-green-400", delay: 400 },
      { text: "• Lương cao, sống thoải mái", color: "text-green-400", delay: 450 },
      { text: "• Nhưng đóng góp vào... hệ thống độc quyền", color: "text-red-400", delay: 500 },
      { text: "", delay: 550 },
      { text: '"Nếu không thể đánh bại họ, hãy gia nhập họ."', color: "text-cyan-400", delay: 600 },
    ],
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const lines =
      currentMenu === "main"
        ? bootSequence
        : currentMenu === "production"
        ? productionData
        : currentMenu === "finance"
        ? financeData
        : currentMenu === "export"
        ? exportData
        : currentMenu === "division"
        ? divisionData
        : currentMenu === "dossier" && showDossier === "nvidia"
        ? dossierNvidia
        : currentMenu === "ending"
        ? endingChoices
        : conclusionData;

    setDisplayedLines([]);
    setIsTyping(true);
    setShowInput(false);

    const typeLines = async () => {
      for (let i = 0; i < lines.length; i++) {
        await new Promise((resolve) => {
          timeoutId = setTimeout(() => {
            setDisplayedLines((prev) => [...prev, lines[i]]);
            playSound("typing");
            resolve(null);
          }, lines[i].delay || 80);
        });
      }
      setIsTyping(false);
      setShowInput(true);
      playSound("beep");

      // Update score when mission is completed
      if (["production", "finance", "export", "division", "conclusion"].includes(currentMenu)) {
        const newCompleted = new Set(gameState.completedMissions);
        newCompleted.add(currentMenu);
        setGameState((prev) => ({
          ...prev,
          score: prev.score + 200,
          completedMissions: newCompleted,
        }));
      }
    };

    typeLines();

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMenu, showDossier, playSound]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Minigame Success Handler
  const handleMinigameSuccess = useCallback(() => {
    if (pendingMission) {
      const newPassed = new Set(gameState.minigamesPassed);
      newPassed.add(pendingMission);
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 100, // Bonus for completing minigame
        minigamesPassed: newPassed,
      }));

      // Unlock achievement for first minigame
      if (newPassed.size === 1) {
        setGameState((prev) => ({
          ...prev,
          achievements: new Set([...prev.achievements, "first_blood"]),
        }));
      }

      playSound("success");
      setCurrentMenu(pendingMission);
      setPendingMission(null);
      setCurrentMinigame(null);
    }
  }, [pendingMission, gameState.minigamesPassed, playSound]);

  // Minigame Skip Handler (penalty)
  const handleMinigameSkip = useCallback(() => {
    if (pendingMission) {
      const newPassed = new Set(gameState.minigamesPassed);
      newPassed.add(pendingMission);
      setGameState((prev) => ({
        ...prev,
        score: Math.max(0, prev.score - 50), // Penalty for skipping
        minigamesPassed: newPassed,
      }));

      playSound("error");
      setCurrentMenu(pendingMission);
      setPendingMission(null);
      setCurrentMinigame(null);
    }
  }, [pendingMission, gameState.minigamesPassed, playSound]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();

    if (command === "help") {
      setDisplayedLines(helpMenu);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command === "clear") {
      setDisplayedLines([]);
      setCurrentMenu("main");
      playSound("beep");
      return;
    }

    if (command === "sound") {
      setSoundEnabled(!soundEnabled);
      setDisplayedLines([{ text: `Sound ${!soundEnabled ? "enabled" : "disabled"}!`, color: "text-green-400" }]);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command === "score") {
      const elapsed = gameState.startTime ? Date.now() - gameState.startTime : 0;
      const lines: TerminalLine[] = [
        { text: `Current Score: ${gameState.score}`, color: theme.accent },
        { text: `Rank: ${gameState.rank}`, color: gameState.rank === "Lord of Hack" ? "text-red-500" : "text-yellow-400" },
        { text: `Missions Completed: ${gameState.completedMissions.size}/5`, color: "text-white" },
        { text: `Time Elapsed: ${formatTime(elapsed)}`, color: "text-cyan-400" },
        { text: `Achievements Unlocked: ${gameState.achievements.size}/${achievementDefinitions.length}`, color: "text-green-400" },
      ];

      // Special message for Lord of Hack
      if (gameState.rank === "Lord of Hack") {
        lines.push({ text: "", delay: 50 });
        lines.push({ text: "╔═══════════════════════════════════════╗", color: "text-red-500", delay: 80 });
        lines.push({ text: "║  👑 LORD OF HACK ACHIEVEMENT! 👑     ║", color: "text-red-500", delay: 110 });
        lines.push({ text: "║  You collected EVERYTHING!            ║", color: "text-yellow-400", delay: 140 });
        lines.push({ text: "╚═══════════════════════════════════════╝", color: "text-red-500", delay: 170 });
      }

      setDisplayedLines(lines);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command === "leaderboard") {
      const leaderboard = getLeaderboard();
      const lines: TerminalLine[] = [
        { text: "=== 🏆 GLOBAL LEADERBOARD 🏆 ===", color: "text-yellow-400" },
        { text: "", delay: 50 },
      ];

      if (leaderboard.length === 0) {
        lines.push({ text: "No entries yet. Be the first!", color: "text-slate-400", delay: 80 });
      } else {
        leaderboard.slice(0, 10).forEach((entry, index) => {
          const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
          lines.push({
            text: `${medal} ${entry.username} - ${entry.score}pts [${entry.rank}] (${formatTime(entry.completionTime)})`,
            color: index < 3 ? "text-yellow-400" : "text-white",
            delay: 80 + index * 30,
          });
        });
      }

      setDisplayedLines(lines);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command === "achievements") {
      const lines: TerminalLine[] = [
        { text: "=== 🏅 YOUR ACHIEVEMENTS 🏅 ===", color: "text-yellow-400" },
        { text: "", delay: 50 },
      ];

      achievementDefinitions.forEach((ach, index) => {
        lines.push({
          text: `${ach.unlocked ? "✓" : "✗"} ${ach.icon} ${ach.name} - ${ach.description}`,
          color: ach.unlocked ? "text-green-400" : "text-slate-600",
          delay: 80 + index * 50,
        });
      });

      lines.push({ text: "", delay: 400 });
      lines.push({
        text: `Progress: ${gameState.achievements.size}/${achievementDefinitions.length} unlocked`,
        color: theme.accent,
        delay: 430,
      });

      setDisplayedLines(lines);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command === "timer") {
      const elapsed = gameState.startTime ? Date.now() - gameState.startTime : 0;
      setDisplayedLines([
        { text: `Time Elapsed: ${formatTime(elapsed)}`, color: theme.accent },
        { text: `Missions: ${gameState.completedMissions.size}/5`, color: "text-white" },
      ]);
      setIsTyping(false);
      playSound("success");
      return;
    }

    if (command.startsWith("theme ")) {
      const newTheme = command.split(" ")[1] as ThemeType;
      if (["classic", "cyberpunk", "matrix", "hacker"].includes(newTheme)) {
        setCurrentTheme(newTheme);
        setDisplayedLines([{ text: `Theme changed to: ${newTheme}`, color: "text-green-400" }]);
        setIsTyping(false);
        playSound("success");
        return;
      }
    }

    if (command === "dossier nvidia") {
      setShowDossier("nvidia");
      setCurrentMenu("dossier");
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 50,
        unlockedSecrets: [...prev.unlockedSecrets, "nvidia"],
      }));
      playSound("success");
      return;
    }

    if (command === "1") {
      // Check if minigame already passed for this mission
      if (gameState.minigamesPassed.has("production")) {
        setCurrentMenu("production");
      } else {
        // Start minigame first
        setCurrentMinigame("password");
        setPendingMission("production");
        setCurrentMenu("minigame");
      }
      return;
    }
    if (command === "2") {
      if (gameState.minigamesPassed.has("finance")) {
        setCurrentMenu("finance");
      } else {
        setCurrentMinigame("network");
        setPendingMission("finance");
        setCurrentMenu("minigame");
      }
      return;
    }
    if (command === "3") {
      if (gameState.minigamesPassed.has("export")) {
        setCurrentMenu("export");
      } else {
        setCurrentMinigame("datamining");
        setPendingMission("export");
        setCurrentMenu("minigame");
      }
      return;
    }
    if (command === "4") {
      if (gameState.minigamesPassed.has("division")) {
        setCurrentMenu("division");
      } else {
        setCurrentMinigame("firewall");
        setPendingMission("division");
        setCurrentMenu("minigame");
      }
      return;
    }
    if (command === "5") {
      if (gameState.minigamesPassed.has("conclusion")) {
        setCurrentMenu("conclusion");
      } else {
        // Random minigame for conclusion
        const minigames = ["password", "network", "datamining", "firewall"];
        setCurrentMinigame(minigames[Math.floor(Math.random() * minigames.length)]);
        setPendingMission("conclusion");
        setCurrentMenu("minigame");
      }
      return;
    }

    if (command === "ending") {
      if (gameState.completedMissions.size >= 5) {
        setCurrentMenu("ending");
        playSound("success");
      } else {
        setDisplayedLines([
          {
            text: "ERROR: Bạn cần hoàn thành tất cả 5 missions trước!",
            color: "text-red-400",
          },
        ]);
        setIsTyping(false);
        playSound("error");
      }
      return;
    }

    if (["a", "b", "c"].includes(command) && currentMenu === "ending") {
      const endingType = command === "a" ? "revolutionary" : command === "b" ? "pragmatic" : "nihilist";
      setSelectedEnding(endingType);

      // Save to leaderboard
      const completionTime = Date.now() - (gameState.startTime || Date.now());
      const username = gameState.username || prompt("Nhập tên của bạn cho leaderboard:") || "Anonymous";

      saveToLeaderboard({
        username,
        score: gameState.score,
        rank: gameState.rank,
        completionTime,
        ending: endingType,
        timestamp: Date.now(),
      });

      setGameState((prev) => ({ ...prev, username, completionTime }));

      const endingLines = [...endings[endingType]];
      endingLines.push({ text: "", delay: 650 });
      endingLines.push({ text: `🏆 Saved to leaderboard as: ${username}`, color: "text-yellow-400", delay: 700 });
      endingLines.push({ text: `Final Score: ${gameState.score} pts`, color: theme.accent, delay: 730 });
      endingLines.push({ text: `Time: ${formatTime(completionTime)}`, color: "text-cyan-400", delay: 760 });
      endingLines.push({ text: "", delay: 790 });
      endingLines.push({ text: "Gõ 'leaderboard' để xem bảng xếp hạng!", color: "text-white", delay: 820 });

      setDisplayedLines(endingLines);
      setIsTyping(false);
      playSound("success");

      // Check if player achieved Master Hacker or higher rank and show the event dialog
      const currentRank = gameState.rank;
      if (currentRank === RANK.MASTER_HACKER || currentRank === RANK.LORD_OF_HACK) {
        // Delay the dialog to show after the ending text is displayed
        setTimeout(() => {
          setShowEventDialog(true);
        }, 3000);
      }

      return;
    }

    // Easter eggs
    if (easterEggs[command]) {
      setDisplayedLines(easterEggs[command]);
      setIsTyping(false);

      // Track found easter eggs and check for master achievement
      const newAchievements = new Set(gameState.achievements);
      const foundEggs = new Set(gameState.unlockedSecrets.filter((s) => s.startsWith("egg_")));
      foundEggs.add(`egg_${command}`);

      // If found all 3 eggs, unlock easter_egg_master
      if (foundEggs.size >= 3 && !newAchievements.has("easter_egg_master")) {
        newAchievements.add("easter_egg_master");
        playSound("success");
      }

      setGameState((prev) => ({
        ...prev,
        score: prev.score + (command === "matrix" ? 100 : 50),
        unlockedSecrets: [...prev.unlockedSecrets.filter((s) => !s.startsWith("egg_")), ...Array.from(foundEggs)],
        achievements: newAchievements,
      }));

      playSound("success");
      return;
    }

    // Unknown command
    setDisplayedLines([
      { text: `Command not found: ${cmd}`, color: "text-red-400" },
      { text: "Gõ 'help' để xem danh sách lệnh.", color: "text-slate-400" },
    ]);
    setIsTyping(false);
    playSound("error");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && commandInput.trim()) {
      handleCommand(commandInput);
      setCommandInput("");
    }
  };

  const menuButtons = [
    { id: "production" as MenuState, label: "[1] Phân tích TẬP TRUNG SẢN XUẤT", cmd: "1" },
    { id: "finance" as MenuState, label: "[2] Phân tích TƯ BẢN TÀI CHÍNH", cmd: "2" },
    { id: "export" as MenuState, label: "[3] Phân tích XUẤT KHẨU TƯ BẢN", cmd: "3" },
    { id: "division" as MenuState, label: "[4] Phân tích PHÂN CHIA THỊ TRƯỜNG", cmd: "4" },
    { id: "conclusion" as MenuState, label: "[5] Tác động & Kết luận", cmd: "5" },
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${theme.bg} border ${theme.border} rounded-lg p-4 sm:p-6 shadow-2xl`}>
          {/* Header */}
          <div className={`mb-4 pb-2 border-b ${theme.border} flex justify-between items-center flex-wrap gap-2`}>
            <div>
              <span className={theme.text}>PROJECT_LENIN.EXE</span>
              <span className="text-slate-500 ml-4">Terminal v2.0</span>
              <span className="text-slate-600 ml-2 text-xs">| 👥 {Math.floor(Math.random() * 50 + 10)} online</span>
            </div>
            <div className="flex gap-2 items-center text-xs flex-wrap">
              <span className={gameState.rank === "Lord of Hack" ? "text-red-500 font-bold animate-pulse" : theme.accent}>
                {gameState.rank === "Lord of Hack" ? "👑 " : ""}
                {gameState.rank} | {gameState.score}pts
              </span>
              {gameState.startTime && <span className="text-cyan-400">⏱️ {formatTime(Date.now() - gameState.startTime)}</span>}
              <span className="text-yellow-400">
                🏅 {gameState.achievements.size}/{achievementDefinitions.length}
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-2 py-1 rounded ${soundEnabled ? "bg-green-400/20" : "bg-red-400/20"}`}
                title="Toggle sound"
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          {currentMenu === "minigame" && currentMinigame ? (
            <div className="mb-6">
              {currentMinigame === "password" && (
                <PasswordCracking
                  onSuccess={handleMinigameSuccess}
                  onSkip={handleMinigameSkip}
                  theme={theme.text as "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400"}
                />
              )}
              {currentMinigame === "network" && (
                <NetworkHacking
                  onSuccess={handleMinigameSuccess}
                  onSkip={handleMinigameSkip}
                  theme={theme.text as "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400"}
                />
              )}
              {currentMinigame === "datamining" && (
                <DataMining
                  onSuccess={handleMinigameSuccess}
                  onSkip={handleMinigameSkip}
                  theme={theme.text as "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400"}
                />
              )}
              {currentMinigame === "firewall" && (
                <FirewallBypass
                  onSuccess={handleMinigameSuccess}
                  onSkip={handleMinigameSkip}
                  theme={theme.text as "text-green-400" | "text-pink-400" | "text-green-300" | "text-yellow-400"}
                />
              )}
            </div>
          ) : (
            <div ref={terminalRef} className="space-y-1 mb-6 text-sm sm:text-base max-h-[60vh] overflow-y-auto">
              {displayedLines.map((line, index) => (
                <div key={index} className={line.color || theme.text}>
                  {line.text || "\u00A0"}
                </div>
              ))}
              {isTyping && <span className="animate-pulse">_</span>}
            </div>
          )}

          {/* Command Input */}
          {showInput && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className={theme.accent}>root@lenin:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className={`flex-1 bg-transparent border-b ${theme.border} outline-none ${theme.text} px-2 py-1`}
                  placeholder="Gõ lệnh hoặc 'help'..."
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Quick Buttons (Main Menu) */}
          {!isTyping && currentMenu === "main" && (
            <div className="space-y-2 mt-6">
              <div className="text-sm text-slate-400 mb-2">Quick Actions:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {menuButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => handleCommand(btn.cmd)}
                    className={`text-left px-3 py-2 hover:bg-green-400/10 transition-colors rounded ${theme.accent} hover:text-cyan-300 text-sm border ${theme.border}`}
                  >
                    {btn.label}
                    {gameState.completedMissions.has(btn.id) && <span className="ml-2 text-green-400">✓</span>}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">Tip: Gõ &apos;help&apos; để xem tất cả lệnh | &apos;dossier nvidia&apos; cho secret files</p>
              </div>
            </div>
          )}

          {/* Back Button */}
          {!isTyping && currentMenu !== "main" && !selectedEnding && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setCurrentMenu("main");
                  setShowDossier(null);
                }}
                className={`px-4 py-2 bg-green-400/10 hover:bg-green-400/20 transition-colors rounded ${theme.text} border ${theme.border} text-sm sm:text-base`}
              >
                [Back] Quay lại menu chính
              </button>
            </div>
          )}

          {/* Ending Selected */}
          {selectedEnding && (
            <div className="mt-6 text-center space-y-4">
              <p className="text-yellow-400 mb-4">Thank you for playing!</p>

              {/* Share Results */}
              <div className="bg-slate-800/50 border border-slate-700 rounded p-4 mb-4">
                <p className="text-sm text-slate-400 mb-2">📤 Share your results:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={() => {
                      const shareText =
                        `🎮 PROJECT_LENIN.EXE\n\n` +
                        `👤 ${gameState.username || "Anonymous"}\n` +
                        `📊 Score: ${gameState.score} pts\n` +
                        `🏆 Rank: ${gameState.rank}\n` +
                        `⏱️ Time: ${formatTime(gameState.completionTime || 0)}\n` +
                        `🎯 Ending: ${selectedEnding}\n` +
                        `🏅 Achievements: ${gameState.achievements.size}/${achievementDefinitions.length}\n\n` +
                        `Can you beat my score? 🚀`;
                      navigator.clipboard.writeText(shareText);
                      alert("Đã copy kết quả! Paste vào social media của bạn 🎉");
                    }}
                    className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded text-xs text-blue-400"
                  >
                    📋 Copy Results
                  </button>
                  <button
                    onClick={() => {
                      const tweet = encodeURIComponent(
                        `Tôi vừa hoàn thành PROJECT_LENIN.EXE với ${gameState.score} điểm! 🎮 Bạn có thể làm tốt hơn không?`
                      );
                      window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
                    }}
                    className="px-3 py-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded text-xs text-sky-400"
                  >
                    🐦 Tweet
                  </button>
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setCurrentMenu("leaderboard");
                    setSelectedEnding(null);
                  }}
                  className={`px-4 py-2 bg-yellow-400/10 hover:bg-yellow-400/20 transition-colors rounded ${theme.text} border ${theme.border}`}
                >
                  🏆 View Leaderboard
                </button>
                <button
                  onClick={() => {
                    setSelectedEnding(null);
                    setCurrentMenu("main");
                    setGameState({
                      score: 0,
                      completedMissions: new Set(),
                      unlockedSecrets: [],
                      rank: "Analyst",
                      username: "",
                      startTime: null,
                      completionTime: null,
                      achievements: new Set(),
                      minigamesPassed: new Set(),
                    });
                  }}
                  className={`px-4 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded ${theme.text} border ${theme.border}`}
                >
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{gameState.completedMissions.size}/5 missions</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${(gameState.completedMissions.size / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Special Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-blue-950 to-purple-950 border-cyan-400 border-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cyan-400 text-center">🎉 Special Event Unlocked! 🎉</DialogTitle>
            <DialogDescription className="text-white text-center text-base mt-4">
              Chúc mừng bạn đã đạt rank <span className="text-yellow-400 font-bold">{gameState.rank}</span>!
              <br />
              <br />
              Bạn đã hoàn thành hành trình và khám phá những bí mật về độc quyền AI.
              <br />
              <br />
              <span className="text-cyan-300">Bạn có muốn xem thêm chi tiết về dự án ScrollyTelling này không?</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowEventDialog(false);
                if (onPageChange) {
                  onPageChange("home");
                }
              }}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400"
            >
              ❌ Không, quay về trang chủ
            </Button>
            <Button
              onClick={() => {
                setShowEventDialog(false);
                // Redirect to index.html
                window.location.href = "/src/index.html";
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              ✅ Có, xem chi tiết!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollytellingPage;
