import React, { useState } from 'react';
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
