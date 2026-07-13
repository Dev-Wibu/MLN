import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HomePage = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Top Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant"
      >
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
            Modern Socialism
          </div>
          <div className="hidden md:flex gap-gutter items-center">
            <a className="text-primary border-b-2 border-primary font-bold pb-1 cursor-pointer transition-colors duration-200" href="#">Concepts</a>
            <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer" href="#">Characteristics</a>
            <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer" href="#">Alliances</a>
            <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors duration-200 cursor-pointer" href="#">Directions</a>
          </div>
          <button className="bg-primary text-on-primary px-6 py-2 font-label-uppercase rounded-lg hover:opacity-90 active:opacity-80 transition-all cursor-pointer">
            GET STARTED
          </button>
        </div>
      </motion.nav>

      <main className="mt-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative py-20 md:py-32 overflow-hidden"
        >
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-label-uppercase text-primary tracking-[0.2em] mb-4 block"
            >
              HỌC THUYẾT CHÍNH TRỊ - XÃ HỘI
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-md max-w-4xl mx-auto"
            >
              Cơ cấu Xã hội - Giai cấp và Liên minh giai cấp trong thời kỳ quá độ
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"
            >
              Phân tích bản chất, vị trí và vai trò của các giai cấp, tầng lớp trong sự nghiệp xây dựng chủ nghĩa xã hội, nền tảng của khối đại đoàn kết toàn dân tộc.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row justify-center gap-stack-sm"
            >
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">Khám phá nội dung</button>
              <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-bold hover:bg-secondary hover:text-on-secondary transition-all">Tìm hiểu Liên minh</button>
            </motion.div>
          </div>
        </motion.section>

        {/* Concept Section: Bento Grid Components */}
        <section className="py-stack-lg bg-surface-container-low texture-overlay">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Cơ cấu xã hội – giai cấp</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-gutter"
            >
              {/* Worker Class */}
              <motion.div variants={itemVariants} className="md:col-span-8 social-class-card bg-surface p-stack-md rounded-xl border-primary shadow-sm flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary text-4xl">construction</span>
                    <h3 className="font-headline-md text-primary">Giai cấp công nhân</h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-4">
                    Là lực lượng lãnh đạo thông qua Đảng Cộng sản, đại diện cho phương thức sản xuất tiên tiến, giữ vai trò chủ chốt trong quá trình công nghiệp hóa và hiện đại hóa đất nước.
                  </p>
                  <ul className="space-y-2 text-on-surface">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Tiên phong trong cách mạng</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Ý thức tổ chức kỷ luật cao</li>
                  </ul>
                </div>
                <div className="md:w-1/3 min-h-[200px] bg-surface-variant rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Industrial worker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQoXlJPokXxWrrzkr25nGwhG8Zznx8Z44sX5OFP6t-jJcBcX7HXhPhBdI-oJbnkjmb2eyVhFCsNpSkTa2L9gyLrDbMPAk2uSS2yk3gYA8c1SG0uvLDhPZGY57mdrIOOaiYXA333mGTeYG7nqdGIaFNKbL2bSimc5JuvmQW2lQCkNmo1KNuq40qOtYebnuPuqaYSZ1lx10YSM1A0o8tjRLzlIhhyH-NT-d24rt5KAXr44RUtLhskLa1SBdZKp5N_HHcC3E2wxfY40"/>
                </div>
              </motion.div>

              {/* Farmer Class */}
              <motion.div variants={itemVariants} className="md:col-span-4 social-class-card bg-surface p-stack-md rounded-xl border-secondary shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-secondary text-4xl">agriculture</span>
                  <h3 className="font-headline-md text-on-secondary-container">Giai cấp nông dân</h3>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Lực lượng đông đảo nhất, là đồng minh tự nhiên của giai cấp công nhân, đóng vai trò then chốt trong phát triển nông nghiệp và xây dựng nông thôn mới.
                </p>
                <div className="h-32 bg-surface-variant rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Farmer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3G73-QCBUCbkxaOdQaQc9yHUrCXggEA5WHiGYa0Z1EPeTm05FBCE_Z-ZnQq9CzPpNG7hXeez02T741WlxD3AXSVtZmnUhtSOcPqdCr2lWyVw-rr30J9BaPmlvw6wt-yxX49KTxzwxyUoJtJ5H-JZQRn2Bfkgr9rWy7UCPuI46LJwhA3ZIueHi09YcBSyhd5ey3eHiUq6qSGL5rMahhiVZL1_xvDdtjDAhoJbu04xKGkaFm01ubMtsB24EJo6thAIMnD6rt-PPwuI"/>
                </div>
              </motion.div>

              {/* Intellectuals */}
              <motion.div variants={itemVariants} className="md:col-span-4 social-class-card bg-surface p-stack-md rounded-xl border-tertiary shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-tertiary text-4xl">menu_book</span>
                  <h3 className="font-headline-md text-on-tertiary-fixed-variant">Tầng lớp trí thức</h3>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Lực lượng nòng cốt trong sáng tạo và truyền bá tri thức, đóng vai trò quyết định trong việc phát triển khoa học - công nghệ và kinh tế tri thức.
                </p>
                <div className="h-32 bg-surface-variant rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Intellectuals" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2mfpiPFkInlSFj7mkSTnUdVl7o7JiNyg4aTCAb369p0I1N8V5Lc_2IvcQbq51arOXl4PTdaD7AXq3ySwYrZJmijeQnO2t0mcwCvMKIJ2V6F3gGkJRPo1IHCn2hvjrZ4gMBO361VcOGTnxZwk-4CQvus0gR2hw1u3oq8-PxXv4KshNKJcPgmCgEy7jjGLMholzRTcGXXztSjjgc-LnM0aBJ5FJNQ9ow34RdA8k70arccSHBpwNTVpffkw71c0MG_xWrpuzEp45l0"/>
                </div>
              </motion.div>

              {/* Entrepreneurs */}
              <motion.div variants={itemVariants} className="md:col-span-4 social-class-card bg-surface p-stack-md rounded-xl border-primary shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-4xl">business_center</span>
                  <h3 className="font-headline-md text-primary">Tầng lớp doanh nhân</h3>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Lực lượng tổ chức sản xuất, kinh doanh, đóng góp quan trọng vào tăng trưởng kinh tế và giải quyết việc làm trong nền kinh tế thị trường.
                </p>
                <div className="h-32 bg-surface-variant rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Entrepreneurs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB89QL65ogcMsaKfGTYouI6NEgqA7JDhfv6gCJ6-pd1UxJ0wewhLrphQrmzE3nyxFnk23jmChH-LHHXXSoDbfzeQQSk2nYMgnLCKjTW-RzPHXkeqO4tbtNuMEO1UaFCKWl9XU2cMGThHKq2sdR3UrzgeBFbFH0VLBcC4li0M99n6NHyOqJ4Ixh8bLgpuxyXg5qjfUTblctgHkCQLdiZGN0-HUrjvgYZUrUKWJ03QGRwn-D4MHmdUOdRBLxcotklKTxCLyUWW_WC3EI"/>
                </div>
              </motion.div>

              {/* Youth/Women Layer */}
              <motion.div variants={itemVariants} className="md:col-span-4 social-class-card bg-surface p-stack-md rounded-xl border-outline shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-outline text-4xl">groups</span>
                  <h3 className="font-headline-md text-on-surface">Các tầng lớp khác</h3>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Thanh niên, phụ nữ, các cựu chiến binh... là những bộ phận cấu thành quan trọng, đóng góp đa dạng vào sự ổn định và phát triển xã hội.
                </p>
                <div className="h-32 bg-surface-variant rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Others" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIuJiKPQfYy17R2Y5pKvlgdD4KD6xGwVK0zaMDQespnRkl1eue3qE8IS_g6CBKAZ7NUxrHO-1oy9ChojYaxqRvt07TD6UM2vXrJhGGF5qSkzp6bTwppBJOu5qJt53c1nbW_sxWy2HnwtYS3WxAcsv-dYVvN8jK4Xq6oGZfglr0YMfaH1DPIG-0WS5dFVF9rxa9RaBf4qixgRcH8OUC-WDANX6OgAa5MAqocJW-EHHrFDCCvFBtMCWo2fXQTk5S_685c9W5odm6iJs"/>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Characteristics & Significance */}
        <section className="py-stack-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg"
            >
              {/* Characteristics */}
              <motion.div variants={itemVariants}>
                <h3 className="font-headline-md text-headline-md text-primary border-l-4 border-primary pl-4 mb-stack-md">Đặc điểm nổi bật</h3>
                <div className="space-y-gutter">
                  <div className="flex gap-4 p-stack-sm bg-surface-container-highest rounded-lg">
                    <span className="font-display-lg text-primary opacity-20">01</span>
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">Tính đa dạng</h4>
                      <p className="text-on-surface-variant text-sm">Tồn tại nhiều giai cấp, tầng lớp khác nhau trong quá trình chuyển đổi sang CNXH.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-stack-sm bg-surface-container-highest rounded-lg">
                    <span className="font-display-lg text-primary opacity-20">02</span>
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">Biến đổi không ngừng</h4>
                      <p className="text-on-surface-variant text-sm">Các giai cấp luôn vận động, thay đổi cơ cấu để thích nghi với sự phát triển của sản xuất.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-stack-sm bg-surface-container-highest rounded-lg">
                    <span className="font-display-lg text-primary opacity-20">03</span>
                    <div>
                      <h4 className="font-bold text-on-surface mb-1">Tính hợp tác & Liên minh</h4>
                      <p className="text-on-surface-variant text-sm">Mối quan hệ chủ đạo là sự đoàn kết, giúp đỡ lẫn nhau vì mục tiêu chung.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Significance */}
              <motion.div variants={itemVariants} className="bg-primary-container p-stack-md rounded-2xl text-on-primary">
                <h3 className="font-headline-md text-headline-md mb-stack-md">Ý nghĩa chiến lược</h3>
                <div className="space-y-stack-md">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary-container">diversity_3</span>
                    <div>
                      <h4 className="font-bold">Đại đoàn kết toàn dân tộc</h4>
                      <p className="text-on-primary-container text-sm">Cơ sở vững chắc để tập hợp mọi nguồn lực xã hội cho sự nghiệp cách mạng.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary-container">trending_up</span>
                    <div>
                      <h4 className="font-bold">Phát triển kinh tế & Công bằng</h4>
                      <p className="text-on-primary-container text-sm">Gắn kết phát triển kinh tế với thực hiện tiến bộ và công bằng xã hội.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary-container">account_balance</span>
                    <div>
                      <h4 className="font-bold">Xây dựng thành công CNXH</h4>
                      <p className="text-on-primary-container text-sm">Đảm bảo vai trò lãnh đạo và sự đồng thuận cao trong toàn xã hội.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section III: Alliance in Vietnam */}
        <section className="py-stack-lg bg-surface-container overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">Liên minh Giai cấp tại Việt Nam</h2>
              <p className="text-on-surface-variant font-body-md">Nền tảng của hệ thống chính trị và sự phát triển toàn diện</p>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
            >
              {/* Economic Alliance */}
              <motion.div variants={itemVariants} className="relative bg-surface p-stack-md rounded-xl shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">payments</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-label-uppercase text-primary mb-4">Nội dung Kinh tế</h4>
                  <ul className="space-y-4 font-body-md text-on-surface">
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Xác lập quan hệ sản xuất tiến bộ, phù hợp.</span></li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Phát huy vai trò kiến tạo của Nhà nước.</span></li>
                    <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Gắn kết lợi ích giữa các chủ thể kinh tế.</span></li>
                  </ul>
                </div>
              </motion.div>

              {/* Political Alliance */}
              <motion.div variants={itemVariants} className="relative bg-surface p-stack-md rounded-xl shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">policy</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-label-uppercase text-secondary mb-4">Nội dung Chính trị</h4>
                  <ul className="space-y-4 font-body-md text-on-surface">
                    <li className="flex gap-2"><span className="text-secondary font-bold">•</span><span>Tăng cường sự lãnh đạo của Đảng Cộng sản.</span></li>
                    <li className="flex gap-2"><span className="text-secondary font-bold">•</span><span>Phát huy quyền làm chủ của nhân dân.</span></li>
                    <li className="flex gap-2"><span className="text-secondary font-bold">•</span><span>Củng cố khối đại đoàn kết toàn dân.</span></li>
                  </ul>
                </div>
              </motion.div>

              {/* Cultural/Ideological Alliance */}
              <motion.div variants={itemVariants} className="relative bg-surface p-stack-md rounded-xl shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">theater_comedy</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-label-uppercase text-tertiary mb-4">Văn hóa - Tư tưởng</h4>
                  <ul className="space-y-4 font-body-md text-on-surface">
                    <li className="flex gap-2"><span className="text-tertiary font-bold">•</span><span>Xây dựng nền văn hóa tiên tiến, đậm đà bản sắc.</span></li>
                    <li className="flex gap-2"><span className="text-tertiary font-bold">•</span><span>Phát triển con người toàn diện.</span></li>
                    <li className="flex gap-2"><span className="text-tertiary font-bold">•</span><span>Nâng cao chất lượng đời sống tinh thần.</span></li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5 Basic Directions */}
        <section className="py-stack-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-end justify-between mb-stack-lg gap-4">
              <div className="max-w-xl">
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">5 Phương hướng cơ bản</h2>
                <p className="text-on-surface-variant mt-2">Định hướng chiến lược nhằm củng cố cơ cấu giai cấp và liên minh trong giai đoạn mới.</p>
              </div>
              <div className="hidden md:block w-32 h-px bg-outline-variant mb-6"></div>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-5 gap-stack-sm"
            >
              {[
                { icon: 'precision_manufacturing', title: 'CÔNG NGHIỆP HÓA', desc: 'Đẩy mạnh hiện đại hóa gắn với kinh tế tri thức.' },
                { icon: 'volunteer_activism', title: 'CHÍNH SÁCH XÃ HỘI', desc: 'Thực hiện hiệu quả các chính sách an sinh, phúc lợi.' },
                { icon: 'handshake', title: 'SỰ ĐỒNG THUẬN', desc: 'Tạo lập sự nhất trí cao trong toàn thể nhân dân.' },
                { icon: 'terminal', title: 'THỂ CHẾ & CÔNG NGHỆ', desc: 'Hoàn thiện kinh tế thị trường và ứng dụng Tech.' },
                { icon: 'refresh', title: 'ĐỔI MỚI HỆ THỐNG', desc: 'Đổi mới hoạt động Đảng, Nhà nước và Mặt trận.' },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="p-stack-md border border-outline-variant hover:border-primary transition-colors flex flex-col items-center text-center cursor-pointer">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">{item.icon}</span>
                  <h5 className="font-bold text-sm mb-2">{item.title}</h5>
                  <p className="text-caption text-on-surface-variant">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest w-full mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-md px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md text-on-surface mb-stack-sm md:mb-0">
            Modern Socialism
          </div>
          <div className="flex flex-wrap justify-center gap-stack-md mb-stack-sm md:mb-0">
            <a className="text-on-surface-variant hover:underline decoration-primary transition-all duration-300" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:underline decoration-primary transition-all duration-300" href="#">Sources</a>
            <a className="text-on-surface-variant hover:underline decoration-primary transition-all duration-300" href="#">Contact Us</a>
            <a className="text-on-surface-variant hover:underline decoration-primary transition-all duration-300" href="#">Archive</a>
          </div>
          <div className="text-body-md text-on-surface-variant text-center md:text-right">
            © 2024 Institute for Social Science. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
