import os

app_tsx = """import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import HomePage from "./pages/HomePage";
// @ts-ignore
import GamesPage from "./pages/GamesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
"""

games_page_jsx = """import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DragDropGame from '../components/DragDropGame';
import SimulationGame from '../components/SimulationGame';
import MemoryGame from '../components/MemoryGame';

const GamesPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Đặt đúng vị trí", "Cân bằng liên minh", "Lật thẻ ghi nhớ"];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <nav className="w-full z-50 bg-surface border-b border-outline-variant p-4 flex justify-between items-center">
        <div className="font-display-lg text-2xl text-primary tracking-tight">
          Modern Socialism
        </div>
        <Link to="/" className="text-primary font-bold hover:underline">Trở về Trang chủ</Link>
      </nav>

      <main className="max-w-container-max mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-display-lg text-on-surface mb-8 text-center">Góc Ôn Tập Tương Tác</h1>
        
        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                activeTab === idx ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant min-h-[600px]"
        >
          {activeTab === 0 && <DragDropGame />}
          {activeTab === 1 && <SimulationGame />}
          {activeTab === 2 && <MemoryGame />}
        </motion.div>
      </main>
    </div>
  );
};

export default GamesPage;
"""

drag_drop_game_jsx = """import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';

const initialCards = [
  { id: 'card-1', content: 'Lực lượng lãnh đạo thông qua Đảng' },
  { id: 'card-2', content: 'Lực lượng đông đảo nhất' },
  { id: 'card-3', content: 'Đóng vai trò quyết định phát triển khoa học - công nghệ' },
  { id: 'card-4', content: 'Lực lượng tổ chức sản xuất, kinh doanh' },
  { id: 'card-5', content: 'Đóng góp đa dạng vào sự ổn định xã hội' }
];

const classes = [
  { id: 'box-worker', title: 'Công nhân', matchId: 'card-1', color: 'border-primary' },
  { id: 'box-farmer', title: 'Nông dân', matchId: 'card-2', color: 'border-secondary' },
  { id: 'box-intellectual', title: 'Trí thức', matchId: 'card-3', color: 'border-tertiary' },
  { id: 'box-entrepreneur', title: 'Doanh nhân', matchId: 'card-4', color: 'border-primary' },
  { id: 'box-others', title: 'Các tầng lớp khác', matchId: 'card-5', color: 'border-outline' }
];

const DragDropGame = () => {
  const [cards, setCards] = useState(initialCards);
  const [boxes, setBoxes] = useState(classes.map(c => ({ ...c, items: [] })));

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'card-pool' && destination.droppableId !== 'card-pool') {
      const draggedCard = cards[source.index];
      const targetBox = boxes.find(b => b.id === destination.droppableId);
      
      if (draggedCard.id === targetBox.matchId) {
        // Correct match
        const newCards = Array.from(cards);
        newCards.splice(source.index, 1);
        setCards(newCards);

        const newBoxes = boxes.map(b => {
          if (b.id === destination.droppableId) {
            return { ...b, items: [...b.items, draggedCard] };
          }
          return b;
        });
        setBoxes(newBoxes);

        if (newCards.length === 0) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Trò chơi 1: Đặt đúng vị trí</h2>
      <p className="text-center mb-8 text-on-surface-variant">Kéo thả các đặc điểm vào đúng giai cấp tương ứng.</p>

      <div className="flex flex-col gap-8">
        <Droppable droppableId="card-pool" direction="horizontal">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              className="flex flex-wrap gap-4 justify-center min-h-[100px] p-4 bg-surface-container rounded-xl"
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-3 rounded shadow cursor-grab border border-outline-variant max-w-[200px] text-center text-sm"
                    >
                      {card.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {boxes.map(box => (
            <Droppable key={box.id} droppableId={box.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-xl border-t-4 bg-surface-container-low min-h-[200px] flex flex-col ${box.color} ${snapshot.isDraggingOver ? 'bg-surface-variant' : ''}`}
                >
                  <h3 className="font-bold text-center mb-4">{box.title}</h3>
                  <div className="flex flex-col gap-2 flex-1">
                    {box.items.map((item, idx) => (
                      <div key={idx} className="bg-primary-container text-on-primary-container p-2 rounded text-xs text-center shadow-sm">
                        {item.content}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragDropGame;
"""

