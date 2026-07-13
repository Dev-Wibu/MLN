import React, { useState } from 'react';
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

const SimulationGame = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(25); // Start with 25% solidarity
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ isCorrect: false, msg: '' });
  const [isFinished, setIsFinished] = useState(false);

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
    } else {
      setIsFinished(true);
      if (onComplete) {
         // Pass score after a short delay
         setTimeout(() => onComplete(score), 1500);
      }
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

      {score === 100 && isFinished ? (
        <div className="text-center p-8 bg-surface-container rounded-2xl">
          <h3 className="text-2xl text-primary font-bold mb-4">Hoàn hảo!</h3>
          <p>Bạn đã xây dựng thành công khối đại đoàn kết toàn dân vững chắc. Đang chuyển sang trò chơi tiếp theo...</p>
        </div>
      ) : isFinished ? (
        <div className="text-center p-8 bg-surface-container rounded-2xl">
          <h3 className="text-2xl text-secondary font-bold mb-4">Hoàn thành tình huống!</h3>
          <p>Điểm Đại đoàn kết của bạn là {score}%. Đang chuyển sang trò chơi tiếp theo...</p>
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
                {currentQ < questions.length - 1 ? 'Tiếp tục' : 'Hoàn thành bài tập'}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimulationGame;
