import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DragDropGame from '../components/DragDropGame';
import SimulationGame from '../components/SimulationGame';
import MemoryGame from '../components/MemoryGame';
import { checkValidMSSV } from '../lib/classData';
import { checkUserPlayed, saveScore, getLeaderboard } from '../lib/firebase';

const GamesPage = () => {
  const [step, setStep] = useState('login');
  const [mssvInput, setMssvInput] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [scores, setScores] = useState({ game1: 0, game2: 0, game3: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const student = checkValidMSSV(mssvInput);
    if (!student) {
      setError('MSSV không hợp lệ hoặc không có trong danh sách lớp.');
      setIsLoading(false);
      return;
    }

    const hasPlayed = await checkUserPlayed(student.mssv);
    if (hasPlayed) {
      setError('Bạn đã tham gia trò chơi này rồi. Mời bạn xem Bảng Xếp Hạng.');
      setIsLoading(false);
      return;
    }

    setCurrentUser(student);
    setStartTime(Date.now());
    setStep('game1');
    setIsLoading(false);
  };

  const handleGameComplete = async (gameNumber, score) => {
    const newScores = { ...scores, [`game${gameNumber}`]: score };
    setScores(newScores);

    if (gameNumber === 1) setStep('game2');
    else if (gameNumber === 2) setStep('game3');
    else if (gameNumber === 3) {
      // Finished all games
      const endTime = Date.now();
      const durationSec = Math.floor((endTime - startTime) / 1000);
      const totalScore = newScores.game1 + newScores.game2 + newScores.game3;

      const record = {
        mssv: currentUser.mssv,
        name: currentUser.name,
        score: totalScore,
        duration: durationSec,
        timeString: `${Math.floor(durationSec / 60).toString().padStart(2, '0')}:${(durationSec % 60).toString().padStart(2, '0')}`
      };

      await saveScore(record);
      loadLeaderboard();
      setStep('leaderboard');
    }
  };

  const loadLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaderboard(data);
  };

  // Helper renderer
  const renderLogin = () => (
    <div className="max-w-md mx-auto p-8 bg-surface-container rounded-2xl shadow-sm border border-outline-variant mt-12">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Đăng Nhập</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Nhập MSSV của bạn:</label>
          <input 
            type="text" 
            value={mssvInput} 
            onChange={e => setMssvInput(e.target.value)}
            className="w-full p-3 rounded-xl border border-outline-variant bg-surface"
            placeholder="VD: SE123456"
            required
          />
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary text-on-primary p-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Đang kiểm tra...' : 'Bắt đầu chơi'}
        </button>
        
        <div className="mt-4 pt-4 border-t border-outline-variant text-center">
            <button type="button" onClick={() => { loadLeaderboard(); setStep('leaderboard'); }} className="text-primary hover:underline text-sm font-bold">Xem Bảng Xếp Hạng</button>
        </div>
      </form>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-surface-container rounded-2xl shadow-sm border border-outline-variant">
      <h2 className="text-3xl font-display-lg text-primary mb-2 text-center">Bảng Xếp Hạng</h2>
      <p className="text-center mb-8 text-on-surface-variant">Thành tích của các bạn sinh viên trong lớp</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant">
              <th className="p-4 font-bold text-on-surface">Hạng</th>
              <th className="p-4 font-bold text-on-surface">MSSV</th>
              <th className="p-4 font-bold text-on-surface">Họ Tên</th>
              <th className="p-4 font-bold text-on-surface text-right">Điểm</th>
              <th className="p-4 font-bold text-on-surface text-right">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-on-surface-variant">Chưa có dữ liệu.</td></tr>
            ) : (
              leaderboard.map((record, idx) => (
                <tr key={record.id} className={`border-b border-outline-variant ${idx < 3 ? 'bg-primary-container/20' : ''}`}>
                  <td className="p-4 font-bold text-primary">#{idx + 1}</td>
                  <td className="p-4 font-mono">{record.mssv}</td>
                  <td className="p-4 font-bold">{record.name}</td>
                  <td className="p-4 text-right font-bold text-secondary">{record.score}đ</td>
                  <td className="p-4 text-right font-mono">{record.timeString}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-8">
         <button onClick={() => setStep('login')} className="bg-surface-variant text-on-surface-variant px-6 py-2 rounded-lg font-bold hover:bg-outline-variant">Quay lại Đăng nhập</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <nav className="w-full z-50 bg-surface border-b border-outline-variant p-4 flex justify-between items-center">
        <div className="font-display-lg text-2xl text-primary tracking-tight">
          Modern Socialism
        </div>
        <div className="flex gap-4 items-center">
           {currentUser && <span className="font-bold text-secondary">👤 {currentUser.name} ({currentUser.mssv})</span>}
           <Link to="/" className="text-primary font-bold hover:underline">Trở về Trang chủ</Link>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto p-4 md:p-8">
        {step !== 'login' && step !== 'leaderboard' && (
          <div className="flex justify-center gap-4 mb-8">
             <div className={`px-6 py-2 rounded-lg font-bold ${step === 'game1' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>1. Đặt đúng vị trí</div>
             <div className={`px-6 py-2 rounded-lg font-bold ${step === 'game2' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>2. Cân bằng liên minh</div>
             <div className={`px-6 py-2 rounded-lg font-bold ${step === 'game3' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>3. Lật thẻ ghi nhớ</div>
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={step === 'login' || step === 'leaderboard' ? '' : 'bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant min-h-[600px]'}
        >
          {step === 'login' && renderLogin()}
          {step === 'game1' && <DragDropGame onComplete={(score) => handleGameComplete(1, score)} />}
          {step === 'game2' && <SimulationGame onComplete={(score) => handleGameComplete(2, score)} />}
          {step === 'game3' && <MemoryGame onComplete={(score) => handleGameComplete(3, score)} />}
          {step === 'leaderboard' && renderLeaderboard()}
        </motion.div>
      </main>
    </div>
  );
};

export default GamesPage;