simulation_game_jsx = """import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const questions = [
  {
    situation: 'Để nâng cao chất lượng nguồn nhân lực phục vụ CNH, HĐH, bạn cần tập trung củng cố liên minh trên lĩnh vực nào?',
    options: [
      { text: 'Kinh tế', correct: false },
      { text: 'Chính trị', correct: false },
      { text: 'Văn hóa - Tư tưởng', correct: true }
    ],
    explanation: 'Liên minh về Văn hóa - Tư tưởng tập trung vào giáo dục, đào tạo, phát triển con người toàn diện.'
  },
  {
    situation: 'Xác lập quan hệ sản xuất tiên tiến, phát huy vai trò của Nhà nước trong điều tiết thị trường là nội dung thuộc lĩnh vực nào?',
    options: [
      { text: 'Kinh tế', correct: true },
      { text: 'Chính trị', correct: false },
      { text: 'Văn hóa - Tư tưởng', correct: false }
    ],
    explanation: 'Nội dung Kinh tế đóng vai trò nền tảng vật chất cho liên minh giai cấp.'
  },
  {
    situation: 'Để giữ vững định hướng xã hội chủ nghĩa và phát huy quyền làm chủ của nhân dân, cần chú trọng lĩnh vực nào?',
    options: [
      { text: 'Kinh tế', correct: false },
      { text: 'Chính trị', correct: true },
      { text: 'Văn hóa - Tư tưởng', correct: false }
    ],
    explanation: 'Nội dung Chính trị đảm bảo sự lãnh đạo của Đảng và quyền làm chủ của nhân dân.'
  }
];

const SimulationGame = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(25); // Start with 25% solidarity
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ isCorrect: false, msg: '' });

  const handleOption = (isCorrect, explanation) => {
    setShowFeedback(true);
    setFeedback({ isCorrect, msg: explanation });
    
    if (isCorrect) {
      const newScore = Math.min(score + 25, 100);
      setScore(newScore);
      if (newScore === 100) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      setScore(Math.max(score - 10, 0));
    }
  };

  const nextQ = () => {
    setShowFeedback(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Trò chơi 2: Cân bằng Liên minh</h2>
      <p className="text-center mb-8 text-on-surface-variant">Vào vai nhà quản lý, đưa ra quyết định đúng đắn để nâng cao chỉ số Đại đoàn kết.</p>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-on-surface">Chỉ số Đại đoàn kết</span>
          <span className="font-bold text-primary">{score}%</span>
        </div>
        <div className="w-full bg-surface-variant rounded-full h-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            className={`h-full ${score >= 75 ? 'bg-primary' : score >= 50 ? 'bg-secondary' : 'bg-outline'} transition-colors`}
          ></motion.div>
        </div>
      </div>

      {score === 100 ? (
        <div className="text-center p-8 bg-surface-container rounded-2xl">
          <h3 className="text-2xl text-primary font-bold mb-4">Hoàn hảo!</h3>
          <p>Bạn đã xây dựng thành công khối đại đoàn kết toàn dân vững chắc.</p>
          <button onClick={() => { setScore(25); setCurrentQ(0); setShowFeedback(false); }} className="mt-4 bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">Chơi lại</button>
        </div>
      ) : (
        <div className="bg-surface-container p-6 rounded-2xl shadow-sm border border-outline-variant">
          <h3 className="text-xl font-bold mb-6 text-on-surface">Tình huống {currentQ + 1}:</h3>
          <p className="text-lg mb-8">{questions[currentQ].situation}</p>
          
          {!showFeedback ? (
            <div className="flex flex-col gap-3">
              {questions[currentQ].options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleOption(opt.correct, questions[currentQ].explanation)}
                  className="w-full text-left p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-variant transition-all"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${feedback.isCorrect ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
              <h4 className="font-bold mb-2">{feedback.isCorrect ? 'Tuyệt vời!' : 'Chưa chính xác!'}</h4>
              <p className="text-sm mb-4">{feedback.msg}</p>
              <button onClick={nextQ} className={`px-6 py-2 rounded-lg font-bold ${feedback.isCorrect ? 'bg-primary text-on-primary' : 'bg-error text-on-error'}`}>
                {currentQ < questions.length - 1 ? 'Tiếp tục' : (score === 100 ? 'Kết thúc' : 'Hoàn thành bài tập')}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimulationGame;
"""

