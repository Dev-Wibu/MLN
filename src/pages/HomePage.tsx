
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold mb-6 text-center text-red-600 tracking-wide"
      >
        Chủ Nghĩa Xã Hội Khoa Học
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl md:text-2xl text-slate-800 max-w-3xl text-center leading-relaxed font-light"
      >
        Dự án trình bày thông tin kỹ thuật số
      </motion.p>
    </div>
  );
};

export default HomePage;
