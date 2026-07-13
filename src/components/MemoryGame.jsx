import React, { useState, useEffect } from 'react';
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

const MemoryGame = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mistakes, setMistakes] = useState(0);

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
        const newMatched = [...matched, newFlipped[0], newFlipped[1]];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
          setIsPlaying(false);
          if (onComplete) {
            // Deduct 2 points per mistake, min score 20
            const finalScore = Math.max(100 - (mistakes * 2), 20);
            setTimeout(() => onComplete(finalScore), 2000);
          }
        }
      } else {
        setMistakes(m => m + 1);
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
          <p>Bạn đã hoàn thành trong {timer} giây. Đang lưu kết quả...</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