memory_game_jsx = """import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const initialCards = [
  { id: 1, content: 'CÔNG NGHIỆP HÓA', pairId: 'a', isConcept: true },
  { id: 2, content: 'Đẩy mạnh hiện đại hóa gắn với kinh tế tri thức.', pairId: 'a', isConcept: false },
  { id: 3, content: 'CHÍNH SÁCH XÃ HỘI', pairId: 'b', isConcept: true },
  { id: 4, content: 'Thực hiện hiệu quả các chính sách an sinh, phúc lợi.', pairId: 'b', isConcept: false },
  { id: 5, content: 'SỰ ĐỒNG THUẬN', pairId: 'c', isConcept: true },
  { id: 6, content: 'Tạo lập sự nhất trí cao trong toàn thể nhân dân.', pairId: 'c', isConcept: false },
  { id: 7, content: 'THỂ CHẾ & CÔNG NGHỆ', pairId: 'd', isConcept: true },
  { id: 8, content: 'Hoàn thiện kinh tế thị trường và ứng dụng Tech.', pairId: 'd', isConcept: false },
  { id: 9, content: 'ĐỔI MỚI HỆ THỐNG', pairId: 'e', isConcept: true },
  { id: 10, content: 'Đổi mới hoạt động Đảng, Nhà nước và Mặt trận.', pairId: 'e', isConcept: false },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(initialCards));
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && matched.length < initialCards.length) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, matched.length]);

  const handleFlip = (index) => {
    if (!isPlaying) setIsPlaying(true);
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const match1 = cards[newFlipped[0]];
      const match2 = cards[newFlipped[1]];

      if (match1.pairId === match2.pairId && match1.isConcept !== match2.isConcept) {
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
          setIsPlaying(false);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleArray(initialCards));
    setFlipped([]);
    setMatched([]);
    setTimer(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">Trò chơi 3: Lật thẻ ghi nhớ</h2>
      <p className="text-center mb-6 text-on-surface-variant">Ghép đúng tên Phương hướng với Nội dung tương ứng.</p>
      
      <div className="flex justify-between items-center mb-6 px-4 bg-surface-variant py-3 rounded-xl border border-outline-variant">
        <span className="font-bold text-on-surface">Thời gian: {timer}s</span>
        <button onClick={resetGame} className="text-primary font-bold hover:underline">Chơi lại</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div 
              key={idx} 
              onClick={() => handleFlip(idx)}
              className="h-32 md:h-40 cursor-pointer relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden state) */}
                <div 
                  className="absolute w-full h-full bg-primary rounded-xl flex items-center justify-center border-4 border-outline-variant shadow-sm"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="material-symbols-outlined text-on-primary text-4xl opacity-50">help</span>
                </div>

                {/* Back (Revealed state) */}
                <div 
                  className={`absolute w-full h-full rounded-xl flex items-center justify-center p-3 text-center shadow-md border-2 ${matched.includes(idx) ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface text-on-surface border-outline-variant'}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className={`${card.isConcept ? 'font-bold text-primary' : 'text-xs text-on-surface-variant'}`}>{card.content}</span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {matched.length === cards.length && (
        <div className="mt-8 text-center p-6 bg-primary-container text-on-primary-container rounded-xl">
          <h3 className="text-2xl font-bold mb-2">Chúc mừng!</h3>
          <p>Bạn đã hoàn thành trong {timer} giây.</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
"""

os.makedirs('src/components', exist_ok=True)
os.makedirs('src/pages', exist_ok=True)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_tsx)

with open('src/pages/GamesPage.jsx', 'w', encoding='utf-8') as f:
    f.write(games_page_jsx)

with open('src/components/DragDropGame.jsx', 'w', encoding='utf-8') as f:
    f.write(drag_drop_game_jsx)

with open('src/components/SimulationGame.jsx', 'w', encoding='utf-8') as f:
    f.write(simulation_game_jsx)

with open('src/components/MemoryGame.jsx', 'w', encoding='utf-8') as f:
    f.write(memory_game_jsx)

print("Created all game files and updated App.tsx")
